import { RegistingUser } from 'app/types/user';
import api from './api';

export const register = async (user: RegistingUser) => {
  const data = await api.post('http://localhost:3000/users/create', {
    user,
  });

  console.log('data', data);
};
