import React, { useState } from "react";

const useModal = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const modalOpen = () => {
    setIsOpen(true);
  };
  const modalClose = () => {
    setIsOpen(false);
  };
  return {
    modalOpen,
    modalClose,
    isOpen,
  };
};

export default useModal;
