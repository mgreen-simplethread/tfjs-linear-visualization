import React from 'react';

const History = ({ predictedPoints, lineEquation }) => (
  <section className="prediction-history">
    <table className="predictions">
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

export default History;
