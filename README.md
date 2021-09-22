# Flourish Message

This sets up an interface to facilitate communicating state changes
between a Flourish template and its parent frame.

## Installation

### In your Flourish template code (index.js)

```js
import { initChildMessaging } from "@financial-times/flourish-message";

let state = {}; // Can also be imported state

/* 
  This will log payload to console when the parent sends a message in format:
    {
        type: `MESSAGE_FROM_PARENT`,
        payload: {} // Can be anything
    }
*/
const messageFromParentListener = (payload) => console.log(payload);

const listeners = {
  messageFromParent: messageFromParentListener,
};

state = initChildMessaging({ state, listeners });
```

### In your front-end (parent) code

You need to get a reference to your iframe container somehow:

```js
import { initParentMessaging } from "@financial-times/flourish-message";

// IMPORTANT:
// This assumes the iframe is already on page!!!
// You might need to do something to wait for it to load.
const iframe = document.querySelector(".flourish-embed iframe");

const stateChangeListener = ({
  path, // the state property changed
  value, // the new state property value
  previousValue, // the old state property value
  state, // the full current state object
}) => console.log(path, value, previousValue, state); // Do whatever you want here

const listeners = {
  stateChange: stateChangeListener,
};

initParentMessaging({ target: iframe, listeners });
```

Flourish Message comes bundled with a `waitForIframes` helper that returns a promise:

```js
import {
  initParentMessaging,
  waitForIframes,
} from "@financial-times/flourish-message";

waitForIframes().then((iframes) => {
  iframes.forEach((iframe, index) => {
    const stateChangeListener = ({
      path, // the state property changed
      value, // the new state property value
      previousValue, // the old state property value
      state, // the full current state object
    }) =>
      console.log(
        `State change in embed: ${index}`,
        path,
        value,
        previousValue,
        state
      ); // Do whatever you want here

    const listeners = {
      stateChange: stateChangeListener,
    };

    initParentMessaging({ target: iframe, listeners });
  });
});
```

You can also get an iframe via Flourish Live API:

```js
import { initParentMessaging } from "@financial-times/flourish-message";
import Flourish from "@flourish/live-api";

const opts = {
  // ... Flourish API options
};

const viz = new Flourish.Live(opts);

const stateChangeListener = ({
  path, // the state property changed
  value, // the new state property value
  previousValue, // the old state property value
  state, // the full current state object
}) => console.log(path, value, previousValue, state); // Do whatever you want here

const listeners = {
  stateChange: stateChangeListener,
};

initParentMessaging({ target: viz.iframe, listeners });
```
