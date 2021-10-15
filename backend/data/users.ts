import bcrypt from 'bcryptjs';

export const users = [
  {
    name: 'random name',
    email: 'random@example.com',
    password: bcrypt.hashSync('1234567', 8),
  },
  {
    name: 'random name',
    email: 'random1@example.com',
    password: bcrypt.hashSync('1234567', 8),
  },
  {
    name: 'random name',
    email: 'random2@example.com',
    password: bcrypt.hashSync('1234567', 8),
  },
];
