import { FC } from 'react';
import { Scatter, ChartData } from 'react-chartjs-2';
import irisFlowers from '../data/iris';

const Index: FC<{}> = () => {
    const data: ChartData<Chart.ChartData> = {
        datasets: [
            {
                label: "Setosa",
                data: irisFlowers.filter(({ species }) => species == "setosa").map(({ petal_length: x, petal_width: y }) => ({ x, y })),
                pointBackgroundColor: "#2b00ff",
                pointBorderColor: "#2b00ff",
                backgroundColor: "#2b00ff"
            },
            {
                label: "Versicolor",
                data: irisFlowers.filter(({ species }) => species == "versicolor").map(({ petal_length: x, petal_width: y }) => ({ x, y })),
                pointBackgroundColor: "#ff0022",
                pointBorderColor: "#ff0022",
                backgroundColor: "#ff0022"
            },
            {
                label: "Virginica",
                data: irisFlowers.filter(({ species }) => species == "virginica").map(({ petal_length: x, petal_width: y }) => ({ x, y })),
                pointBackgroundColor: "#00de29",
                pointBorderColor: "#00de29",
                backgroundColor: "#00de29"
            }
        ]
    };

    return (
        <div className="w-1/2 m-auto">
            <Scatter data={data} />
        </div>
    );
};

export default Index;