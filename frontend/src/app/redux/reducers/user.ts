import { User } from 'app/types/user';
import { LOGIN_ACTION, LOGOUT_ACTION } from '../actionNames';

const initialState: User = {
  id: 0,
  fullName: '',
  email: '',
  token: '',
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_ACTION: {
      if (action.payload.token) {
        localStorage.setItem('token', action.payload.token);

        return {
          id: action.payload.id,
          fullName: action.payload.fullName,
          email: action.payload.email,
          token: action.payload.token,
        };
      } else {
        localStorage.setItem('token', '');
        return initialState;
      }
    }
    case LOGOUT_ACTION: {
      localStorage.setItem('token', '');
      return initialState;
    }
    default:
      return state;
  }
};

export default user;
