import React from 'react';
import { func, number, bool } from 'prop-types';
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';
import { Field, TextArea } from './Field';

import 'react-tabs/style/react-tabs.css';

export default function TrainingForm({
  onSubmit,
  onChange,
  equation,
  startX,
  endX,
  epochs,
  training,
  rawPoints,
  setTrainingPoints,
}) {
  return (
    <section className="training">
      <h2 className="section-header">Training</h2>

      <Tabs>
        <TabList>
          <Tab>Linear Equation</Tab>
          <Tab>Arbitrary Points</Tab>
        </TabList>

        <TabPanel>
          <form onSubmit={onSubmit} className="training-form">
            <Field
              label="Equation to Plot"
              id="equation"
              name="equation"
              type="text"
              value={equation}
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
        </TabPanel>

        <TabPanel>
          <form onSubmit={setTrainingPoints} className="training-form">
            <TextArea id="training-points" name="rawPoints" value={rawPoints} onChange={onChange} />
            <button type="submit" disabled={training}>
              Train Neural Network
            </button>
          </form>
        </TabPanel>
      </Tabs>
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
