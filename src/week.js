import React from "react";
import { DaysWrapper, WeekDay } from "./styleds";
import { days } from "./utils";
export const WeekDays = () => {
  return (
    <DaysWrapper>
      {days.map(d => (
        <WeekDay key={d}>{d}</WeekDay>
      ))}
    </DaysWrapper>
  );
};
