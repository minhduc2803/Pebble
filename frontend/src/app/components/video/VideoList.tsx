import { useMemo, useState } from 'react';
import ReactPaginate from 'react-paginate';

import { Video } from 'app/types/video';
import { useSelector } from 'react-redux';
import VideoComponent from './VideoComponent';

import styles from './VideoList.module.css';

const videosPerPage = 10;

const VideoList = () => {
  const videos = useSelector(state => {
    const stateWithType = state as {
      videos: Video[];
    };
    return stateWithType.videos;
  });

  const [selectedPage, setSelectedPage] = useState(0);
  const shownVideos = useMemo(
    () => videos.slice(selectedPage * 10, selectedPage * 10 + 10),
    [videos, selectedPage],
  );

  const pageCount = Math.ceil(videos.length / videosPerPage);

  const handlePageClick = event => {
    console.log('selected', event.selected);
    setSelectedPage(event.selected);
  };

  return (
    <div className={styles.listContainer}>
      {shownVideos.map(video => (
        <VideoComponent key={video.id} video={video} />
      ))}
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
    </div>
  );
};

export default VideoList;
