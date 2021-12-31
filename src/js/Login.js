import { signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

function Login() {
  let navigate = useNavigate();
  const [error, setError] = useState();

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn")) navigate("/main");
  }, [])

  function login(e) {
    e.preventDefault();
    let email = e.target.email.value;
    let password = e.target.password.value;
    signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      localStorage.setItem("isLoggedIn", true);
      navigate("/main");
    })
    .catch((error) => {
      if (error.message == "Firebase: Error (auth/invalid-email).") {
        setError("Error: Invalid email address.");
      } else if (error.message == "Firebase: Error (auth/user-not-found).") {
        setError("Error: User not found.");
      } else if (error.message == "Firebase: Error (auth/wrong-password).") {
        setError("Error: Incorrect password.");
      } else {
        setError(error.message);
        console.log(error.message);
        console.log(error.code);
      }
    })
  }

  return (
    <div>
      <div className="head">
        <h2 style={{color: "#8356E3", marginRight: "10%"}}><a href="/">Home</a></h2>
        <h1 style={{color: "#8356E3"}}>Log</h1><h1 style={{color: "#5682E3"}}h1>In</h1>
        <h2 style={{color: "#5682E3", marginLeft: "10%"}}><a href="login">Login</a></h2>
      </div>
      <hr /><br />
      <form onSubmit={login}>
        <p>Email:</p>
        <input type="email" name="email" /><br /><br />

        <p>Password:</p>
        <input type="password" name="password" />
        
        <div>
          {error ? <p className={"error"}>{error}</p> : <div><br /><br /></div>}
        </div>

        <input type="submit" value="Login" className="special" />
      </form>
    </div>
  );
}

export default Login;