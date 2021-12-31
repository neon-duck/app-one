import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

function Main() {
  let navigate = useNavigate();
  
  useEffect(() => {
    if (!localStorage.getItem("isLoggedIn")) navigate("/login");
  }, []);

  return (
    <div>
      <Header />
      {/*Projects in boxes*/}
      {/*Already joined groups on the side like the projects in GitHub*/}
    </div>
  );
}

export default Main;