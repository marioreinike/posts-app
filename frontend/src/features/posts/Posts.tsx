import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  setPosts, selectPosts, deletePost,
} from './postsSlice';
import styles from '../../styles/Posts.module.scss';
import { PageLoader } from '../../components/PageLoader';
import deleteIcon from '../../img/deleteIcon.png';
import PostCreate from '../../components/PostCreate';

export function Posts() {
  const posts = useAppSelector(selectPosts);
  const isLoading = posts.length === 0;
  const dispatch = useAppDispatch();
  const [filter, setFilter] = useState<string>('');

  useEffect(() => {
    dispatch(setPosts());
  }, []);

  return (
    <div>
      {isLoading && <PageLoader />}
      <div className={styles.row}>
        <input
          type="text"
          className={styles.input}
          name="filter"
          id="filter"
          onChange={(event) => setFilter(event.target.value.toLowerCase())}
          placeholder='Filtrar posts por nombre'
        />
        <button
          className={styles.button}
          onClick={() => dispatch(setPosts())}
        >
          Actualizar
        </button>
        <PostCreate />
      </div>
      <div className={styles.postsContainer}>
        {posts.filter((post) => post.name.toLowerCase().includes(filter)).map((post, idx) => (
          <div className={styles.post} key={idx}>
            <div className={styles.postHead}>
              <div>#{post.id}: {post.name}</div>
              <div onClick={() => dispatch(deletePost(post.id))}>
                <img src={deleteIcon} className={styles.deleteIcon} />
              </div>
            </div>
            <div className={styles.postBody}>{post.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
