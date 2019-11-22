import React from "react";
import Enzyme, { mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { App, Loader, Chart, ErrorMessage } from "./app";
import { useFetch } from './utils';
import mockData from "../example_api_response.json";

jest.mock('./utils');
Enzyme.configure({ adapter: new Adapter() });

describe("<App>", () => {
    afterAll(() => {
         jest.restoreAllMocks(); 
    });

    it("renders a <Loader> when 'isLoading' prop is true", () => {
        useFetch.mockReturnValue({ isLoading: true, data: mockData }); 
        const component = mount(<App />);
        const wrapperDiv = component.find('div');
        
        expect(wrapperDiv.children(Loader).length).toEqual(1);
    });

    it("renders a <Chart> component when isLoading is false", () => {
        useFetch.mockReturnValue({ isLoading: false, data: mockData }); 
        
        const component = mount(<App />);
        const wrapperDiv = component.find('div');
        expect(wrapperDiv.children(Chart).length).toBe(1);
    });

    it("renders an <ErrorMessage> component when didError is true", () => {
        useFetch.mockReturnValue({ didError: true }); 
        
        const component = mount(<App />);
        const wrapperDiv = component.find('div');
        expect(wrapperDiv.children(ErrorMessage).length).toBe(1);
    });
});
