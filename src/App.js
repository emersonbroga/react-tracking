import React, { useState } from "react";
import "./App.css";
import TrackingResult from "./components/TrackingResult";

function App() {
  const [data, setData] = useState([]);

  const submitHanlder = event => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    fetch(`http://localhost:3001/?tracking=${data.tracking}`)
      .then(response => response.json())
      .then(result => {
        if (result.message === "OK") {
          setData(result.data);
        }
      })
      .catch(console.error);
  };

  return (
    <div className="container">
      <h1>React Tracking</h1>
      <form onSubmit={submitHanlder}>
        <div className="form-group">
          <input type="text" className="form-control" name="tracking" />
        </div>
        <button type="submit" className="btn btn-primary">
          Verificar
        </button>
      </form>

      <TrackingResult data={data} />
    </div>
  );
}

export default App;
