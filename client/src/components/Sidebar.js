import React, { Component, Fragment } from 'react';
import enhancedSidebar from '../HOCs/enhancedSidebar';
import { NavLink } from 'react-router-dom';

import { Keyframes, animated, config } from 'react-spring';
import delay from 'delay';
import 'antd/dist/antd.css';

const fast = {
  ...config.stiff,
  restSpeedThreshold: 1,
  restDisplacementThreshold: 0.01
};

// Creates a spring with predefined animation slots
const SpringSidebar = Keyframes.Spring({
  // Slots can take arrays/chains,
  peek: [{ delay: 500, from: { x: -125 }, to: { x: 0 }, config: fast }],
  // single items,
  open: { to: { x: 0 }, config: config.default },
  // or async functions with side-effects
  close: async call => {
    await delay(400);
    await call({ to: { x: -100 }, config: config.gentle });
  }
});

class Sidebar extends Component {
  state = {
    open: undefined
  };

  render() {
    const { navOptions } = this.props;
    const { open } = this.state;

    const state = open === undefined ? 'peek' : open ? 'open' : 'close';

    return (
      <div className="sidebar-container">
        <SpringSidebar native={'true'} state={state}>
          {({ x }) => (
            <animated.div
              className="navbar"
              style={{
                transform: x.interpolate(x => `translate3d(${x}%,0,0)`)
              }}
            >
              <ul className={'sidebar-list'}>
                {navOptions.map((item, i) => {
                  const { id } = item;
                  return (
                    <NavLink
                      className="sidebar-item"
                      key={id}
                      to={`/user/${id.toLowerCase()}`}
                      activeClassName="selected"
                    >
                      {id}
                    </NavLink>
                  );
                })}
              </ul>
            </animated.div>
          )}
        </SpringSidebar>
      </div>
    );
  }
}

export default enhancedSidebar(Sidebar);
