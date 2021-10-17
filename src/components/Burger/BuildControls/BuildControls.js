import React from "react";
import BuildControl from "./BuildControl/BuildControl";

import classes from "./BuildControls.module.css";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    <p>
      Total Price: <strong>{props.totalPrice.toFixed(2)}</strong> Rs
    </p>
    {controls.map((ctrl) => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        more={() => props.ingredientAdded(ctrl.type)}
        less={() => props.ingredientDeduct(ctrl.type)}
        disabled={props.disabled[ctrl.type]}
      />
    ))}
    <button
      className={classes.OrderButton}
      disabled={!props.purchasable}
      onClick={props.ordered}
    >
      { props.isAuth ? 'ORDER NOW' : 'SIGN IN TO CONTINUE' }
    </button>
  </div>
);

export default buildControls;
