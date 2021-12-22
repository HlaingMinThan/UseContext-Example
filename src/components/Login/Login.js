import React, { useState, useEffect, useReducer, useContext } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import { AuthContext } from "../../contexts/AuthContext";

let emailReducer = (emailState, action) => {
  if (action.type === "USER_INPUT") {
    return {
      value: action.payload.value,
      isvalid: action.payload.value.includes("@"),
    };
  }
  if (action.type === "BLUR_INPUT") {
    return {
      ...emailState,
      isvalid: emailState.value.includes("@"),
    };
  }
  return emailState;
};
let passwordReducer = (passwordState, action) => {
  if (action.type === "USER_INPUT") {
    return {
      value: action.payload.value,
      isvalid: action.payload.value.trim().length > 6,
    };
  }
  if (action.type === "BLUR_INPUT") {
    return {
      ...passwordState,
      isvalid: passwordState.value.trim().length > 6,
    };
  }
};
const Login = () => {
  let context = useContext(AuthContext);
  const [formIsValid, setFormIsValid] = useState(false);
  const [emailState, dispatchEmailReducer] = useReducer(emailReducer, {
    value: "",
    isvalid: "",
  });
  const [passwordState, dispatchPasswordReducer] = useReducer(passwordReducer, {
    value: "",
    isvalid: "",
  });
  useEffect(() => {
    let timeout = setTimeout(() => {
      setFormIsValid(emailState.isvalid && passwordState.isvalid);
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [emailState.isvalid, passwordState.isvalid]);
  const emailChangeHandler = (event) => {
    dispatchEmailReducer({
      type: "USER_INPUT",
      payload: {
        value: event.target.value,
      },
    });
  };

  const passwordChangeHandler = (event) => {
    dispatchPasswordReducer({
      type: "USER_INPUT",
      payload: {
        value: event.target.value,
      },
    });
  };

  const validateEmailHandler = () => {
    dispatchEmailReducer({
      type: "BLUR_INPUT",
    });
  };

  const validatePasswordHandler = () => {
    dispatchPasswordReducer({
      type: "BLUR_INPUT",
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    context.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isvalid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isvalid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            autoComplete="false"
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
