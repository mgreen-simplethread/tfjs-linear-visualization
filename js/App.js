import React, { Component } from 'react';
import classnames from 'classnames';
import { makeModel, tensor2d } from './lib/model';
import { range } from './lib/range';
import TrainingForm from './TrainingForm';
import PredictionForm from './PredictionForm';
import Visualization from './Visualization';

class App extends Component {
  state = {
    epochs: 500,
    yIntercept: -1,
    xMultiplier: 2,
    startX: -10,
    endX: 10,
    training: false,
    xValue: null,
    prediction: null,
    trainingPoints: [],
    predictedPoints: [],
  };

  lineEquation = (x) => this.state.xMultiplier * x + this.state.yIntercept;

  onChange = ({ target: { name, value } }) => {
    const intValue = parseInt(value, 10);
    this.setState({ [name]: intValue });
  };

  trainingSubmit = (evt) => {
    evt.preventDefault();
    this.retrainModel();
  };

  predictSubmit = (evt) => {
    evt.preventDefault();
    const prediction = this.model.predict(tensor2d([this.state.xValue])).arraySync();
    const predictedPoints = [...this.state.predictedPoints, { x: this.state.xValue, y: prediction }];
    const trainingPoints = [
      ...this.state.trainingPoints,
      { x: this.state.xValue, y: this.lineEquation(this.state.xValue) },
    ];
    console.log('Prediction: %O', prediction);
    this.setState({ prediction, predictedPoints, trainingPoints });
  };

  componentDidMount() {
    this.retrainModel();
  }

  render() {
    return (
      <div className="card">
        <header className="card__header">
          <h1 className="card__title">TensorFlow.js Linear Regression</h1>
        </header>

        <section className={classnames('status', { '-is-training': this.state.training })}>
          <p>
            <strong>Status:</strong> {this.state.training ? 'Training Model' : 'Model Trained'}
          </p>
          <p>
            <strong>Line Equation:</strong> <code>{this.formatEquation()}</code>
          </p>
        </section>

        <TrainingForm
          onSubmit={this.trainingSubmit}
          onChange={this.onChange}
          xMultiplier={this.state.xMultiplier}
          yIntercept={this.state.yIntercept}
          startX={this.state.startX}
          endX={this.state.endX}
          epochs={this.state.epochs}
          training={this.state.training}
        />

        <PredictionForm
          onSubmit={this.predictSubmit}
          onChange={this.onChange}
          xValue={this.state.xValue}
          showPrediction={this.showPrediction.bind(this)}
          training={this.state.training}
        />

        <Visualization
          trainingPoints={this.state.trainingPoints}
          predictedPoints={this.state.predictedPoints}
          lineEquation={this.lineEquation}
        />
      </div>
    );
  }

  showPrediction() {
    if (!this.state.prediction) return '';
    return (
      <div className="prediction">
        <p>
          <strong>Predicted Y value:</strong>
          {this.state.prediction}
        </p>
        <p>
          <strong>Actual Y Value:</strong>
          {this.lineEquation(this.state.xValue)}
        </p>
      </div>
    );
  }

  async retrainModel() {
    const xValues = this.xValues;
    const yValues = this.yValues;
    const xs = tensor2d(xValues);
    const ys = tensor2d(yValues);
    const trainingPoints = xValues.map((x) => ({ x, y: this.lineEquation(x) }));

    console.log('Retrain model');
    console.log('X values: %O', xValues);
    console.log('Y values: %O', yValues);

    this.setState({ training: true, trainingPoints, predictedPoints: [] });

    this.model = makeModel();

    await this.model.fit(xs, ys, { epochs: this.state.epochs });
    this.setState({ training: false });
  }

  get xValues() {
    return range(this.state.startX, this.state.endX);
  }

  get yValues() {
    return this.xValues.map(this.lineEquation);
  }

  formatEquation() {
    const negIntercept = this.state.yIntercept < 0;
    let output = `y = ${this.state.xMultiplier}x`;
    output += ` ${negIntercept ? '-' : '+'} ${Math.abs(this.state.yIntercept)}`;
    return output;
  }
}

export default App;
