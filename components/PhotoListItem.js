import Link from 'next/link';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import styles from '../styles/Home.module.scss';

export default function PhotoListItem({ photo }) {
  return (
    <ImageListItem key={photo.id} className={styles.listItem}>
      <Link href={`/${photo.id}`}>
        <img
          src={`${photo.src.portrait}?w=248&fit=crop&auto=format`}
          srcSet={`${photo.src.portrait}?w=248&fit=crop&auto=format&dpr=2 2x`}
          alt={photo.alt}
          width="100%"
          height="auto"
          className={styles.singlePhoto}
        />
      </Link>
      <ImageListItemBar
        title={photo.alt}
        position="below"
        className={styles.listItemDescription}
      />
    </ImageListItem>
  );
}
