import React from 'react';
import Field from './Field';

export default function PredictionForm({ onSubmit, xValue, onChange, training, showPrediction }) {
  return (
    <section className="prediction">
      <h2 className="section-header">Prediction</h2>

      <form onSubmit={onSubmit} className="prediction-form">
        <Field label="X Value" name="xValue" id="x-value" onChange={onChange} type="number" />

        <button type="submit" disabled={training}>
          Predict Y Value
        </button>

        {showPrediction()}
      </form>
    </section>
  );
}
