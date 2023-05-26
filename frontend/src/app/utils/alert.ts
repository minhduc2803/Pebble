import { toast } from 'react-toastify';

export const alertError = (message: any) => {
  toast.error(message);
};

export const alertInfo = (message: any) => {
  toast.info(message);
};

export const alertSuccess = (message: any) => {
  toast.success(message);
};
