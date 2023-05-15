import { useState } from 'react';
import postsStyles from '../styles/Posts.module.scss';
import styles from '../styles/Modal.module.scss';

interface ModalProps {
  buttonMessage: string;
  onClose: () => void;
  onSubmit: () => void;
  disabled?: boolean;
  children: JSX.Element | JSX.Element[];
}

export default function Modal(props: ModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  async function handleClose() {
    setIsOpen(false);
    props.onClose();
  }

  async function handleSubmit() {
    setIsOpen(false);
    props.onSubmit();
  }

  return (
    <>
      <button className={postsStyles.button} onClick={() => setIsOpen(true)}>
        {props.buttonMessage}
      </button>
      {isOpen && (
        <div className={styles.modalContainer}>
          <div className={styles.modal}>
            <button
              onClick={handleClose}
              className={`${postsStyles.button} ${styles.modalClose}`}
            >
              X
            </button>
            <div>
              {props.children}
            </div>
            <div className={styles.center}>
              <button
                disabled={props.disabled}
                className={postsStyles.button}
                onClick={handleSubmit}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
