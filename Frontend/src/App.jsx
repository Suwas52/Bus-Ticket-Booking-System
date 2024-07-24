import { useState } from "react";
import { Button, Container } from "react-bootstrap";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12">
          <Button variant="primary">Primary</Button>
        </div>
      </div>
    </div>
  );
}

export default App;
