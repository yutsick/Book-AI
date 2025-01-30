import React from "react";
import styles from "./ProgressBar.module.css";

const ProgressStep = ({ stepNumber, isActive, isCompleted, isLast, isVisible, label, isBeforeLast, isMobile }) => {
  return (
    <div className={styles.stepContainer}>
     
      <div
        className={` ${styles.step} ${
          isActive ? styles.active : isCompleted ? styles.completed : styles.inactive
        }`}
        style={{ visibility: isVisible ? "visible" : "hidden"}} 
      >
        {stepNumber || ""}
      </div>


      {!isLast && (
        <div
          className={`${styles.line} ${
            isCompleted ? styles.lineCompleted : styles.lineInactive
          } ${""}`} 
        />
      )}


   
      <div className={styles.label}>{label}</div>
    </div>
  );
};

export default ProgressStep;
