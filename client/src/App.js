import React, { Component } from "react";
import Login from "./components/Login";
import Query from "./components/Query";

class App extends Component {
  state = {
    componentToRender: <div />
  };
  componentWillMount() {
    const findTokenHandler = name => {
      const match = document.cookie.match(
        new RegExp("(^| )" + name + "=([^;]+)")
      );
      if (match) {
        return match[2];
      } else {
        console.log("--something went wrong COOKIE---");
        return false;
      }
    };
    const tokenCookie = findTokenHandler("token");
    if (tokenCookie) {
      this.setState({
        componentToRender: <Query />
      });
    } else {
      this.setState({
        componentToRender: <Login />
      });
    }
  }
  render() {
    return <div>{this.state.componentToRender}</div>;
  }
}
export default App;
