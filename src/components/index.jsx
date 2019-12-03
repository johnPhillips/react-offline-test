/*
 * I'd normally break these components out into their own subdirectories 
 * along with styles and tests, but I want to keep the app as simple as 
 * possible.
 */
import React from "react";
import styled, { keyframes } from 'styled-components';
import {
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

const Hidden = styled.span`
    position:absolute;
    left: -1000px;
`;

// [Credit for the spinner: https://loading.io/css]
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
    display: block;
    position: relative;
    width: 80px;
    height: 80px;
    margin: 25% auto;
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

const ChartWrapper = styled(ResponsiveContainer)`
    background: white;
    border: 1px solid #ccc;
    border-radius: 6px;
`;

export const ErrorMessage = () => (<h2>Oops, something went wrong!</h2>);

export const Loader = () => (
    <>
        <Hidden>Loading...</Hidden>
        <Spinner></Spinner>
    </>        
);

export const Chart = ({ chartData, xDataKey, yDataKey }) =>(
    <ChartWrapper width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <XAxis dataKey={xDataKey} />
            <YAxis dataKey={yDataKey} />
            <Bar dataKey="perc" fill="#8884d8" />
        </BarChart>
    </ChartWrapper>
);
