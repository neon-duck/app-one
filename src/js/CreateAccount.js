import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";

function CreateAccount() {
  let navigate = useNavigate();
  const [error, setError] = useState();

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn")) navigate("/main");
  }, []);

  async function createAccount(e) {
    e.preventDefault();
    let username = e.target.username.value;
    let email = e.target.email.value;
    let password = e.target.password.value;
    if (username == "" || email == "" || password == "") {
      setError("All the input fields must be filled.");
      return;
    }
    if (password.length < 8) {
      setError("Password must have atleast 8 characters.");
      return;
    }
    // Check if the username is already taken
    const q = query(collection(db, "usernames"), where("username", "==", username));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size != 0) {
      setError("Error: Username has been taken.");
      return;
    }
    // Create the account
    createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      // Add Username
      updateProfile(auth.currentUser, { displayName: username })
      .catch((error) => {
        console.log(`Error Code: ${error.code}`);
        console.log(`Error Message: ${error.message}`);
        setError(error.message);
      })
      .then(() => {
        // Add user to users collection
        try {
          addDoc(collection(db, "usernames"), {
            username: username
          });
          localStorage.setItem("isLoggedIn", true);
          navigate("/main");
        } catch (e) {
          console.log(`Error: ${e}`);
          setError(e);
        }
      })
    })
    .catch((error) => {
      if (error.message == "Firebase: Error (auth/invalid-email).") {
        setError("Error: Invalid email address.");
      } else if (error.message == "Firebase: Error (auth/email-already-in-use).") {
        setError("Error: Email is already in use.")
      } else {
        console.log(`Error Code: ${error.code}`);
        console.log(`Error Message: ${error.message}`);
        setError(error.message);
      }
    })
  }

  return (
    <div>
      <div className="head">
        <h2 style={{color: "#8356E3", marginRight: "10%"}}><a href="/">Home</a></h2>
        <h1 style={{color: "#8356E3"}}>Create </h1><h1 style={{color: "#5682E3"}}h1>Account</h1>
        <h2 style={{color: "#5682E3", marginLeft: "10%"}}><a href="login">Login</a></h2>
      </div>
      <hr /><br />
      <form onSubmit={createAccount}>
        <p>Username:</p>
        <input type="text" name="username" /><br /><br />

        <p>Email:</p>
        <input type="email" name="email" /><br /><br />

        <p>Password:</p>
        <input type="password" name="password" />
        
        <div>
          {error ? <p className={"error"}>{error}</p> : <div><br /><br /></div>}
        </div>

        <input type="submit" value="Create Account" className="regular" />
      </form>
    </div>
  );
}

export default CreateAccount;