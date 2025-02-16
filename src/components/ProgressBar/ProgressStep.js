import React from "react";
import styles from "./ProgressBar.module.css";
import MyAccount from "@/app/my-account/page";

const ProgressStep = ({ stepNumber, isActive, isCompleted, isFirst, isLast, isVisible, label, myAccount, progressStep }) => {
  return (
    <div className={`${styles.stepContainer} ${myAccount ? styles.myAccount : ""}`}>


     
      <div
        className={` ${styles.step} ${
          isActive ? styles.active : isCompleted ? styles.completed : styles.inactive
        }`}
        style={{ visibility: isVisible ? "visible" : "hidden"}} 
      >
        {myAccount ? "" : stepNumber || ""}
        
      </div>


      {!isLast && (
       ( myAccount && isFirst && progressStep === 1.5) ? (
     
          <div
            className={`${styles.wHalf} ${styles.line} ${
              isCompleted ? styles.lineCompleted : styles.lineInactive
            } ${""}`} 
          />
        ) : (
        <div
          className={`${styles.line} ${
            isCompleted ? styles.lineCompleted : styles.lineInactive
          } ${""}`} 
        />
        )

      )}
      <div
  className={`${styles.label} ${
    isActive ? styles.labelActive : isCompleted ? styles.labelCompleted : styles.labelInactive
  }`}
>
  {label}
</div>

    </div>
  );
};

export default ProgressStep;
