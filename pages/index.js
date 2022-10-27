import TablePagination from '@mui/material/TablePagination';
import ImageList from '@mui/material/ImageList';
import TextField from '@mui/material/TextField';

import styles from '../styles/Home.module.scss';
import { useState } from 'react';
import PhotoListItem from '../components/PhotoListItem';

export default function Photos({ photos, totalResults }) {
  const [photoList, setPhotoList] = useState(photos);
  const [searchValue, setSearchValue] = useState('');
  const [count, setCount] = useState(totalResults);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const onInputChange = e => {
    const searchValue = e.target.value;
    setSearchValue(searchValue);
    getPhotos(e.target.value, rowsPerPage, page);
  };

  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
    getPhotos(searchValue, rowsPerPage, newPage);
  };

  const handleChangeRowsPerPage = event => {
    const value = event.target.value;
    setRowsPerPage(parseInt(value, 10));
    setPage(0);
    getPhotos(searchValue, value, page);
  };

  const getPhotos = async (query, perPage, pageNumber) => {
    const url =
      query.length > 2
        ? `https://api.pexels.com/v1/search?query=${query}&per_page=${perPage}&page=${pageNumber}`
        : `https://api.pexels.com/v1/curated?page=${pageNumber}&per_page=${perPage}`;
    const response = await fetch(url, {
      headers: {
        Authorization:
          '563492ad6f91700001000001a8828b3a3e89473fa1a2918621bdda1c',
      },
    });
    const { photos, total_results } = await response.json();
    setPhotoList(photos);
    setCount(total_results);
  };

  return (
    <>
      <h1 className={styles.header}>Search a photo</h1>
      <div className={styles.searchInputWrapper}>
        <TextField
          id="outlined-basic"
          label="Type at least 3 characters and have fun!"
          className={styles.searchInput}
          variant="outlined"
          onChange={onInputChange}
        />
      </div>
      <ImageList variant="masonry" cols={3} gap={24}>
        {photoList.map(photo => {
          return <PhotoListItem photo={photo} />;
        })}
      </ImageList>
      <TablePagination
        component="div"
        count={count}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}

export const getServerSideProps = async () => {
  const res = await fetch('https://api.pexels.com/v1/curated?per_page=10', {
    headers: {
      Authorization: '563492ad6f91700001000001a8828b3a3e89473fa1a2918621bdda1c',
    },
  });
  const data = await res.json();

  const { photos, total_results: totalResults } = data;

  return {
    props: { photos, totalResults },
  };
};
