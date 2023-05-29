export const required = (fieldLabel: string) => (value?: string) => {
  return value ? undefined : `${fieldLabel} is required`;
};

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
