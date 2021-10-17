import React, { Component } from "react";

import Auxz from "../../../hoc/Auxz/Auxz";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  // componentDidUpdate() {
  //   console.log("[OrderSummary] DidUpdate");
  // }

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(
      (igKey) => {
        return (
          <li key={igKey}>
            <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
            {this.props.ingredients[igKey]}
          </li>
        );
      }
    );

    return (
      <Auxz>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>
          Total Price: <strong>{this.props.totalPrice.toFixed(2)}</strong> Rs.
        </p>
        <p>Continue to checkout..</p>
        <Button btnType="Danger" clicked={this.props.purchaseCancelled}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={this.props.purchaseContinued}>
          CONTINUE
        </Button>
      </Auxz>
    );
  }
}

export default OrderSummary;
