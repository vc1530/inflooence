import React from 'react';
import CanvasJSReact from './canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const BarGraph = (props) => {

        const addSymbols = e => {
            var suffixes = ["", "K", "M", "B"];
            var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
            if(order > suffixes.length - 1)
                order = suffixes.length - 1;
            var suffix = suffixes[order];
            return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
        }

		const options = {
			animationEnabled: true,
			theme: "light2",
			title:{
				// text: props.title
			},
			axisX: {
				title: "Spotify Metrics",
				reversed: true,
			},
			// axisY: {
			// 	title: "Monthly Active Users",
			// 	includeZero: true,
			// 	labelFormatter: addSymbols
			// },
			data: [{
				type: "bar",
				dataPoints: [
					{ y:  props.acousticness, label: "Acousticness" },
					{ y:  props.energy, label: "Energy" },
					{ y:  props.liveness, label: "Liveness" },
					{ y:  props.loudness, label: "Loudness" },
					{ y:  props.tempo, label: "Tempo" },
					// { y:  336000000, label: "Twitter" },
					// { y:  330000000, label: "Reddit" }
				]
			}]
		}

		return (
		<div>
			<CanvasJSChart options = {options}
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);

} 

export default BarGraph;   