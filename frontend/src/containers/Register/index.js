// import React, { useState, useEffect } from 'react';
// import FormEmployee from '../../components/FormEmployee';
// import FormDependent from '../../components/FormDependent';
// import ToggleRegister from '../../components/ToggleRegister';
// import './index.css';

// function Register() {


//   return (
//     <div className="register-content">
//       <ToggleRegister></ToggleRegister>
//       <FormEmployee></FormEmployee>''
//       <FormDependent></FormDependent>
//     </div>
//   );
// }

// export default Register;


import React, { useState, useEffect } from 'react';
import FormEmployee from '../../components/FormEmployee';
import FormDependent from '../../components/FormDependent';
import ToggleRegister from '../../components/ToggleRegister';
import './index.css';
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/styles";

class ProfileTabs extends React.PureComponent {
  state = { activeIndex: 0 };

  handleChange = (_, activeIndex) => this.setState({ activeIndex });
  render() {
    const { activeIndex } = this.state;
    return (
      <div
        style={{
          display: "flex"
        }}
      >
        <VerticalTabs value={activeIndex} onChange={this.handleChange}>
          <MyTab label="item one" />
          <MyTab label="item two" />
        </VerticalTabs>

        {activeIndex === 0 && <TabContainer><FormEmployee></FormEmployee></TabContainer>}
        {activeIndex === 1 && <TabContainer><FormDependent></FormDependent></TabContainer>}
      </div>
    );
  }
}

const VerticalTabs = withStyles(theme => ({
  flexContainer: {
    flexDirection: "column"
  },
  indicator: {
    display: "none"
  }
}))(Tabs);

const MyTab = withStyles(theme => ({
  root: {
    backgroundColor: "#ccc"
  },
  wrapper: {
    backgroundColor: "#ddd"
  },
  selected: {
    color: "tomato",
    borderBottom: "2px solid tomato"
  }
}))(Tab);

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 24 }}>
      {props.children}
    </Typography>
  );
}

export default ProfileTabs;
