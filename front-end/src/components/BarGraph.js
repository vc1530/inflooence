// import React from 'react';
// import Chart from 'chart.js/auto';
// import { getRelativePosition } from 'chart.js/helpers';

// const labels = ['January', 'February', 'Monday', 'Thursday', 'Friday', 'Wednesday', 'Tuesday'];
// const data = {
//   labels: labels,
//   datasets: [{
//     label: 'My First Dataset',
//     data: [65, 59, 80, 81, 56, 55, 40],
//     backgroundColor: [
//       'rgba(255, 99, 132, 0.2)',
//       'rgba(255, 159, 64, 0.2)',
//       'rgba(255, 205, 86, 0.2)',
//       'rgba(75, 192, 192, 0.2)',
//       'rgba(54, 162, 235, 0.2)',
//       'rgba(153, 102, 255, 0.2)',
//       'rgba(201, 203, 207, 0.2)'
//     ],
//     borderColor: [
//       'rgb(255, 99, 132)',
//       'rgb(255, 159, 64)',
//       'rgb(255, 205, 86)',
//       'rgb(75, 192, 192)',
//       'rgb(54, 162, 235)',
//       'rgb(153, 102, 255)',
//       'rgb(201, 203, 207)'
//     ],
//     borderWidth: 1
//   }]
// };

// const chart = new Chart(utx, {
// 	type: 'bar',
// 	data: data,
// 	options: {
// 		scales: {
// 			y: {
// 			  beginAtZero: true
// 			}
// 		  }
// 	}
//   });

// const BarGraph = (props) => {
// 	return chart; 

//         // const addSymbols = e => {
//         //     var suffixes = ["", "K", "M", "B"];
//         //     var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
//         //     if(order > suffixes.length - 1)
//         //         order = suffixes.length - 1;
//         //     var suffix = suffixes[order];
//         //     return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
//         // }

// 		// const options = {
// 		// 	animationEnabled: true,
// 		// 	theme: "light2",
// 		// 	title:{
// 		// 		// text: props.title
// 		// 	},
// 		// 	axisX: {
// 		// 		title: "Spotify Metrics",
// 		// 		reversed: true,
// 		// 	},
// 		// 	// axisY: {
// 		// 	// 	title: "Monthly Active Users",
// 		// 	// 	includeZero: true,
// 		// 	// 	labelFormatter: addSymbols
// 		// 	// },
// 		// 	data: [{
// 		// 		type: "bar",
// 		// 		dataPoints: [
// 		// 			{ y:  props.acousticness, label: "Acousticness" },
// 		// 			{ y:  props.energy, label: "Energy" },
// 		// 			{ y:  props.liveness, label: "Liveness" },
// 		// 			{ y:  props.loudness, label: "Loudness" },
// 		// 			{ y:  props.tempo, label: "Tempo" },
// 		// 			// { y:  336000000, label: "Twitter" },
// 		// 			// { y:  330000000, label: "Reddit" }
// 		// 		]
// 		// 	}]
// 		// }

// 		// return (
// 		// <div>
// 		// 	<CanvasJSChart options = {options}
// 		// 		/* onRef={ref => this.chart = ref} */
// 		// 	/>
// 		// 	{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
// 		// </div>
// 		// );

// } 

// export default BarGraph;   

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Analytics',
    },
  },
};

const labels = ['Acousticness', 'Danceability', 'Energy', 'Liveness'];
export default function BarGraph(props) {
	const song = props.song 
	console.log(song) 
	const data = {
		labels,
		datasets: [
			{
			label: 'Dataset 1',
			data: [song.ac, song.dance, song.energy, song.liveness],
			backgroundColor: 'rgba(255, 99, 132, 0.5)',
			},
		],
	};
  return <Bar options={options} data={data} />;
}