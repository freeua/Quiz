import React from "react";
import styles from "./FullQuiz.module.css";
import FormikRadioField from "../../components/inputs/formikInputs/FormikCheckboxField/FormikRadioField";

const Question = ({ question, formik, currentAnswer, progress }) => {
  return (
    <div className={styles.question}>
      <div className={styles.questionTitle}>
        <strong>
          Question {progress.current + 1} from {progress.full.length}...{" "}
        </strong>
        {question.title}
      </div>
      <ul className={styles.answers}>
        {question.answers.map(answer => (
          <li key={answer.id}>
            <FormikRadioField
              name={question.id}
              id={answer.id}
              onChange={formik.handleChange}
              formik={formik}
              value={answer.id}
              defaultChecked={answer.id === Number(currentAnswer)}
              key={answer.id}
              label={answer.title}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question;
