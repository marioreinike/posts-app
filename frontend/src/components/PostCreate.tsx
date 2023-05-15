import { useState } from 'react';
import styles from '../styles/Posts.module.scss';
import Modal from './Modal';
import { createPost } from '../features/posts/postsSlice';
import { useAppDispatch } from '../app/hooks';

export default function PostCreate() {
  const dispatch = useAppDispatch();
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  function reset() {
    setName('');
    setDescription('');
  }

  function handleModalClose() {
    reset();
  }

  function handleModalSubmit() {
    dispatch(createPost({ name, description }));
    reset();
  }

  return (
    <Modal
      buttonMessage='Nuevo Post'
      onClose={handleModalClose}
      onSubmit={handleModalSubmit}
      disabled={!name || !description}
    >
      <h1>Nuevo Post</h1>
      <form>
        <div>
          <label htmlFor="name">Nombre</label>
          <input type="text" name="name" id="name" className={styles.input} onChange={(event) => setName(event.target.value)} />
        </div>
        <div>
          <label htmlFor="name">Descripción</label>
          <input type="text" name="description" id="description" className={styles.input} onChange={(event) => setDescription(event.target.value)} />
        </div>
      </form>
    </Modal>
  );
}
