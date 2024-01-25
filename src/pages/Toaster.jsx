import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { log } from "../util/log";

export const Toaster = ({ editIsOpen, fetcher }) => {
  const toast = useToast();
  const id = "edit-toast";
  useEffect(() => {
    if (
      fetcher.data?.success &&
      fetcher.data?.fromMethod === "patch" &&
      !toast.isActive(id)
    ) {
      // console.log("EDIT OPEN:", editIsOpen);
      log.value("Method:", fetcher.formMethod);
      toast({
        id,
        title: "Editing was successful",
        description: `Event was modified.`,
        duration: 1000,
        position: "top",
        status: "success",
        isClosable: true,
      });
    }
  }, [fetcher.data]);
  return null;
};
