import { snakeCase } from "snake-case";
import { camelCase } from "camel-case";
import { noop } from "./noop";

const defaultListeners = {
  stateChange: noop,
};

export const initReceivers = (userListeners) => {
  const listeners = {
    ...defaultListeners,
    ...userListeners,
  };

  return (event) => {
    const { data } = event;
    const type = camelCase(data.type.toLowerCase());
    if (listeners[type] && listeners[type] instanceof Function)
      listeners[type](data.payload);
  };
};
