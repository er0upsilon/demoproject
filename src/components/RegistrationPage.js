import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../css/Registration.css";

function RegistrationPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const registerHandler = (e) => {
    e.preventDefault();
    console.log(name, email, password);
    fetch("/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: name,
        email: email,
        password: password,
      }),
    }).then((res) => {
      res.json().then((r) => {
        if (res.status === 201) {
          localStorage.setItem("userToken", r["access_token"]);
          console.log(r["access_token"]);
          history.push("/");
        } else {
          alert(r["errmsg"]);
        }
      });
    });
  };

  return (
    <div class="wrapper fadeInDown">
      <div id="formContent">
        <div class="fadeIn first">
          <h1>Sign Up </h1>
        </div>

        <form onSubmit={registerHandler}>
          <input
            type="text"
            id="username"
            class="registration__input"
            name="username"
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          <input
            type="text"
            id="email"
            class="registration__input"
            name="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            type="password"
            id="password"
            class="registration__input"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <input type="submit" class="fadeIn fourth" value="submit"></input>
        </form>
      </div>
    </div>
  );
}

export default RegistrationPage;
