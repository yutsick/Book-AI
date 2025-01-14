import React from "react";
import ProgressStep from "./ProgressStep";
import styles from "./ProgressBar.module.css";

const ProgressBar = ({ currentStep, totalSteps, stepsName }) => {
  const steps = Array.from({ length: totalSteps }, (_, i) => ({
    number: i + 1,
    label: stepsName[i], 
  }));

  return (
    <div className={styles.progressBar}>
      {steps.map((step, index) => (
        <ProgressStep
          key={step.number}
          stepNumber={step.number}
          isActive={step.number === currentStep}
          isCompleted={step.number < currentStep}
          isLast={step.number === totalSteps}
          label={step.label}
        />
      ))}
    </div>
  );
};

export default ProgressBar;
