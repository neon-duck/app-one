import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateAccount from "./CreateAccount";
import Home from "./Home";
import Login from "./Login";
import Main from "./Main";
import Groups from "./Groups";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createaccount" element={<CreateAccount />} />
        <Route path="/main" element={<Main />} />
        <Route path="/groups" element={<Groups />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;