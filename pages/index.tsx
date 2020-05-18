import { FC } from 'react';
import { Scatter, ChartData } from 'react-chartjs-2';
import irisFlowers from '../data/iris';

const Index: FC<{}> = () => {
    const data: ChartData<Chart.ChartData> = {
        datasets: [
            {
                label: 'Hey',
                data: irisFlowers.filter(({ species }) => species == "setosa").map(({ petal_length: x, petal_width: y }) => ({ x, y })),
                pointBackgroundColor: 'green',
                pointBorderColor: 'green'
            }
        ]
    };

    return <Scatter data={data} />
};

export default Index;