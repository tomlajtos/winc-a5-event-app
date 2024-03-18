// React and React Router imports
import { useState } from "react";
import { addBetterErrorProps } from "../util/error";

export const useMyAsyncError = () => {
  const [errorState, setErrorState] = useState();

  return (error) => {
    setErrorState(() => {
      throw addBetterErrorProps(error);
    });
  };
};
