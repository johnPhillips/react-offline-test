import React from "react";
import {
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
} from 'recharts';

import { useFetch } from './utils';

const URL = 'https://api.carbonintensity.org.uk/generation';

export const Loader = () => (<h1>Loading...</h1>);
export const ErrorMessage = () => (<h1>Oops...</h1>);
export const Chart = ({ data }) => {
    const { data: { generationmix } } = data;
    return (
        <BarChart width={500} height={300} data={generationmix}>
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <XAxis dataKey="fuel" />
            <YAxis dataKey="perc" />
            <Bar dataKey="perc" fill="#8884d8" />
        </BarChart>
    );
};

export const App = () => {
    const { isLoading, data, didError } = useFetch(URL);
    return (
        <div>
            <h1>UK Energy Mix</h1>
            {
                // Eek, nested ternary. I don't want to abstract this further because I
                // want to keep this app as simple as possible. However, I would adhere
                // to the team's coding standards here.
                didError ?  <ErrorMessage /> : isLoading ? <Loader /> : <Chart data={data} />
            }
        </div>
    );
};


