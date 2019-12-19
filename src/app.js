import React, { useState, useEffect, useCallback, useRef } from "react";
import { Wrapper, MonthNameWrapper, MonthWrapper } from "./styleds";
import {
  getDate,
  getMonth,
  transformDateFormat,
  createFullField,
  transformToNeedFormat,
  getYear,
  months, 
  years,
  createEndDates,
  createStartDates,
  createRangeDates,
  createSelected,
  createHoveredDates
} from "./utils";
import { WeekDays } from "./week";
import { MonthDays } from "./month";




const App = ({
  values = [],
  select = "one",
  events = [],
  onApply = () => {}
}) => {
  const monthWrapperRef = useRef()
  const [coordsMonth, changeCoordsMonth] = useState({ x: 0, y: 0 });
  const [month, changeMonth] = useState(getMonth(getDate()));
  const [year, changeYear] = useState(getYear(getDate()));
  const [dates, changeDates] = useState(createFullField(year, month));
  const [selectedDates, changeSelectedDates] = useState(
      createSelected(values.map(date => transformDateFormat(date)),  select)
  );
  const [mappedEvents] = useState(
      events.map(event => ({ ...event, date: transformDateFormat(event.date) }))
    )



  const [rangeDates, changeRangeDates] = useState([]);
  
  
  const handleHover = el => {
    if (select === "multy" && selectedDates.length === 1) {
      changeRangeDates(createHoveredDates(el, selectedDates[0]));
    }
  };  



  const handleScroll = (e) => {
    if (e.deltaY == 100) {
      const newDates = [
        ...dates.slice(14),
        ...createEndDates(dates[dates.length - 1])
      ];
      changeDates(newDates)
    }
    if (e.deltaY == -100) {
      const newDates = [
        ...createStartDates(dates[0]),
        ...dates.slice(0, dates.length - 14),
      ];
      changeDates(newDates)
    }
  }


  const changeSelectMonth = e => {
    const { currentTarget : { value: newMonth } } = e
    changeDates(createFullField(year, newMonth));
    changeMonth(newMonth);
  };

  const changeSelectYear = e => {
    const { currentTarget : { value: newYear } } = e
    changeDates(createFullField(newYear, month))
    changeYear(newYear);
  };

  const handleChange = useCallback(
    date => {
      if (select === "one") {
        changeSelectedDates([date]);
        return;
      }
      if (select === "in") {
        if (selectedDates.some(d => d === date)) {
          changeSelectedDates([...selectedDates.filter(d => d !== date)]);
          return;
        }
        changeSelectedDates([...selectedDates, date]);
        return;
      }
      if (select === "multy") {
        if (selectedDates.length > 1 || !selectedDates.length) {
          changeSelectedDates([date]);
        }
        if (selectedDates.length === 1) {
          const period =  createRangeDates([...selectedDates, date])
          changeSelectedDates(period);
          changeRangeDates([])
        }
      }
    },
    [selectedDates]
  );

  const handleApply = useCallback(() => {
    if (select === "multy") {
      const newSelectedDates = [
        transformToNeedFormat(selectedDates[0], 'dd-mm-YYYY'),
        transformToNeedFormat(selectedDates[selectedDates.length - 1], 'dd-mm-YYYY')
      ];
      onApply(newSelectedDates);
    } else {
      onApply([transformToNeedFormat(selectedDates, 'dd-mm-YYYY')]);
    }
  }, [selectedDates]);



    const handleClear = useCallback(() => {
    changeSelectedDates([]);
  }, [selectedDates]);

  useEffect(() => {
    if (monthWrapperRef.current) {
      const { x, y } = monthWrapperRef.current.getBoundingClientRect()
      changeCoordsMonth({ x, y })
    }
  }, [monthWrapperRef.current])




  return (
    <Wrapper  onWheel={handleScroll}  >
      <MonthNameWrapper>
        <select onChange={changeSelectMonth}>
          {months.map((el, i) => {
            return (
              <option value={i + 1} selected={i + 1 === +month} key={el}>
                {months[i]}
              </option>
            );
          })}
        </select>
        <select onChange={changeSelectYear}>
          {years.map((el, i) => {
            return (
              <option value={el} selected={+el === +year} key={el}>
                {el}
              </option>
            );
          })}
        </select>
      </MonthNameWrapper>
      <WeekDays />
      <MonthWrapper ref={ monthWrapperRef } >
        <MonthDays
          onChange={handleChange}
          selectedDates={selectedDates}
          dates={dates}
          month={month}
          select={select}
          changeMonth={changeMonth}
          changeYear={changeYear}
          rangeDates={ rangeDates }
          onHover={ handleHover }
          events={ mappedEvents }
          x={coordsMonth.x}
          y={coordsMonth.y}
      />
      </MonthWrapper>
      <div
        style={{
          float: "right",
          marginTop: "10px"
        }}
      >
        <button
          style={{ fontSize: "20px", padding: "3px", margin: "5px" }}
          onClick={handleClear}
        >
          Clear
        </button>
        <button
          style={{ fontSize: "20px", padding: "3px", margin: "5px" }}
          onClick={handleApply}
        >
          Apply
        </button>
      </div>
    </Wrapper>
  );
};

export default App;
