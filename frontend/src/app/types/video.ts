export type Video = {
  id: number;
  url: string;
  title: string;
  description: string;
  user: {
    fullName: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type VideoFormData = {
  url: string;
  title: string;
  description: string;
};
