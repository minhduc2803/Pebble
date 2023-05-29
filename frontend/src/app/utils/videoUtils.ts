import { embedUrl, watchUrl } from './validationUtils';

export const transformEmbedLink = (link: string) => {
  if (link.startsWith(embedUrl)) {
    return link;
  } else if (link.startsWith(watchUrl)) {
    const embedId = link.split('watch?v=')[1];
    return `${embedUrl}${embedId}`;
  } else return embedUrl;
};
