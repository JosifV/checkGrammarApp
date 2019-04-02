import React, { Component } from "react";
import "./style/Login.scss";
import axios from "axios";
import bubbleImg from "../assets/bubble.png";
import Sky from "react-sky";

class Login extends Component {
  state = {
    statusMessageIn: "",
    userName: "",
    password: ""
  };
  // write username
  userNameHandler = event => {
    this.setState({
      userName: event.target.value
    });
  };
  // write password
  passwordHandler = event => {
    this.setState({
      password: event.target.value
    });
  };
  // if login / signup went good turn the form background to blue
  successHandler = () => {
    let root = document.documentElement;
    root.style.setProperty(
      "--logInBackground",
      "linear-gradient(to bottom left, #349ceb, #3ca7f8)"
    );
    root.style.setProperty("--logInBackgroundHover", "#5799bd");
  };
  // if there were some problem turn the form background to red
  errorHandler = () => {
    let root = document.documentElement;
    root.style.setProperty(
      "--logInBackground",
      "linear-gradient(to bottom left, #ff552d, #ff633c)"
    );
    root.style.setProperty("--logInBackgroundHover", "#ff552d");
  };
  // login, check if entry is valid, setting the cookie, query to database, ect
  signInHandler = () => {
    if (this.state.password === "" || this.state.userName === "") {
      this.setState({
        statusMessageIn: "Please fill in all fields"
      });
    } else {
      axios
        .post("/login/" + this.state.userName + "/" + this.state.password)
        .then(resp => {
          if (resp.data === "Wrong password") {
            this.setState({
              statusMessageIn: resp.data
            });
            document.cookie = "token=; path=/";
            this.errorHandler();
            return;
          }
          if (resp.data[0] === "SignIn") {
            document.cookie = "token=" + resp.data[1] + "; path=/";
            this.setState({
              statusMessageIn: "Sign in successful"
            });
            this.successHandler();
            setTimeout(window.location.reload(), 1500);
          }
          if (resp.data[0] === "SignUp") {
            document.cookie = "token=" + resp.data[1] + "; path=/";
            this.setState({
              statusMessageIn: "Sign up successful"
            });
            this.successHandler();
            setTimeout(window.location.reload(), 1500);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
  render() {
    return (
      <div className="divRoot">
        <Sky
          images={{
            0: bubbleImg
          }}
          how={30}
          time={20}
          size={"100px"}
        />
        <div className="divSeparator" />
        <div className="divLoginMain">
          <div className="divLogIn">
            <h3 className="h3Header">Check grammar online app</h3>
            <h5 className="h5Error">Sign In or Sign Up</h5>
            <label htmlFor="usrnm">Username:</label>
            <input
              onChange={event => {
                this.userNameHandler(event);
              }}
              type="text"
              id="usrnm"
            />
            <label htmlFor="pwd">Password:</label>
            <input
              onChange={event => {
                this.passwordHandler(event);
              }}
              type="password"
              id="pwd"
              placeholder=""
            />
            <h5 className="h5Error">{this.state.statusMessageIn}</h5>
            <button className="buttonLogIn" onClick={this.signInHandler}>
              Proceed
            </button>
          </div>
        </div>
        <div className="divSeparator" />
      </div>
    );
  }
}

export default Login;
