// TODO: learn & add jsDOC comments
export const handleErrorPromptResetOnModalClose = (fetcher, event, onClose) => {
  if (fetcher.data?.errors) {
    fetcher.load(`/event/${event.id}`);
  }
  onClose();
};
