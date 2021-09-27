import { snakeCase } from "snake-case";
import { camelCase } from "camel-case";
import { noop } from "./noop";

const defaultListeners = {
  stateChange: noop,
};

export const initReceivers = (userListeners, filterOrigin) => {
  const listeners = {
    ...defaultListeners,
    ...userListeners,
  };

  const ALLOWED_HOSTS = ["flourish-api.com", "flo.uri.sh"];

  return (event) => {
    try {
      const { data } = event;

      if (!data || !data.type || !data.payload) return;

      const type = camelCase(data.type.toLowerCase());
      const { hostname } = new URL(event.origin);
      if (
        listeners[type] &&
        listeners[type] instanceof Function &&
        (filterOrigin ? ALLOWED_HOSTS.includes(hostname) : true)
      )
        listeners[type](data.payload);
    } catch (e) {
      console.error(`Event error`, e, event);
    }
  };
};
