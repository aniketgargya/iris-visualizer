import { useState, useCallback, useMemo, FC } from "react";
import { Scatter, ChartData } from "react-chartjs-2";
import shuffle from 'shuffle-array';

import { ChoiceButtons, CustomButton, Choice } from "../components/";
import { trainData, testData as TestData, color, label, Species, IrisProperty, IrisFlower } from "../data/";

const Index: FC<{}> = () => {
    const [xAxisProperty, setXAxisProperty] = useState<IrisProperty>("sepal_width");
    const [yAxisProperty, setYAxisProperty] = useState<IrisProperty>("sepal_length");
    const [answersHidden, setAnswersHidden] = useState<boolean>(true);

    const testData: IrisFlower[] = useMemo(() => shuffle(TestData), []);

    const generateDataset = useCallback((label: string, selectSpecies: Species, color: string) => ({
        label,
        data: trainData.filter(({ species }) => species == selectSpecies)
            .map(irisFlower => ({ x: irisFlower[xAxisProperty], y: irisFlower[yAxisProperty] })),
        pointBackgroundColor: color,
        pointBorderColor: color,
        backgroundColor: color
    }), [xAxisProperty, yAxisProperty]);

    const unknownDataset = useMemo(() => ({
        label: "Unknown",
        data: testData.map((irisFlower) => ({ x: irisFlower[xAxisProperty], y: irisFlower[yAxisProperty] })),
        pointBackgroundColor: "#000000",
        pointBorderColor: "#000000",
        backgroundColor: "#000000"
    }), [xAxisProperty, yAxisProperty]);

    const data: ChartData<Chart.ChartData> = {
        labels: ['aniket', 'gargya'],
        datasets: [
            unknownDataset,
            useMemo(() => generateDataset("Setosa", "setosa", color["setosa"]), [xAxisProperty, yAxisProperty]),
            useMemo(() => generateDataset("Versicolor", "versicolor", color["versicolor"]), [xAxisProperty, yAxisProperty]),
            useMemo(() => generateDataset("Virginica", "virginica", color["virginica"]), [xAxisProperty, yAxisProperty])
        ]
    };

    const choices: Choice[] = [
        {
            displayName: "Sepal Length",
            id: "sepal_length"
        },
        {
            displayName: "Sepal Width",
            id: "sepal_width"
        },
        {
            displayName: "Petal Length",
            id: "petal_length"
        },
        {
            displayName: "Petal Width",
            id: "petal_width"
        }
    ];

    return (
        <main className="w-4/5 m-auto max-w-6xl">
            <h1 className="text-6xl text-center">Iris Visualizer</h1>
            <figure>
                <img src="/petal-sepal.png" alt="" className="w-full" />
                <figcaption>Image from <a href="https://thegoodpython.com/iris-dataset/" className="underline text-blue-500">The Good Python</a></figcaption>
            </figure>
            <section>
                <Scatter data={data} />
                <div className="mb-6">
                    <h2 className="text-3xl mb-3">X Axis</h2>
                    <ChoiceButtons choices={choices} selectedId={xAxisProperty} setSelectedId={setXAxisProperty} />
                </div>
                <div className="mb-6">
                    <h2 className="text-3xl mb-3">Y Axis</h2>
                    <ChoiceButtons choices={choices} selectedId={yAxisProperty} setSelectedId={setYAxisProperty} />
                </div>
                <CustomButton
                    className="mb-6"
                    onClick={() => { setAnswersHidden(current => !current) }}
                >
                    {`${answersHidden ? "Hide" : "Show"} Answers`}
                </CustomButton>
                {
                    <table className="w-full border-solid border-black border-2 mb-6">
                        <thead>
                            <tr>
                                <td className="w-1/3 px-4 py-2">{label[xAxisProperty]}</td>
                                <td className="w-1/3 px-4 py-2">{label[yAxisProperty]}</td>
                                <td className="w-1/3 px-4 py-2">Species</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                testData.map((irisFlower, i) => (
                                    <tr key={i} className={`${i % 2 == 0 && "bg-gray-100"}`}>
                                        <td className="border px-4 py-2">{irisFlower[xAxisProperty]}</td>
                                        <td className="border px-4 py-2">{irisFlower[yAxisProperty]}</td>
                                        <td className={`border px-4 py-2 ${answersHidden && "opacity-0"}`}>{irisFlower["species"]}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                }
            </section>
        </main>
    );
};

export default Index;