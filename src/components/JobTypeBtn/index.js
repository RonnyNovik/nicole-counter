import React from "react";

const JobTypeButton = (props) => {
  const {
    type,
    minCount,
    jobCount,
    name,
    onClickHandler,
    isActive,
    bgColor,
  } = props;
  const percentage = ((jobCount * 100) / minCount).toFixed(2);
  return (
    <div className={`job-type-btn-wrapper`}>
      <button
        onClick={() => onClickHandler(type)}
        className={`job-type-btn ${isActive ? "active" : ""}`}
      >
        <div className={`name-overlay`}>{name}</div>
        <div className={`hover-overlay`}>{jobCount}</div>
      </button>
      <div
        style={{
          width: `${percentage}%`,
          opacity: `${(percentage / 100).toFixed(2)}`,
          background: bgColor,
        }}
        className={`background-overlay ${type} ${
          percentage >= 100 ? "completed" : ""
        }`}
      ></div>
    </div>
  );
};

export default JobTypeButton;
