import { useState, useCallback } from "react";
import { renderHook } from "@testing-library/react-hooks";
import fetchMock from "fetch-mock";

import mockData from "../example_api_response.json";
import { useFetch } from './utils';

const testUrl = 'test.com';
const errorUrl = 'error-url';
const testData = mockData;

describe("useDataApi", () => {
  beforeAll(() => {
    fetchMock
      .get(testUrl, testData, {
        delay: 0,
      })
      .get(errorUrl, () => {
        throw new Error('Oops');
      });
  });

  afterAll(() => {
    fetchMock.restore();
  });

  it('should call fetch with a GET request to the URL provided, and return the data', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useFetch(testUrl));

    expect(result.current.data).toStrictEqual(null);

    await waitForNextUpdate();

    expect(fetchMock.called(testUrl)).toBe(true);
    expect(result.current.data).toMatchObject(testData);
  });

  it('should initially set isLoading to true, and then set it to false once the request is finished', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useFetch(testUrl));

    expect(result.current.isLoading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
  });

  it('should set didError to true if an error occurs', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useFetch(errorUrl));

    expect(result.current.didError).toBe(false);

    await waitForNextUpdate();

    expect(result.current.didError).toBe(true);
  });
});
