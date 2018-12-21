import { Keyframes, config } from 'react-spring';
import delay from 'delay';

const fast = {
  ...config.stiff,
  restSpeedThreshold: 1,
  restDisplacementThreshold: 0.01
};

// Creates a spring with predefined animation slots
const Sidebar = Keyframes.Spring({
  peek: [
    { delay: 500, from: { x: -100 }, to: { x: 0 }, config: fast },
    { delay: 800, to: { x: -100 }, config: config.slow }
  ],

  open: { to: { x: 0 }, config: config.default },

  close: async call => {
    await delay(400);
    await call({ to: { x: -100 }, config: config.gentle });
  }
});

// Creates a keyframed trail
const Content = Keyframes.Trail({
  peek: [
    { delay: 600, from: { x: -100, opacity: 0 }, to: { x: 0, opacity: 1 } },
    { to: { x: -100, opacity: 0 } }
  ],
  open: { delay: 100, to: { x: 0, opacity: 1 } },
  close: { to: { x: -100, opacity: 0 } }
});

export const sidebarConfig = {
  fast,
  Sidebar,
  Content
};
