import React from 'react';
import 'react-vis/dist/style.css';
import {
  FlexibleWidthXYPlot,
  XAxis,
  YAxis,
  MarkSeries,
  DiscreteColorLegend,
  LineMarkSeries,
  LineSeries,
  VerticalGridLines,
  HorizontalGridLines,
} from 'react-vis';

export default function Visualization({ trainingPoints, predictedPoints, lineEquation }) {
  const series = [
    {
      title: 'Training Data',
      color: 'red',
    },
    {
      title: 'Predictions',
      color: 'black',
    },
  ];

  return (
    <section className="visualization">
      <h2 className="section-header">Visualization</h2>

      <FlexibleWidthXYPlot height={400}>
        <DiscreteColorLegend items={series} orientation="horizontal" />
        <XAxis />
        <YAxis />
        <HorizontalGridLines />
        <VerticalGridLines />
        <LineMarkSeries data={trainingPoints} color={series[0].color} />
        <MarkSeries color={series[1].color} data={predictedPoints} />
      </FlexibleWidthXYPlot>
    </section>
  );
}
