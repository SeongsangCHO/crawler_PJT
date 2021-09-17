import React, { useState } from "react";

const useModal = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const modalOpen = () => {
    setIsOpen(true);
    document.body.classList.add("scorll-hidden");
  };
  const modalClose = () => {
    document.body.classList.remove("scorll-hidden");
    setIsOpen(false);
  };
  return {
    modalOpen,
    modalClose,
    isOpen,
  };
};

export default useModal;
