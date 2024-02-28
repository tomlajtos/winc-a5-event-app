import { useRef } from "react";
import {
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Stack,
} from "@chakra-ui/react";
import { useEditEvent } from "../../context/EditEventContext";
import { EventForm } from "../../components/forms/EventForm";
import { SaveEditButton } from "../../components/forms/buttons/SaveEditButton";
import { CancelEditButton } from "../../components/forms/buttons/CancelEditButton";
import { toaster } from "../../util/toaster";
import { handleResetOnModalClose } from "../../util/uiUtils";
import { generateDateTimeStr } from "../../util/datetime";
import { Logger } from "../../util/Logger";

export const EditEventModal = () => {
  const { event, fetcher, editIsOpen, editOnClose, toast } = useEditEvent();
  const errors = fetcher.data?.error;
  const toastIdRef = useRef(""); // ref to make toasts closable

  const defaultFormValues = {
    title: event.title,
    createdBy: event.createdBy,
    startTime: generateDateTimeStr(event.startTime),
    endTime: generateDateTimeStr(event.endTime),
    location: event.location,
    description: event.description,
    categoryIds: event.categoryIds.map((id) => id.toString()),
    image: event.image,
  };

  if (editIsOpen) {
    // toast
    toaster(toast, fetcher, { state: "~EDIT~" }, toastIdRef);
    // setTimeout makes sure that there is no collision of component renders caused by the active toast and editOnClose function
    // without this there is a warning of state update while rendering another component
    // There should be a setTimout implemented in the toaster function as well
    if (fetcher.data?.success && fetcher.state === "loading") {
      setTimeout(() => {
        editOnClose();
        return null;
      }, 0);
    }
  }

  return (
    <Logger name="EditEventModal" level={5}>
      <Modal
        isOpen={editIsOpen}
        onClose={() => handleResetOnModalClose(fetcher, event, editOnClose)}
        closeOnEsc
        size={["full", null, "lg"]}
      >
        <ModalOverlay
          bg="blackAlpha.500"
          backdropFilter="auto"
          backdropBlur="5px"
        >
          <ModalContent backgroundColor="whiteAlpha.900">
            <ModalHeader fontSize="2xl" background="transparent">
              Edit event
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody background="transparent">
              <Flex
                width="full"
                direction="column"
                alignItems="stretch"
                backgroundColor="transparent"
              >
                <EventForm
                  as={fetcher.Form}
                  id="edit-event-form"
                  method="PATCH"
                  defaultValues={defaultFormValues}
                  errors={errors}
                />
                {/* edit-form button group */}
                <Stack
                  direction="row"
                  spacing={2}
                  py={4}
                  px={0}
                  justifyContent="end"
                  width="full"
                >
                  <SaveEditButton errors={errors} />
                  <CancelEditButton
                    onClick={() =>
                      handleResetOnModalClose(fetcher, event, editOnClose)
                    }
                  />
                </Stack>
              </Flex>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </Logger>
  );
};
