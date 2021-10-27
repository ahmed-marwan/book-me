import bcrypt from 'bcryptjs';

export const users = [
  {
    name: 'First User',
    email: 'f.user@example.com',
    password: bcrypt.hashSync('First_1', 8),
  },
  {
    name: 'Second User',
    email: 's.user@example.com',
    password: bcrypt.hashSync('Second_2', 8),
  },
];
