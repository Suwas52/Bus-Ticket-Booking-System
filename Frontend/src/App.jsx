import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import LandingPage from "./pages/User/LandingPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <LandingPage />
    </>
  );
}

export default App;
