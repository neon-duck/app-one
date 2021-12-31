import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

function Groups() {
  let navigate = useNavigate();
  
  useEffect(() => {
    if (!localStorage.getItem("isLoggedIn")) navigate("/login");
  }, []);

  return (
    <div>
      <Header /><br />
      <h1>Your Groups:</h1>
    </div>
  );
}

export default Groups;