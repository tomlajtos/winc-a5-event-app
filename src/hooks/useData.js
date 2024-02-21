import { useState, useEffect } from "react";
import { getData } from "../io/fetch";
import { useMyAsyncError } from "./useMyAsyncError";

export const useData = (url) => {
  const throwAsyncError = useMyAsyncError();
  const [data, setData] = useState([]);
  useEffect(() => {
    getData(url, setData, throwAsyncError);
  }, []);
  return data;
};
