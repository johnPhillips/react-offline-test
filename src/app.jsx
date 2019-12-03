import React from "react";
import styled, { createGlobalStyle } from 'styled-components';

import { Chart, Loader, ErrorMessage } from './components';
import { useFetch, pathOr } from './utils';

// This could go in a constants / config file
const URL = 'https://api.carbonintensity.org.uk/generation';
const CHART_CONFIG = {
    xDataKey: 'fuel',
    yDataKey: 'perc'
};

const GlobalStyle = createGlobalStyle`
  body {
    background: #f5f5f5;
  }
`
export const Wrapper = styled.main`
    margin: 0 auto;
    width: 80%; 
    height: 50%;
    font-family: Arial, sans-serif;
`;

export const App = () => {
    const { isLoading, data, didError } = useFetch(URL);
    const chartData = pathOr(null, ['data', 'generationmix'], data);
    const chartProps = {
        ...CHART_CONFIG,
        chartData,
    };

    const showErrorScreen = didError || !isLoading && !chartData;
    
    return (
        <Wrapper>
            <GlobalStyle />
            <h1>UK Energy Mix</h1>
            {
                // Eek, nested ternary. I don't want to abstract this further because I
                // want to keep this app as simple as possible. However, I would adhere
                // to the team's coding standards here.
                showErrorScreen ?  <ErrorMessage /> : isLoading ? <Loader /> : <Chart {...chartProps }/>
            }
    </Wrapper>
);
};


