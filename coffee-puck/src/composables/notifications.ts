export const stopBodyOverflow = () => {
  document && document.body.classList.add(...["hide-overflow"]);
};

export const allowBodyOverflow = () => {
  document && document.body.classList.remove(...["hide-overflow"]);
};
