import React from "react";
import ProgressStep from "./ProgressStep";
import styles from "./ProgressBar.module.css";

const ProgressBar = ({ currentStep, progressStep, totalSteps, stepsName, isMobile, myAccount }) => {
  currentStep = isMobile ? currentStep : progressStep ;
  
  const steps = Array.from({ length: totalSteps + (isMobile ? 2 : 0) }, (_, i) => ({
    number: i + 1,
    label: stepsName[i] || "",
  }));

  const transformedSteps = steps.map((step, index) => ({
    ...step,
    number:
      isMobile && (index === 0 || index === steps.length - 1)
        ? null 
        : step.number,
    isVisible: isMobile ? index === 0 || index === steps.length - 1 || (index + 1) % 2 !== 0 : true, 
  }));

  let visibleIndex = 0;
  transformedSteps.forEach((step) => {
    if (step.isVisible && step.number !== null) {
      visibleIndex += 1;
      step.displayNumber = visibleIndex;
    } else {
      step.displayNumber = null;
    }
  });

  return (
    <div className={styles.progressBar}>
      {transformedSteps.map((step, index) => (
        <ProgressStep
        isMobile = {isMobile}
        key={index}
        stepNumber={step.displayNumber}
        isActive={index + 1 === currentStep}
        isCompleted={index + 1 < currentStep}
        isLast={index === transformedSteps.length - 1}
        isFirst={index === 0}
        isVisible={step.isVisible}
        isBeforeLast={isMobile && index === transformedSteps.length - 2} 
        label={step.label}
        myAccount={myAccount}
        progressStep={progressStep}
      />
      ))}
    </div>
  );
};

export default ProgressBar;
