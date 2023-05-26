export const transformEmbedLink = (link: string) => {
  if (link.startsWith('https://www.youtube.com/embed/')) {
    return link;
  } else if (link.startsWith('https://www.youtube.com/watch?v=')) {
    const embedId = link.split('watch?v=')[1];
    return `https://www.youtube.com/embed/${embedId}`;
  } else return 'https://www.youtube.com/embed/';
};
