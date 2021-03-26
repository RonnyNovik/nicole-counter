import React from "react";

const CounterBtn = (props) => {
  return <button onClick={() => props.onClick(props.icon)} className={`counter-btn`}>{props.icon}</button>;
};

export default CounterBtn;
