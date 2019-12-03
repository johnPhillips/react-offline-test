import React from "react";
import styled, { keyframes } from 'styled-components';

import {
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
} from 'recharts';

export const Chart = ({ chartData, xDataKey, yDataKey }) =>(
    <BarChart width={500} height={300} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <XAxis dataKey={xDataKey} />
        <YAxis dataKey={yDataKey} />
        <Bar dataKey="perc" fill="#8884d8" />
    </BarChart>
);

// Credit for the spinner: https://loading.io/css
const animationKeyframes = keyframes`
    0% {
        transform: rotate(0);
        animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
    }
    50% {
        transform: rotate(900deg);
        animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    100% {
        transform: rotate(1800deg);
    }
`;

const Spinner = styled.div`
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
    &:after{
        content: " ";
        display: block;
        border-radius: 50%;
        width: 0;
        height: 0;
        margin: 8px;
        box-sizing: border-box;
        border: 32px solid #ccc;
        border-color: #ccc transparent #ccc transparent;
        animation: ${animationKeyframes} 1.2s infinite;
  }
`

const Hidden = styled.span`position:absolute; left: -1000px;`;

export const Loader = () => (
    <div>
        <Hidden>Loading...</Hidden>
        <Spinner></Spinner>
    </div>        
);

export const ErrorMessage = () => (<h2>Oops, something went wrong!</h2>);
