import { Model, Schema, model } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password?: string;
  //@ts-ignore
  borrowHistory: any;
  tokens?: { token: string }[];
  generateAuthToken(): string;
  //@ts-ignore
  save: any;
}

interface UserModel extends Model<IUser> {
  findByCredentials(email: string, password: string): IUser;
}

const userSchema = new Schema<IUser, UserModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value: string) {
        if (!validator.isEmail(value)) throw new Error('Email is invalid!');
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 7,
      trim: true,
      validate(value: string) {
        if (value.toLowerCase().includes('password')) {
          throw new Error('Password cannot contain "password"');
        }
      },
    },
    borrowHistory: {
      type: Schema.Types.ObjectId,
      ref: 'BorrowRequest',
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Hash plain text password before saving
userSchema.pre('save', async function (next) {
  const user = this;

  // Hash only when password is modified (first created and/or updated)
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password!, 8);
  }

  next();
});

userSchema.statics.findByCredentials = async (
  email: string,
  password: string
) => {
  const loggedinUser = await User.findOne({ email });
  if (!loggedinUser) throw new Error('Unable to login');

  const isMatch = await bcrypt.compare(password, loggedinUser.password!);
  if (!isMatch) throw new Error('Unable to login');

  return loggedinUser;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

  user.tokens = user.tokens!.concat({ token });
  await user.save();

  return token;
};

// Hiding private data (password and tokens)
userSchema.methods.toJSON = function () {
  const user = this;
  const userObj = user.toObject();

  delete userObj.password;
  delete userObj.tokens;

  return userObj;
};

const User = model<IUser, UserModel>('User', userSchema);

export default User;
