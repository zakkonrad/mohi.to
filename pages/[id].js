import Image from 'next/image';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import styles from '../styles/Photo.module.scss';
import { RWebShare } from 'react-web-share';

export default function SinglePhoto({ photo }) {
  const { back } = useRouter();

  return (
    <div className={styles.photoWrapper}>
      <Button
        variant="outlined"
        onClick={() => back()}
        className={styles.backToMainPageButton}
      >
        Back to main page
      </Button>
      <RWebShare
        data={{
          text: `${photo.alt}`,
          url: `${photo.url}`,
          title: 'Share the photo',
        }}
      >
        <Button variant="outlined" className={styles.shareButton}>
          Share
        </Button>
      </RWebShare>
      <Image
        src={photo.src.portrait}
        alt={photo.alt}
        width="400"
        height="600"
      />
      <h2 className={styles.photoDescription}>{photo.alt}</h2>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;

  const res = await fetch(`https://api.pexels.com/v1/photos/${id}`, {
    headers: {
      Authorization: '563492ad6f91700001000001a8828b3a3e89473fa1a2918621bdda1c',
    },
  });
  const photo = await res.json();

  return {
    props: { photo },
  };
}
