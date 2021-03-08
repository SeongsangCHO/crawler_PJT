import React, { useState, useEffect } from "react";
import { NotificationManager } from "react-notifications";

const CreateNotification = (type) => {
  return (errorMsg) => {
    switch (type) {
      case "info":
        NotificationManager.info("Info message");
        break;
      case "success":
        NotificationManager.success("가입에 성공했습니다");
        break;
      case "warning":
        NotificationManager.warning(
          "Warning message",
          "Close after 3000ms",
          3000
        );
        break;
      case "error":
        NotificationManager.error(errorMsg, "", 4000, () => {});
        break;
    }
  };
};
export default CreateNotification;
