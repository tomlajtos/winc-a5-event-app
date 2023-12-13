import { useState, useEffect } from "react";

export const useData = (url) => {
  const baseUrl = "http://localhost:3003";
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${baseUrl}${url}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((json) => setData(json));
  }, []);

  return data;
};
