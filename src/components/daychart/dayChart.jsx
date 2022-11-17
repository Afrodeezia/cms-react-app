import React, {useState} from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'
import './DayChart.scss'

import { ChartData } from '../../data/chartdata'

const DayChart = () => {

  const [bottles] = useState({
    labels: ChartData.map((data) => data.day),
    datasets: [{
      label: "Sales",
      data: ChartData.map((data) => data.caseSold),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
          ],
        borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 2
    }]
  });
  
  return (
    <div className='chart'>
    <h2> Sales Information </h2>
  <Line data={bottles} />
    </div>
  )
}


export default DayChart