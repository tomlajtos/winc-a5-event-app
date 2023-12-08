import { useState, useEffect } from "react";

export const useData = (url) => {
  const baseUrl = "http://localhost:3003";
  const[data, setData] = useState(null);

  useEffect(() => {
    fetch(`${baseUrl}${url}`)
      .then((response) => response.json())
      .then((json) => {
          setData(json);
      }).catch(error=>error.message);
  },[]);
  return data;
};
