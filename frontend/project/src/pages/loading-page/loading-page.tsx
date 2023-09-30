}
import styles from './loading-page.module.css';

export default function LoadingPage(): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <h2>loading...</h2>
      <div className={styles.ldsDualRing} />
    </div>
  );
}

