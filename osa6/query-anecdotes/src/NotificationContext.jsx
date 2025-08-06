import PropTypes from "prop-types";
import { createContext, useReducer, useContext } from "react";
import { useEffect } from "react";

const initialState = "";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "MSG":
      return action.message;
    case "RESET_MSG":
      return initialState;
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notif, notifdispatch] = useReducer(notificationReducer, initialState);

  useEffect(() => {
    if (notif !== "") {
      const timeout = setTimeout(() => {
        notifdispatch({ type: "RESET_MSG" });
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [notif]);

  return (
    <NotificationContext.Provider value={[notif, notifdispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotificationValue = () => {
  const messageAndDispatch = useContext(NotificationContext);
  return messageAndDispatch[0];
};

export const useNotificationDispatch = () => {
  const messageAndDispatch = useContext(NotificationContext);
  return messageAndDispatch[1];
};

export default NotificationContext;
