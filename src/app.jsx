import React from "react";

export const Loader = () => (<h1>Loading...</h1>);
export const Chart = ({ isLoading }) => {
    return isLoading ? <Loader /> : <h1>UK Energy Mix</h1>;
};

export const App = () => {

    return (
        <div>
            <h1>UK Energy Mix</h1>
            <Chart isLoading />
        </div>
    );
};


