import React from "react";
import Enzyme, { mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { App, Loader, Chart } from "./app";

Enzyme.configure({ adapter: new Adapter() });

describe("<App>", () => {
    it(" renders", () => {
        mount(<App />);
    });

    it(" renders a <Chart> component", () => {
        const component = mount(<App />);
        const wrapperDiv = component.find('div');
        expect(wrapperDiv.children(Chart).length).toBe(1);
    });
});

describe("<Chart>", () => {
    it(" renders a <Loader> when 'isLoading' prop is true", () => {
        const component = mount(<Chart isLoading />);
        expect(component.children(Loader).length).toEqual(1);
    });
});


