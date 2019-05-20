import React from 'react';
import 'react-vis/dist/style.css';
import {
  FlexibleXYPlot,
  XAxis,
  YAxis,
  MarkSeries,
  LineSeries,
  VerticalGridLines,
  HorizontalGridLines,
} from 'react-vis';

export default function Visualization({ trainingPoints, predictedPoints, lineEquation }) {
  return (
    <section className="visualization">
      <h2 className="section-header">Visualization</h2>

      <FlexibleXYPlot>
        <XAxis />
        <YAxis />
        <HorizontalGridLines />
        <VerticalGridLines />
        <LineSeries data={trainingPoints} color="red" />
        <MarkSeries color="black" data={predictedPoints} />
      </FlexibleXYPlot>

      <table className="prediction-history">
        <thead>
          <tr>
            <th>X Value</th>
            <th>Predicted Y</th>
            <th>Actual Y</th>
          </tr>
        </thead>
        <tbody>
          {predictedPoints.map(({ x, y }) => (
            <tr key={`${x},${y}`}>
              <td>{x}</td>
              <td>{y}</td>
              <td>{lineEquation(x)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
