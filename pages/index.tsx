import { FC, useState, useCallback } from "react";
import { Scatter, ChartData } from "react-chartjs-2";
import irisFlowers from "../data/iris";
import type { Choice } from "../components/";
import { ChoiceButtons } from "../components";

const Index: FC<{}> = () => {
    const [xAxisProperty, setXAxisProperty] = useState("sepal_width");
    const [yAxisProperty, setYAxisProperty] = useState("sepal_length");

    const generateDataset = useCallback((label: string, selectSpecies: string, color: string) => ({
        label,
        data: irisFlowers.filter(({ species }) => species == selectSpecies)
            .map(irisFlower => ({ x: irisFlower[xAxisProperty], y: irisFlower[yAxisProperty] })),
        pointBackgroundColor: color,
        pointBorderColor: color,
        backgroundColor: color
    }), [xAxisProperty, yAxisProperty]);

    const data: ChartData<Chart.ChartData> = {
        datasets: [
            generateDataset("Setosa", "setosa", "#2b00ff"),
            generateDataset("Versicolor", "versicolor", "#ff0022"),
            generateDataset("Virginica", "virginica", "#00de29")
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
            <h1 className="text-6xl">Iris Visualizer</h1>
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
                <div>
                    <h2 className="text-3xl mb-3">Y Axis</h2>
                    <ChoiceButtons choices={choices} selectedId={yAxisProperty} setSelectedId={setYAxisProperty} />
                </div>
            </section>
        </main>
    );
};

export default Index;