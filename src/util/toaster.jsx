import { SuccessToast } from "../components/ui/toast/SuccessToast";
import { ErrorToast } from "../components/ui/toast/ErrorToast";
// import { log } from "../util/log";

export const toaster = (toast, fetcher, navigation, toastIdRef) => {
  const fetcherState = fetcher.state;
  const formMethod = fetcher.formMethod;
  const data = fetcher.data;
  const requestMethod = fetcher.data?.requestMethod;
  const success = fetcher.data?.success;
  const error = fetcher.data?.error;
  const errorType = data?.errorType;
  const errorMessage = data?.message;
  const errorComment = data?.errorComment;
  const navState = navigation ? navigation.state : "";

  const handleToastClose = () => {
    toast.close(toastIdRef.current);
  };

  const defaultToastProps = {
    duration: 3000,
    position: "top",
  };

  const errorToastProps = {
    position: "top",
    duration: 4000,
    render: () => (
      <ErrorToast
        title={data.name}
        type={errorType}
        message={errorMessage}
        comment={errorComment}
        handleClose={handleToastClose}
      />
    ),
  };

  // setTimeout makes sure that there is no collision of component renders caused by the active toast and editOnClose function
  // without this there is a warning of state update while rendering another component
  // There should be a setTimout implemented in the coresponding modal(s) as well
  // const toastThatShit = useCallback(() => {}, []);
  setTimeout(() => {
    /* match condition of fetcher state: idle
     * applies to:
     *  - add new event --error */
    if (fetcherState === "idle") {
      const addFailId = "add-fail-toast"; // checking for active id prevents double toast

      if (
        navState !== "loading" &&
        data &&
        requestMethod === "POST" &&
        !toast.isActive(addFailId)
      ) {
        // set to ref.current to make toast closable
        toastIdRef.current = toast({
          id: addFailId,
          ...errorToastProps,
        });
        return;
      }
    }

    /* match condition of fetcher state: loading
     * applies to:
     *  - add new event --success
     *  - edit event --success
     *  - edit event --error
     *  - delete event --success
     *  - delete event --error */
    if (fetcherState === "loading") {
      // checking for active id prevents double toast firing
      const addOkId = "add-ok-toast";
      const editOkId = "edit-ok-toast";
      const editFailId = "edit-fail-toast";
      const deleteOkId = "delete-ok-toast";
      const deleteFailId = "delete-fail-toast";

      // ADD NEW EVENT TOAST
      if (
        navState === "loading" &&
        formMethod === "POST" &&
        !toast.isActive(addOkId)
      ) {
        // set to ref.current to make toast closable
        toastIdRef.current = toast({
          id: addOkId,
          render: () => (
            <SuccessToast
              title="New event was added successfuly"
              message="Have fun!"
              handleClose={handleToastClose}
            />
          ),
          ...defaultToastProps,
        });
        return;
      }

      // EDIT EVENT TOASTS
      if (data && formMethod === "PATCH") {
        if (success && !toast.isActive(editOkId)) {
          // set to ref.current to make toast closable
          toastIdRef.current = toast({
            id: editOkId,
            render: () => (
              <SuccessToast
                title="Successful Action: edit event"
                description="Have fun!"
                handleClose={handleToastClose}
              />
            ),
            ...defaultToastProps,
          });
          return;
        }

        if (error && !toast.isActive(editFailId)) {
          // set to ref.current to make toast closable
          toastIdRef.current = toast({
            id: editFailId,
            ...errorToastProps,
          });
          return;
        }
      }

      // DELETE EVENT TOASTS
      if (formMethod === "DELETE") {
        if (!error && !toast.isActive(deleteOkId)) {
          // set to ref.current to make toast closable
          toastIdRef.current = toast({
            id: deleteOkId,
            render: () => (
              <SuccessToast
                title="Successful Action: delete event"
                handleClose={handleToastClose}
              />
            ),
            ...defaultToastProps,
          });
          return;
        }

        if (error && !toast.isActive(deleteFailId)) {
          // set to ref.current to make toast closable
          toastIdRef.current = toast({
            id: deleteFailId,
            ...errorToastProps,
          });
          return;
        }
      }
    }
  }, 0);

  return;
};
