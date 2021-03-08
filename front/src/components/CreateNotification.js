import React, { useState, useEffect } from "react";
import { NotificationManager } from "react-notifications";

const CreateNotification = (type) => {
  return (msg) => {
    switch (type) {
      case "info":
        NotificationManager.info("Info message");
        break;
      case "success":
        NotificationManager.success(msg,"",2000);
        break;
      case "warning":
        NotificationManager.warning(
          "Warning message",
          "Close after 3000ms",
          2000
        );
        break;
      case "error":
        NotificationManager.error(msg, "", 2000, () => {});
        break;
    }
  };
};
export default CreateNotification;
