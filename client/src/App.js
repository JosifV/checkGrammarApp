import React, { Component } from "react";
import Login from "./components/Login";
import Query from "./components/Query";

class App extends Component {
  // u stateu ima samo jedna varijabla koju cemo po potrebi menjati i renderovati kao root komponentu
  state = {
    componentToRender: <div />
  };
  // kad god komponenta treba da se ucita...
  componentWillMount() {
    // pronadji login token u kolacicima
    const findTokenHandler = name => {
      const match = document.cookie.match(
        new RegExp("(^| )" + name + "=([^;]+)")
      );
      if (match) {
        // ako ima tokena vrati ga
        return match[2];
      } else {
        console.log("--something went wrong COOKIE---");
        // ako nema tokena vrati false
        return false;
      }
    };
    // i zatim ga dodeli varijabli
    const tokenCookie = findTokenHandler("token");
    // ako postoji token u kolacicima izmeni root komponentu u Query - jer to znaci da je korisnik ulogovan
    if (tokenCookie) {
      this.setState({
        componentToRender: <Query />
      });
    }
    // ako nema tokena u kolacicima znaci da niko nije ulogovan i zato izmeni root komponentu u Login
    else {
      this.setState({
        componentToRender: <Login />
      });
    }
  }
  render() {
    // i na kraju samo renderuj root komponentu, koju god vrednost ona imala
    return <div>{this.state.componentToRender}</div>;
  }
}
export default App;
