import { log } from "./log";

export const handleResetOnModalClose = (fetcher, event, onClose) => {
  if (fetcher.data?.error) {
    log.value("fetcher", fetcher);
    console.log("RELOADING FETCHER ON MODAL CLOSE");
    fetcher.load(`/event/${event.id}`);
  }
  onClose();
};
