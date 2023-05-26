import api from 'app/api/api';
import { LOGIN_ACTION, LOGOUT_ACTION } from 'app/redux/actions/type';
import { LoginFormData, RegisterFormData } from 'app/types/user';
import { alertError } from 'app/utils/alert';
import { AxiosError } from 'axios';

export const login =
  (user: LoginFormData, onSuccess?: () => void) =>
  async (dispatch, getState) => {
    try {
      const data = await api.post('http://localhost:3000/user_token', {
        auth: user,
      });
      dispatch({ type: LOGIN_ACTION, payload: data.data });
      if (onSuccess) onSuccess();
    } catch (error) {
      alertError('Wrong email or password');
    }
  };

export const register =
  (user: RegisterFormData, onSuccess?: () => void) =>
  async (dispatch, getState) => {
    try {
      const data = await api.post('http://localhost:3000/users/create', {
        user,
      });
      dispatch({ type: LOGIN_ACTION, payload: data.data });
      if (onSuccess) onSuccess();
    } catch (errorWithoutType) {
      if (errorWithoutType) {
        const error = errorWithoutType as AxiosError;
        if (error.response?.data) {
          const serverDataWithType = error.response.data as {
            errors: string[];
          };
          alertError(serverDataWithType.errors.join('\n'));
        } else if (error.request) {
          alertError(error.request);
        } else {
          alertError(error.message);
        }
      } else {
        alertError('Cannot register with the provided values');
      }
    }
  };

export const loginWithToken = () => async dispatch => {
  try {
    const data = await api.get('http://localhost:3000/users/user_info');
    dispatch({ type: LOGIN_ACTION, payload: data.data });
  } catch (error) {}
};

export const logout = () => dispatch => {
  dispatch({ type: LOGOUT_ACTION });
};
