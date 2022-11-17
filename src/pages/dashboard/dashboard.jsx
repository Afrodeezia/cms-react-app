import React from "react";
import './dashboard.scss';

import DayChart from "../../components/daychart/dayChart";
import Topmenu from "../../components/topmenu/topmenu";
import Midmenu from "../../components/midmenu/midmenu";






const Dashboard = () => {

  
  return (
    <div className="dashboard">
      <Topmenu  />
      <Midmenu />
      <DayChart />
      
    </div>
  )
}

export default Dashboard