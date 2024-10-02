// Import TensorFlow.js
import * as tf from '@tensorflow/tfjs';

const NUM_INPUT = 10;       // Number of inputs
const NUM_HIDDEN = 20;      // Number of neurons in hidden layer
const NUM_OUTPUT = 1;       // Number of outputs
const MAX_EPOCHS = 1000;    // Max training epochs
const ERROR_THRESHOLD = 0.01; // Error threshold for training

// Function to create and train the neural network
async function createAndTrainNeuralNetwork() {
    // Create the model
    const model = tf.sequential();
    
    // Add layers
    model.add(tf.layers.dense({
        inputShape: [NUM_INPUT],
        units: NUM_HIDDEN,
        activation: 'sigmoid',
        kernelInitializer: 'varianceScaling', // Equivalent to WeightInit.XAVIER
    }));
    
    model.add(tf.layers.dense({
        units: NUM_OUTPUT,
        activation: 'sigmoid',
        kernelInitializer: 'varianceScaling',
    }));
    
    // Compile the model
    model.compile({
        optimizer: tf.train.nesterov(0.01, 0.9), // Equivalent to Nesterovs
        loss: 'meanSquaredError',
    });

    // Dummy training data (2 examples)
    const input = tf.tensor2d([
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0, 0, 0, 0]
    ]);

    const output = tf.tensor2d([
        [1],
        [1]
    ]);

    for (let epoch = 0; epoch < MAX_EPOCHS; epoch++) {
        const history = await model.fit(input, output, {
            epochs: 1,
            verbose: 0,
        });

        // Check error threshold condition
        if (history.history.loss[0] < ERROR_THRESHOLD) {
            console.log(`Training stopped early at epoch ${epoch}`);
            break;
        }
    }

    // Save the model (optional, if needed)
    // await model.save('localstorage://neural_network');

    console.log('Neural network trained successfully!');
}

// Function to predict with the trained neural network
async function predictWithNeuralNetwork(model) {
    // Example input for prediction
    const input = tf.tensor2d([
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]);

    // Perform prediction
    const output = model.predict(input);
    output.print(); // Display the prediction
}

// Main function to execute the code
(async function main() {
    // Create and train the neural network
    await createAndTrainNeuralNetwork();

    // Perform predictions with the trained neural network
    await predictWithNeuralNetwork();
})();
