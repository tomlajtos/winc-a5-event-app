// React and React Router imports
import { useState } from "react";

export const useMyAsyncError = () => {
  const [errorState, setErrorState] = useState();

  return (error) => {
    setErrorState(() => {
      throw error;
    });
  };
};
