import React from "react";
import {
    BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip,
} from 'recharts';
import { useFetch } from './utils';

const URL = 'https://api.carbonintensity.org.uk/generation';

export const Loader = () => (<h1>Loading...</h1>);
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
    const { isLoading, data } = useFetch(URL);
    return (
        <div>
            <h1>UK Energy Mix</h1>
            {
                isLoading ? <Loader /> : <Chart data={data} />
            }
        </div>
    );
};


