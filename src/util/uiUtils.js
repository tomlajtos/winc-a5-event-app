// TODO: learn & add jsDOC comments
export const handleResetOnModalClose = (fetcher, event, onClose) => {
  if (fetcher.data?.error) {
    fetcher.load(`/event/${event.id}`);
  }
  onClose();
};
