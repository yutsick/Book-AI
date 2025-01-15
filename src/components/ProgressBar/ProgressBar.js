import React from "react";
import ProgressStep from "./ProgressStep";
import styles from "./ProgressBar.module.css";

const ProgressBar = ({ currentStep, totalSteps, stepsName, isMobile }) => {
  
  // Генеруємо всі кроки для десктопної версії
  const steps = Array.from({ length: totalSteps + (isMobile ? 1 : 0) }, (_, i) => ({
    number: i + 1,
    label: stepsName[i] || "",
  }));

  // Логіка для мобільної версії
  const transformedSteps = steps.map((step, index) => ({
    ...step,
    number:
      isMobile && (index === 0 || index === steps.length - 1)
        ? null // Перший і останній кружечок без номера
        : step.number,
    isVisible: isMobile ? index === 0 || index === steps.length - 1 || (index + 1) % 2 !== 0 : true, // Ховаємо кружечки тільки для парних кроків
  }));

  // Нумерація видимих кружечків для мобільного
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
        isVisible={step.isVisible}
        isBeforeLast={isMobile && index === transformedSteps.length - 2} // Додаємо клас для передостаннього кроку
        label={step.label}
      />
      ))}
    </div>
  );
};

export default ProgressBar;
