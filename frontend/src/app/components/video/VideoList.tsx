import { useMemo, useState } from 'react';
import ReactPaginate from 'react-paginate';

import VideoComponent from './VideoComponent';
import { useAppSelector } from 'app/redux/types';

import styles from './VideoList.module.css';

const videosPerPage = 10;

const VideoList = () => {
  const allIds = useAppSelector(state => state.videos.allIds);
  const [selectedPage, setSelectedPage] = useState(0);
  const shownVideoIds = useMemo(
    () => allIds.slice(selectedPage * 10, selectedPage * 10 + 10),
    [allIds, selectedPage],
  );
  const pageCount = Math.ceil(allIds.length / videosPerPage);

  const handlePageClick = event => {
    setSelectedPage(event.selected);
  };

  return (
    <div className={styles.listContainer}>
      {shownVideoIds.map(videoId => (
        <VideoComponent key={videoId} videoId={videoId} />
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
