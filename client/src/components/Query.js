import React, { Component } from "react";
import Footer from "./Footer";
import "./style/Query.scss";
import axios from "axios";
import { Spinner } from "reactstrap";

import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class Query extends Component {
  state = {
    checkText: "Check sentence grammar",
    checkStatus: "",
    queriesHistory: [],
    modal: false,
    backdrop: true
  };
  toggle = () => {
    const toggleHelper = !this.state.modal;
    this.setState({
      modal: toggleHelper
    });
  };
  searchItemHandler = event => {
    this.setState({
      checkText: event.target.value
    });
  };
  postQueryHandler = () => {
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
    axios
      .post("/query/" + this.state.checkText + "/" + tokenCookie)
      .then(resp => {
        console.log(resp);
      })
      .catch(err => {
        console.log(err);
      });
  };
  getQueryHistoryHandler = () => {
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
    axios
      .get("/querylist/" + tokenCookie)
      .then(resp => {
        console.log(resp);
        this.setState({
          queriesHistory: resp.data.queries
        });
        this.toggle();
      })
      .catch(err => {
        console.log(err);
      });
  };
  signOutHandler = () => {
    document.cookie = "token=; path=/";
    window.location.reload();
  };
  errorTrueHandler = () => {
    let root = document.documentElement;
    root.style.setProperty("--statusBackground", "#ff633c");
  };
  errorFalseHandler = () => {
    let root = document.documentElement;
    root.style.setProperty("--statusBackground", "#3ca7f8");
  };

  apiSearchHandler = () => {
    this.setState({
      checkStatus: <Spinner type="grow" color="light" />
    });
    if (this.state.checkText === "") {
      this.setState({
        checkStatus: "Please type some text"
      });
      this.errorTrueHandler();
      return;
    } else {
      axios
        .post(
          "https://languagetool.org/api/v2/check?text=" +
            this.state.checkText +
            "&language=en-US"
        )
        .then(resp => {
          console.log(resp);
          this.errorTrueHandler();
          this.setState({
            checkStatus: resp.data.matches[0].shortMessage
          });
        })
        .catch(err => {
          console.log("Error is ::: " + err);
          if (err == "TypeError: resp.data.matches[0] is undefined") {
            this.errorFalseHandler();
            this.setState({
              checkStatus: "All fine"
            });
          }
        });
      this.postQueryHandler();
    }
  };
  render() {
    return (
      <div className="divMain">
        <div className="buttonGroup">
          <button
            className="buttonCheckQuery"
            onClick={() => {
              this.getQueryHistoryHandler();
            }}
          >
            History
          </button>
          <button className="buttonSignOut" onClick={this.signOutHandler}>
            SignOut
          </button>
        </div>
        <div className="divSearch">
          <textarea
            className="textArea"
            maxLength="60"
            defaultValue={this.state.checkText}
            onChange={event => {
              this.searchItemHandler(event);
            }}
          />
          <button className="buttonSearch" onClick={this.apiSearchHandler}>
            Search
          </button>
          <h5 className="h5Status">{this.state.checkStatus}</h5>
        </div>
        <Footer />

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
          backdrop={this.state.backdrop}
        >
          <ModalHeader toggle={this.toggle}>
            {this.state.queriesHistory.length
              ? "You checked these:"
              : "None yet"}
          </ModalHeader>
          <ModalBody>
            <div className="divHistoryCheck">
              {this.state.queriesHistory.map((x, index) => {
                return (
                  <p key={index}>
                    {index + 1}
                    {" - "}
                    {x}
                  </p>
                );
              })}
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="buttonSignOut" onClick={this.toggle}>
              Cancel
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default Query;
