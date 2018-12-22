import React, { Component } from 'react';
import enhancedSidebar from '../HOCs/enhancedSidebar';
import { NavLink } from 'react-router-dom';

import { Icon } from 'antd';
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
  peek: [{ delay: 500, from: { x: -100 }, to: { x: 0 }, config: fast }],
  // single items,
  open: { to: { x: 0 }, config: config.default },
  // or async functions with side-effects
  close: async call => {
    await delay(400);
    await call({ to: { x: -100 }, config: config.gentle });
  }
});

// // Creates a keyframed trail
// const Content = Keyframes.Trail({
//   peek: [
//     { delay: 600, from: { x: -100, opacity: 0 }, to: { x: 0, opacity: 1 } }
//   ],
//   open: { delay: 100, to: { x: 0, opacity: 1 } },
//   close: { to: { x: -100, opacity: 0 } }
// });

class Sidebar extends Component {
  state = {
    open: undefined,
    activeItem: 'Home'
  };

  toggle = () => {
    const { open } = this.state;

    if (open === undefined) {
      this.setState(state => ({ open: false }));
    } else {
      this.setState(state => ({ open: !state.open }));
    }
  };

  render() {
    // const { dispatch, activeItem, dashItems } = this.props;
    const { navOptions } = this.props;
    const { activeItem } = this.state;

    const { open } = this.state;
    const state = open === undefined ? 'peek' : open ? 'open' : 'close';
    const icon = open ? 'fold' : 'unfold';

    return (
      <div className="sidebar-container">
        <Icon type={`menu-${icon}`} className="toggle" onClick={this.toggle} />
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
