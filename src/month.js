import React, { useEffect, useRef, useCallback, useState } from "react";
import { DatasWrapper, MonthDay, EventDot, EventsBlock, EventsPopover } from "./styleds";
import {
  getDate,
  getMonth,
} from "./utils";





export const MonthDays = ({
  dates,
  month,
  onChange,
  selectedDates,
  changeMonth,
  changeYear,
  onHover,
  rangeDates,
  events,
  x,
  y
}) => {
  const [eventsBlock, showEventsBlock] = useState({})
  const datesWrapperRef = useRef({})
  useEffect(() => {
    datesWrapperRef.current.scrollTop = 100;
  }, [datesWrapperRef.current])

  useEffect(() => {
    // if (!datesWrapperRef.current.scrollTop) datesWrapperRef.current.scrollTop = 10;
    // if (datesWrapperRef.current.scrollTop > 340) datesWrapperRef.current.scrollTop = 340;
    const offsetWeeks = parseInt(datesWrapperRef.current.scrollTop / 50) + 4;
    const targetDate = dates[(offsetWeeks* 7) + 7]
    changeMonth(targetDate.getMonth() + 1);
    changeYear(targetDate.getFullYear())
  }, [datesWrapperRef.current.scrollTop, dates])



  const handleMouseOver = (e, el, events) => {
    onHover(el);
    if (events.length) {
      showEventsBlock({
        top: e.clientY,
        left: e.clientX,
        content: events
      })
    } else {
      showEventsBlock({})
    }

  }


  return (
    <>
    { eventsBlock.top && eventsBlock.left &&
      <EventsPopover
        top={eventsBlock.top}
        left={eventsBlock.left}
      >
        {eventsBlock.content.map(({ desc, priority }) => (
          <p>
            Priority - {priority}. {desc}
          </p>
          )
        )}
      </EventsPopover>

    }
    <DatasWrapper ref={datesWrapperRef} x={x} y={y} >
      {dates.map(date => getDate(date)).map((el, i) => {
        let currentEvents = events.filter(({ date }) => date === el);

        return (
          <MonthDay
            hovered={rangeDates.some(d => d === el)}
            currentMonth={+month === +getMonth(el)}
            currentDate={el === getDate()}
            selected={selectedDates.some(d => d === el)}
            onClick={() => onChange(el)}
            onMouseOver={(e) => handleMouseOver(e, el, currentEvents)}
            key={el}
          >
            {el.split("-")[1]}
            {
              currentEvents.length ? (
                <EventsBlock>
                   {currentEvents.map(({ priority }, i) =>
                      <EventDot priority={priority} />
                    )}
                </EventsBlock>
              ) : null
            }
          </MonthDay>
      )}
      )
    }
    </DatasWrapper>
    </>
  );
};
