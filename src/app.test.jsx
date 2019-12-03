import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { App, Wrapper } from "./app";
import { useFetch, pathOr } from './utils';
import mockData from "../example_api_response.json";

jest.mock('./utils');
Enzyme.configure({ adapter: new Adapter() });

describe("<App>", () => {
    afterAll(() => {
         jest.restoreAllMocks(); 
    });

    it("renders a <Loader> when 'isLoading' prop is true", () => {
        useFetch.mockReturnValue({
            isLoading: true,
            didError: false,
            data: undefined, 
        }); 
        const component = mount(<App />);
        expect(component.find('Loader').length).toEqual(1);
    });

    it("renders a <Chart> component when isLoading is false", () => {
        useFetch.mockReturnValue({
            isLoading: false,
            didError: false,
            data: mockData,
        });
        pathOr.mockReturnValue(mockData.data.generationmix);

        const component = mount(<App />);
        expect(component.find('Chart').length).toBe(1);
    });

    it("renders an <ErrorMessage> component when didError is true", () => {
        useFetch.mockReturnValue({
            isLoading: false,
            didError: true,
            data: undefined,
        });
        
        const component = mount(<App />);
        expect(component.find('ErrorMessage').length).toBe(1);
    });
});
