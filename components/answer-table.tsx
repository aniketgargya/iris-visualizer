import { FC } from 'react';

const AnswerTable = ({ label, testData, xAxisProperty, yAxisProperty, answersHidden }) => (
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
);

export default AnswerTable;