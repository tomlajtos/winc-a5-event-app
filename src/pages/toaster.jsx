import { useRef } from "react";
import { SuccessToast } from "../components/ui/toast/SuccessToast";
import { ErrorToast } from "../components/ui/toast/ErrorToast";
// import { log } from "../util/log";

export const toaster = (toast, fetcher, navigation) => {
  const state = fetcher.state;
  const formMethod = fetcher.formMethod;
  const data = fetcher.data;
  const requestMethod = fetcher.data?.requestMethod;
  const success = fetcher.data?.success;
  const error = fetcher.data?.error;
  const errorType = data?.errorType;
  const errorMessage = data?.message;
  const errorComment = data?.errorComment;
  const navState = navigation ? navigation.state : "";

  // toast
  const toastIdRef = useRef(""); // ref to make toasts closable

  const handleToastClose = () => {
    toast.close(toastIdRef.current);
  };

  const defaultToastProps = {
    duration: 4000,
    position: "top",
  };

  const errorToastProps = {
    position: "top",
    duration: 5000,
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
  setTimeout(() => {
    /* match condition of fetcher state: idle
     * applies to:
     *  - add new event --error */
    if (state === "idle") {
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
      }
    }

    /* match condition of fetcher state: loading
     * applies to:
     *  - add new event --success
     *  - edit event --success
     *  - edit event --error
     *  - delete event --success
     *  - delete event --error */
    if (state === "loading") {
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
        console.log("TOAST!");
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
          console.log("TOAST!");
        }

        if (error && !toast.isActive(editFailId)) {
          // set to ref.current to make toast closable
          toastIdRef.current = toast({
            id: editFailId,
            ...errorToastProps,
          });
        }
      }

      // DELETE EVENT TOASTS
      if (!data && formMethod === "DELETE" && !toast.isActive(deleteOkId)) {
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
        console.log("TOAST!");
      }

      if (error && formMethod === "DELETE" && !toast.isActive(deleteFailId)) {
        // set to ref.current to make toast closable
        toastIdRef.current = toast({
          id: deleteFailId,
          ...errorToastProps,
        });
        console.log("TOAST!");
      }
    }
  }, 0);
  return;
};

// REMOVED LOGS -- IN ORDER
//
// log.value("--- IN TOASTER ---", [
//   ["navigation state", navigation?.state],
//   ["fetcher state", fetcher.state],
//   ["fetcher formMethod", fetcher.formMethod],
//   ["fetcher data", fetcher.data],
//   ["fetcher data requestMethod", fetcher.data?.requestMethod],
//   ["fetcher data error:", fetcher.data?.error],
// ]);
//
// log.value("in new event toaster | idle | data | navIdle", [
//   ["navState", navState],
//   ["requestMethod:", requestMethod],
//   ["data:", data],
//   ["error:", error],
// ]);
//
// log.process("~~~~~~~ TOASTING ADD ERROR ~~~~~~~");
//
// log.value("in new event toaster | loading | navLoading ", [
//   ["navState", navState],
//   ["fetcher state", fetcher.state],
//   ["formMethod:", formMethod],
//   ["data:", data],
//   ["error:", error],
// ]);
//
// log.process("~~~~~~~ TOASTING ADD SUCCESS ~~~~~~~");
//
// log.value("DATA in edit-success toast:", data);
// log.value("error in edit-success toast:", error);
//
// log.process("~~~~~~~ TOASTING EDIT SUCCESS ~~~~~~~");
//
// log.value("ERROR in edit-error toast", error);
// log.value("data in edit-error toast:", data);
// log.value("errorType in edit-error toast:", data.errorType);
//
// log.process("~~~~~~~ TOASTING EDIT ERROR ~~~~~~~");
