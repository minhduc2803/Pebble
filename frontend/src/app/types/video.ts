export type Video = {
  id: number;
  ytVideoId: string;
  title?: string;
  description?: string;
  user: {
    id: number;
    fullName: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type VideoFormData = {
  url: string;
};

export type YoutubeVideo = {
  title: string;
  description: string;
};
