import { useState, useEffect } from "react";
import "whatwg-fetch";


export const useFetch = url => {
    const [isLoading, setIsLoading] = useState(true);
    const [didError, setDidError] = useState(false);
    const [data, setData] = useState(null);

    useEffect(() => {
      async function fetchUrl(url) {
        try {
          let response = await fetch(url);
          let responseData = await response.json()
          setData(responseData);
        } catch(e) {
          setDidError(true);
        } finally {
          setIsLoading(false);
        } 
      } 
      fetchUrl(url);
    }, []);

  return {
    isLoading,
    data,
    didError
  };
};


