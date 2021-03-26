import React, { useState, useEffect } from "react";
import CounterBtn from "./components/CounterBtn";
import JobTypeBtn from "./components/JobTypeBtn";
import "./App.scss";

function App() {
  const [jobTypes, setJobTypes] = useState({
    free: {
      minTime: 75000,
      name: "FREE",
      minCount: 40,
      totalTime: null,
      jobCount: 0,
      avgTime: null,
      bgColor: "#3A86FF",
    },
    poly: {
      minTime: 24000,
      name: "POLY",
      minCount: 40,
      totalTime: null,
      jobCount: 0,
      avgTime: null,
      bgColor: "#FF006E",
    },
    paid: {
      minTime: 24000,
      name: "PAID",
      minCount: 40,
      totalTime: null,
      jobCount: 0,
      avgTime: null,
      bgColor: "#FB5607",
    },
    bid: {
      minTime: 24000,
      name: "BID",
      minCount: 40,
      totalTime: null,
      jobCount: 0,
      avgTime: null,
      bgColor: "#FFBE0B",
    },
  });

  const [activeJob, setActiveJob] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [timeAvg, setTimeAvg] = useState("00:00");

  const jobTypeClickHandler = (type) => {
    const timeDiff = new Date() - startTime;
    if (activeJob) {
      setJobTypes({
        ...jobTypes,
        [activeJob]: {
          ...jobTypes[activeJob],
          totalTime: jobTypes[activeJob].totalTime + timeDiff,
        },
      });
    }

    setActiveJob(type);
    setTimeAvg("00:00");
    setStartTime(new Date());
  };

  const parseMiliSecs = (timestamp) => {
    const minutes = Math.floor((timestamp / (1000 * 60)) % 60),
      seconds = Math.floor((timestamp / 1000) % 60);

    return `${minutes < 10 ? "0" + minutes : minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
  };

  const counterHandler = (sign) => {
    if (activeJob) {
      const { totalTime, jobCount } = jobTypes[activeJob];

      const jobTypeDuration =
        new Date().getTime() - new Date(startTime).getTime();

      const avgTime =
        sign === "+"
          ? (jobTypeDuration + totalTime) / (jobCount + 1)
          : (jobTypeDuration + totalTime) / (jobCount - 1);

      setJobTypes({
        ...jobTypes,
        [activeJob]: {
          ...jobTypes[activeJob],
          jobCount: sign === "+" ? jobCount + 1 : jobCount - 1,
          avgTime,
        },
      });

      setTimeAvg(parseMiliSecs(avgTime));
    }
  };

  return (
    <div className="App">
      <div className={`container`}>
        <h1 className={`title`}>
          NICOLE
          <br />
          COUNTER
        </h1>
        <div className={`job-type-btn-block`}>
          {Object.keys(jobTypes).map((type) => {
            const data = { ...jobTypes[type] };
            return (
              <JobTypeBtn
                {...data}
                type={type}
                isActive={activeJob.toUpperCase() === jobTypes[type].name}
                onClickHandler={jobTypeClickHandler}
              />
            );
          })}
        </div>
        <h1
          style={{ color: jobTypes[activeJob]?.bgColor }}
          className={`counter`}
        >
          {jobTypes[activeJob]?.jobCount ? jobTypes[activeJob]?.jobCount : "0"}
        </h1>
        <h2 className={`timer`}>{timeAvg}</h2>
        <div className={`counter-btn-block`}>
          <CounterBtn icon={"+"} onClick={counterHandler} />
          <CounterBtn icon={"-"} onClick={counterHandler} />
        </div>
      </div>
    </div>
  );
}

export default App;
