import React from "react";
import styles from "./Quizzes.module.css";

const StartQuiz = ({ isOpen, toggleModal, start }) => {
  return (
    isOpen && (
      <div className={styles.modalWrapper}>
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.title}>
              Clicking on the start button will open the quiz in fullscreen mode
            </div>
            <div className={styles.buttons}>
              <button className={styles.buttonModal} onClick={start}>
                Start
              </button>
              <button className={styles.buttonModal} onClick={toggleModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default StartQuiz;
