import React, { Component } from 'react'

import SidebarContainer from '../containers/SidebarContainer';
import Menu from './Menu';

class Sidebar extends Component {
  render() {
    return (
      <SidebarContainer>
        <h2>Menu</h2>
        <Menu />
      </SidebarContainer>
    )
  }
}

export default Sidebar;