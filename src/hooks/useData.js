// React and React Router imports
import { useState, useEffect } from "react";
// Context and custom hook imports
import { useMyAsyncError } from "./useMyAsyncError";
// Util and I/O imports
import { getData } from "../io/fetch";

export const useData = (url) => {
  const throwAsyncError = useMyAsyncError();
  const [data, setData] = useState(null);
  useEffect(() => {
    getData(url, setData, throwAsyncError);
  }, []);
  return data;
};
