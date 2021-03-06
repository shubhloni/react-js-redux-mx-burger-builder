import React, { Component } from "react";
import Auxz from "../../../hoc/Auxz/Auxz";
import BackDrop from "../Backdrop/Backdrop";

import classes from "./Modal.module.css";

class Modal extends Component {

  shouldComponentUpdate(nextProps, nextState){
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  }

  // componentDidUpdate(){
  //   console.log('[Modal] DidUpdate');
  // }

  render() {
    return (
      <Auxz>
        <BackDrop show={this.props.show} backDropClicked={this.props.modalClosed} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0",
          }}
        >
          {this.props.children}
        </div>
      </Auxz>
    );
  }
}

export default Modal;
