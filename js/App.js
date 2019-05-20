import math from 'mathjs';
import React, { Component } from 'react';
import classnames from 'classnames';
import { makeModel, tensor2d } from './lib/model';
import { range } from './lib/range';
import TrainingForm from './TrainingForm';
import PredictionForm from './PredictionForm';
import Visualization from './Visualization';
import History from './History';

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
    rawPoints: '',
    trainingPoints: [],
    predictedPoints: [],
    equation: '2 * x - 1',
  };

  equationParser() {
    const parser = math.parser();
    parser.eval(`f(x) = ${this.state.equation}`);
    return parser;
  }

  solveEquation = (x) => this.equationParser().eval(`f(${x})`);

  onChange = ({ target: { name, value, type } }) => {
    console.log('change event: %s, %s', name, value);

    if (type === 'number') return this.setState({ [name]: parseInt(value, 10) });

    this.setState({ [name]: value });
  };

  plotEquationPoints() {
    try {
      const equation = this.equationParser();
      const { xValues } = this;
      const points = xValues.map((x) => ({ x, y: equation.eval(`f(${x})`) }));
      console.log('Equation point: %O', points);
      return points;
    } catch (err) {
      console.warn('error plotting equation points: %O', err);
      return [];
    }
  }

  trainingSubmit = (evt) => {
    evt.preventDefault();
    const trainingPoints = this.plotEquationPoints();
    this.setState({ trainingPoints });
    this.retrainModel();
  };

  setTrainingPoints = (evt) => {
    evt.preventDefault();
    const trainingPoints = this.parseCSV(this.state.rawPoints);
    this.setState({ trainingPoints });
    this.retrainModel();
  };

  parseCSV = (str) =>
    str.split('\n').map((s) => {
      const [x, y] = s.split(',', 2).map((n) => parseInt(n, 10));
      return { x, y };
    });

  predictSubmit = (evt) => {
    evt.preventDefault();
    const prediction = this.model.predict(tensor2d([this.state.xValue])).arraySync()[0][0];
    const predictedPoints = [...this.state.predictedPoints, { x: this.state.xValue, y: prediction }];
    const trainingPoints = [
      ...this.state.trainingPoints,
      { x: this.state.xValue, y: this.solveEquation(this.state.xValue) },
    ];
    console.log('Prediction: %O', prediction);
    this.setState({ prediction, predictedPoints, trainingPoints });
  };

  componentDidMount() {
    const trainingPoints = this.plotEquationPoints();
    this.setState({ trainingPoints }, () => this.retrainModel());
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
        </section>

        <TrainingForm
          onSubmit={this.trainingSubmit}
          setTrainingPoints={this.setTrainingPoints}
          onChange={this.onChange}
          equation={this.state.equation}
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
          lineEquation={this.solveEquation}
        />

        <History lineEquation={this.solveEquation} predictedPoints={this.state.predictedPoints} />
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
          {this.solveEquation(this.state.xValue)}
        </p>
      </div>
    );
  }

  async retrainModel() {
    let xValues = [],
      yValues = [];

    for (const { x, y } of this.state.trainingPoints) {
      xValues.push(x);
      yValues.push(y);
    }

    console.log('Train with X values: %O, Y values: %O', xValues, yValues);

    const xs = tensor2d(xValues);
    const ys = tensor2d(yValues);

    console.log('Retrain model');

    this.setState({ training: true, predictedPoints: [] });
    this.model = makeModel();
    await this.model.fit(xs, ys, { epochs: this.state.epochs });
    this.setState({ training: false });
  }

  get xValues() {
    return range(this.state.startX, this.state.endX);
  }

  formatEquation() {
    const negIntercept = this.state.yIntercept < 0;
    let output = `y = ${this.state.xMultiplier}x`;
    output += ` ${negIntercept ? '-' : '+'} ${Math.abs(this.state.yIntercept)}`;
    return output;
  }
}

export default App;
