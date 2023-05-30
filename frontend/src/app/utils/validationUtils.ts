export const required = (fieldLabel: string) => (value?: string) => {
  return value ? undefined : `${fieldLabel} is required`;
};

export const emailError = 'Please provide a valid email';
export const passwordError = 'Password need to has minimum length of 8';
export const urlError = 'Please provide a valid embed youtube url';

export const isValidateEmail = (email?: string) => {
  if (!email) return false;
  return /\S+@\S+\.\S+/.test(email);
};

export const embedUrl = 'https://www.youtube.com/embed/';
export const watchUrl = 'https://www.youtube.com/watch?v=';

export const isValidYoutubeUrl = (url?: string) => {
  if (!url) return false;
  return url.startsWith(embedUrl) || url.startsWith(watchUrl);
};
