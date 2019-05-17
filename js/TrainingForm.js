import React from 'react';
import { func, number, bool } from 'prop-types';
import Field from './Field';

export default function TrainingForm({ onSubmit, onChange, xMultiplier, yIntercept, startX, endX, epochs, training }) {
  return (
    <section className="training">
      <h2 className="section-header">Training</h2>

      <form onSubmit={onSubmit} className="training-form">
        <Field
          label="X-Multiplier"
          id="x-multiplier"
          name="xMultiplier"
          type="number"
          value={xMultiplier}
          onChange={onChange}
        />
        <Field
          label="Y-Intercept"
          id="y-intercept"
          name="yIntercept"
          type="number"
          value={yIntercept}
          onChange={onChange}
        />
        <Field label="Start X" id="start-x" name="startX" type="number" value={startX} onChange={onChange} />
        <Field label="End X" id="end-x" name="endX" type="number" value={endX} onChange={onChange} />
        <Field
          label="Epochs (training iterations)"
          id="epochs"
          name="epochs"
          type="number"
          value={epochs}
          onChange={onChange}
        />

        <button type="submit" disabled={training}>
          Train Neural Network
        </button>
      </form>
    </section>
  );
}

TrainingForm.propTypes = {
  onSubmit: func,
  onChange: func,
  xMultiplier: number,
  yIntercept: number,
  startX: number,
  endX: number,
  epochs: number,
  training: bool,
};
