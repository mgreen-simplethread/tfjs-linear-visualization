import * as tf from '@tensorflow/tfjs';

const defaults = {
  loss: 'meanSquaredError',
  optimizer: 'sgd',
};

export function makeModel(options = {}) {
  const { loss, optimizer } = Object.assign({}, defaults, options);
  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
  model.compile({ loss, optimizer });
  return model;
}

export function tensor2d(values = []) {
  return tf.tensor2d(values, [values.length, 1]);
}
