import styled from "styled-components";

export const Wrapper = styled.div`
  width: 360px;
  border: 1px solid black;
  padding: 0;
  margin: 30px;
`;

export const MonthNameWrapper = styled.div`
  height: 30px;
  outline: 1px solid black;
  display: flex;
  justify-content: center;
`;
export const MonthName = styled.h3`
  text-align: center;
`;
export const WeekDay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-basis: calc(100% / 7);
  outline: 1px solid black;
`;
export const DaysWrapper = styled.div`
  display: flex;
`;
export const DatasWrapper = styled.div.attrs(({x,y}) => ({
  style: {
    top: `${y}px`, 
    left: `${x + 5}px`, 
  }
}))`
  display: flex;
  flex-wrap: wrap;
  ::-webkit-scrollbar {
    width: 0px;
  }
  

  
  width: 360px;
  position: fixed;
  height: 350px;
  overflow-y: scroll;



  
`;

const getBgc = ({ currentMonth, currentDate, selected, hovered }) => {
  if (selected && currentDate) return "rgba(153, 0, 0)";
  if (selected && currentMonth) return "rgba(255, 0, 0, 0.8)";
  if (selected) return "rgba(255, 0, 0, 0.4)";
  if (currentDate) return "rgba(255, 0, 0, 1)";
  if (hovered) return "rgba(126, 246, 252)";
  if (currentMonth) return "rgba(255, 0, 0, 0.2)";
  return;
};

export const MonthDay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex-basis: 50px;
  cursor: pointer;
  height: 50px;
  background-color: ${getBgc};


`;
export const MonthWrapper = styled.div`
  height: 350px;
  overflow: hidden;
  border: 5px solid red;
`;

export const EventsBlock = styled.div`
  display: flex; 
  position: absolute; 
  transform: translateY(18px);
`;

const getColor = ({ priority }) => {
  switch (priority) {
    case 1:
      return '#eddf3e'
    case 2:
      return '#f77800'
    case 3:
      return '#780000'
    default:

  }
}


export const EventDot = styled.div`
  width: 8px; 
  height: 8px; 
  background-color: ${getColor};  
  border-radius: 50%;
`

export const EventsPopover = styled.div.attrs(({ top, left }) => ({
  style: {
    top: `${top + 10}px`,
    left: `${left + 10}px`
  }
}))`
  position: fixed;
  z-index: 99999;
  border: 1px solid black;
  background-color: white;
  width: 150px;
`