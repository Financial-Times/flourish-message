/**
 * @file
 * Flourish Message
 * postMessage API for Flourish visualisations
 */

import onChange from "on-change";
import { initReceivers } from "./initReceivers";
export { waitForIframes } from "./waitForIframes";

export const initChildMessaging = ({ state, listeners }) => {
  if (!window.parent) {
    console.info("Flourish Message inactive");
    return;
  }

  window.addEventListener("message", initReceivers(listeners));

  const stateProxy = onChange(
    state,
    (path, value, previousValue, applyData) => {
      window.parent.postMessage({
        type: "STATE_CHANGE",
        payload: {
          path,
          value,
          previousValue,
          state,
        },
      });
    }
  );
};

export const initParentMessaging = ({ target = null, listeners = {} }) => {
  if (!target) {
    console.info("Flourish Message inactive");
    return;
  }

  target.addEventListener("message", initReceivers(listeners));
};
