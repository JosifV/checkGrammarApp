import React, { Component } from "react";
import Login from "./components/Login";
import Query from "./components/Query";

class App extends Component {
  // only one variable in state, and this is the variable we will reasign and render
  state = {
    componentToRender: <div />
  };
  // when this component will mount...
  componentWillMount() {
    // find login token inside cookies
    const findTokenHandler = name => {
      const match = document.cookie.match(
        new RegExp("(^| )" + name + "=([^;]+)")
      );
      if (match) {
        // if token exist return it
        return match[2];
      } else {
        console.log("--something went wrong COOKIE---");
        // if he does not exist return false
        return false;
      }
    };
    // and asign returned value to this variable
    const tokenCookie = findTokenHandler("token");
    // if token exist inside cookies reasign componentToRender value with Query component - beause user is loged in
    if (tokenCookie) {
      this.setState({
        componentToRender: <Query />
      });
    }
    // if token does not exist in cookies reasign componentToRender value with Login component - beause user is not loged in
    else {
      this.setState({
        componentToRender: <Login />
      });
    }
  }
  render() {
    // and just render this variable whatever the value it have
    return <div>{this.state.componentToRender}</div>;
  }
}
export default App;
