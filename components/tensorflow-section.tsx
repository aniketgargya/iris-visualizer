import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import { useState, useEffect } from 'react';
import { CustomButton } from '../components';
import * as tensorflow from '@tensorflow/tfjs';

const starterCode = `const model = tf.sequential();

const inputData = tf.tensor2d(irisTrainData.map(
    flower =>
        [
            flower["sepal_length"],
            flower["sepal_width"],
            flower["petal_length"],
            flower["petal_width"]
        ]
),
    [irisTrainData.length, 4]
);

const outputData = tf.tensor2d(
    irisTrainData.map(flower => [
        flower.species == "setosa" ? 1 : 0,
        flower.species == "versicolor" ? 1 : 0,
        flower.species == "virginica" ? 1 : 0
    ])
);

const testData = tf.tensor2d(
    irisTestData.map(flower => [
        flower["sepal_length"],
        flower["sepal_width"],
        flower["petal_length"],
        flower["petal_width"]
    ]),
    [irisTestData.length, 4]
);

model.add(tf.layers.dense({
    inputShape: [4],
    units: 10,
    activation: 'sigmoid'
}));

model.add(tf.layers.dense({
    units: 3,
    activation: 'sigmoid'
}));

model.compile({
    optimizer: tf.train.adam(0.06),
    loss: 'meanSquaredError'
});

const start = Date.now();

model.fit(inputData, outputData, { epochs: 100, verbose: true })
    .then(async history => {
        console.log(Date.now() - start);
        model.predict(testData).print();
    });
`;

const TensorflowSection = ({ trainData, testData }) => {
    const [code, setCode] = useState(starterCode);
    const [log, setLog] = useState('');

    useEffect(() => {
        console.log = function (value) {
            setLog(oldLog => `${oldLog}${value}\n`)
        };
    }, []);

    return (
        <section>
            <p>Play around with Tensorflow.js below with the dataset and view outputs in the console below!</p>
            <Editor
                className="bg-blue-900 text-white mb-4"
                value={code}
                onValueChange={text => setCode(text)}
                highlight={text => highlight(text, languages.js)}
                padding={10}
                style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 12,
                }}
            />
            <CustomButton onClick={() => {
                const tf = tensorflow;
                const irisTrainData = trainData;
                const irisTestData = testData;
                eval(code);
            }}>Run Code</CustomButton>
            <pre className="bg-gray-300 p-4 mt-4 max-h-64 overflow-y-scroll">{log}</pre>
        </section>
    );
};

export default TensorflowSection;