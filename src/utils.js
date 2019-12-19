export const days = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];
export const months = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь"
];
export const years = new Array(100).fill(true).map((el, i) => 1970 + i);


//получение даты в mm-dd-YYYY
export const getDate = date => {
  const fullDate = date ? new Date(date) : new Date();
  const dd = fullDate.getDate();
  const mm = fullDate.getMonth() + 1;
  const YYYY = fullDate.getFullYear();

  return `${mm < 10 ? `0${mm}` : mm}-${dd < 10 ? `0${dd}` : dd}-${YYYY}`;
};


export const getMonthAndYear = () => {
  let startDate = new Date();
  return (month) => {
    const date = new Date (new Date(+startDate).setMonth(month - 1));
    startDate = +date
    return {
      month: date.getMonth() + 1,
      year: date.getFullYear()
    }
  }
}

// трансформация даты в формат mm-dd-YYYY
export const transformDateFormat = (date) => {
    const splitD = date.split("-");
    const dd = splitD[0] < 10 ? `${splitD[0]}` : splitD[0];
    const mm = splitD[1] < 10 ? `${splitD[1]}` : splitD[1];
    return `${mm}-${dd}-${splitD[2]}`;
};


// создание поля
export const createFullField = (year, month) => {
  const firstDate = new Date(`${month}-01-${year}`);

  const lastDate = new Date((new Date((new Date(`${month}-01-${year}`)).setMonth(month))).setDate(0));


  const firstDay = firstDate.getUTCDay();
  const lastDay = lastDate.getUTCDay();
  const datesLength = lastDate.getDate() + 7 + firstDay + 7 + (7 - lastDay) - 1;

  return new Array(+datesLength < 56 ? 56 + 14 + 28 : +datesLength + 14 + 28).fill(true).map((_el, i) => {
    const date = new Date(+firstDate);
    date.setDate(i - 14 - firstDay + 1);
    return date;
  })
};
export const createEndDates = (startDate) => {
  return new Array(14).fill(true).map((el, i) => {
    const date = new Date(+startDate);
    date.setDate(startDate.getDate() + i + 1);
    return date
  })
}
export const createStartDates = (startDate) => {
  return new Array(14).fill(true).map((el, i) => {
    const date = new Date(+startDate);
    date.setDate(startDate.getDate() - 14 + i);
    return date
  })
}



export const getMonth = date => date.split("-")[0];
export const getYear = date => date.split("-")[2];


export const transformToNeedFormat = (date, target = "mm-dd-YYYY") => {
  if (!date) return;
  if (target = "dd-mm-YYYY") {
    const newDate = date.split("-");
    return `${newDate[1]}-${newDate[0]}-${newDate[2]}`;
  }
  if (target = "mm-dd-YYYY") {
    const newDate = date.split("-");
    return `${newDate[1]}-${newDate[0]}-${newDate[2]}`;
  }
  return date;
};



const day = 86400000;
export const createRangeDates = (dates) => {
  const newDates = dates
    .map(el => +(new Date(el)))
    .sort();

  const diff = (newDates[1] - newDates[0]) / day;
  const period = new Array(+diff + 1)
    .fill(true)
    .map((_el, i) => getDate(+newDates[0] + i * day));
    return period
}
export const createSelected = (dates, select) => {
  if (select === 'one') return dates 
  if (select === 'in') return  dates
  if (select === 'multy') return  createRangeDates(dates)
  console.log('lol', dates, select)
} 
export const createHoveredDates = (hover, select) => {
  const arr = [hover, select].map(el => +(new Date(el))).sort();
  const diff = (arr[1] - arr[0]) / day;
  const period = new Array(+diff)
    .fill(true)
    .map((el, i) => getDate(arr[0] + (i + 1) * day));
  return period;
};