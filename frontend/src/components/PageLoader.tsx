import styles from '../styles/PageLoader.module.scss';

export function PageLoader() {
  return (
    <div className={styles.PageLoaderContainer}>
      <div className={styles.Spinner} />
    </div>
  );
}
