import React, { Component } from "react";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../../store/actions/index';
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from './Auth.module.css'
import { updateObject, checkValidity } from '../../shared/utility';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email ID",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
      },
    },
    isSignup: true,
    formIsValid: false
  };

  componentDidMount(){
    if(!this.props.buildingBurger && this.props.authRedirectPath !== '/'){
        this.props.onSetAuthRedirect();
    }
  }

  inputChangedHandler = (event, inputId) =>{

    const updatedControls = updateObject(this.state.controls, {
      [inputId]: updateObject(this.state.controls[inputId], {
        value: event.target.value,
        valid: checkValidity(event.target.value, this.state.controls[inputId].validation)
      })
    });

    // const updatedFormEle = { 
    //   ...updatedControls[inputId] 
    // };

    // updatedFormEle.value = event.target.value;
    // updatedFormEle.valid = this.checkValidity(updatedFormEle.value, updatedFormEle.validation);

    // updatedControls[inputId] = updatedFormEle;

    let formValidity = true;
    for(let input in updatedControls){
      formValidity = updatedControls[input].valid && formValidity;
    }

    this.setState({ controls: updatedControls, formIsValid: formValidity });
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
        this.state.controls.email.value, 
        this.state.controls.password.value,
        this.state.isSignup);
  }

  switchAuthModeHandler = () => {
      this.setState(preState => {
          return {
              isSignup: !preState.isSignup
          }
      });
  }

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    let form = (
        <form onSubmit={this.submitHandler}>
          {formElementsArray.map((formElement) => (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              invalid={!formElement.config.valid}
              shouldValidate={formElement.config.validation}
              changed={(event) => this.inputChangedHandler(event, formElement.id)}
            />
          ))}
          <Button btnType="Success" disabled={!this.state.formIsValid}>
            Submit
          </Button>
        </form>
      );

    if(this.props.loading){
        form = <Spinner />;
    }  

    let errorMsg = null;
    if(this.props.error){
        errorMsg = (
            <p style={{ color: "red" }}>Error: {this.props.error.message}</p>
        )
    }

    let authRedirect = null;
    if(this.props.isAuth){
        authRedirect = <Redirect to={this.props.authRedirectPath} />
    }

    return (
      <div className={classes.Auth}>
          {authRedirect}
          {errorMsg}
          {form}
          <Button 
          btnType="Danger"
          clicked={this.switchAuthModeHandler}
          >Go to {this.state.isSignup ? 'Sign In' : 'Sign Up'}</Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
     return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirect: () => dispatch(actions.setAuthRedirectPath('/'))
     }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
