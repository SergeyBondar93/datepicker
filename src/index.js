import React from "react";
import { render } from "react-dom";
import App from "./app";
import "./index.css";

const dummyEvents = [
  { date: '17-12-2019', desc: 'This is first event.', priority: 1 },
  { date: '17-12-2019', desc: 'This is second event.', priority: 2 },
  { date: '17-12-2019', desc: 'This is third event.', priority: 3 },
  { date: '16-12-2019', desc: 'This is first event.', priority: 1 },
  { date: '20-12-2019', desc: 'This is second event.', priority: 2 },
  { date: '07-01-2020', desc: 'This is third event.', priority: 3 },
  { date: '05-12-2019', desc: 'This is first event.', priority: 1 },
  { date: '03-01-2020', desc: 'This is second event.', priority: 2 },
  { date: '08-12-2019', desc: 'This is third event.', priority: 3 },
]

render(
  <div style={{ display: 'flex' }} >
    <div  style={{ width: '400px', textAlign: 'center', marginTop: '100px' }}>
      Диапазон выбора
      <App
        select="multy"
        onApply={date => console.log("Selected dates is ", date)}
        values={["10-12-2019", "27-12-2019"]}
        events={ dummyEvents  }
        />
    </div>
    <div  style={{ width: '400px', textAlign: 'center', marginTop: '100px' }}>
      Несколько дат 
      <App
        select="in"
        onApply={date => console.log("Selected dates is ", date)}
        values={["15-12-2019", "25-10-2019"]}
        events={ dummyEvents  }
        />
    </div>
    <div  style={{ width: '400px', textAlign: 'center', marginTop: '100px' }}>
      Одна дата
      <App
        select="one"
        onApply={date => console.log("Selected dates is ", date)}
        values={["15-12-2019"]}
        events={ dummyEvents  }
        />
    </div>
    
  </div>
    ,
  document.getElementById("root")
);
