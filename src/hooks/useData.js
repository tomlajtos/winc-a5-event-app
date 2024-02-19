import { useState, useEffect } from "react";
import { getData } from "../io/fetch";

export const useData = (url) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    getData(url, setData);
  }, []);

  return data;
};
