import { useState } from "react";
import styles from "./app.module.css";
import data from "./data.json";

export const App = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [steps] = useState(data);


  const handleNextButton = () => {
    if(activeIndex < steps.length - 1) { setActiveStep(activeIndex + 1) }
  };
  const handlePrevButton = () => {
    if(activeIndex !== 0) { setActiveStep(activeIndex - 1) }
  };
  const handleStartOver = () => {
    setActiveStep(0);
  };
  const setActiveStep = (index) => {
    if(index === 0) { setIsFirstStep(true) }
    else { setIsFirstStep(false) }
    if(index === steps.length - 1) { setIsFinalStep(true) }
    else { setIsFinalStep(false) }
    setActiveIndex(index);
  }


  const [isFirstStep, setIsFirstStep] = useState(true);
  const [isFinalStep, setIsFinalStep] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Инструкция по готовке пельменей</h1>
        <div className={styles.steps}>
          <div className={styles["steps-content"]}>
            {steps[activeIndex].content}
          </div>
          <ul className={styles["steps-list"]}>
            {
              steps.map((step, index) => { return (
                <li
                  key={step.id}
                  className={
                    styles["steps-item"] +
                    (index <= activeIndex ? " " +
                    styles.done: "") + (index === activeIndex ? " " + styles.active : "")
                  }
                >
                  <button className={styles["steps-item-button"]} onClick={() => setActiveStep(index)}>
                    {index + 1}
                  </button>
                  {step.title}
                </li>)
              })
            }
          </ul>
          <div className={styles["buttons-container"]}>
            <button className={styles.button} onClick={handlePrevButton} disabled={isFirstStep}>Назад</button>
            <button className={styles.button} onClick={isFinalStep ? handleStartOver : handleNextButton}>
              {isFinalStep ? "Начать сначала" : "Далее"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
