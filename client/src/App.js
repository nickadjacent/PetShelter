import React from "react";
import "./App.css";
import { Router } from "@reach/router";
import 'bootstrap/dist/css/bootstrap.css';


import Pets from "./views/Pets";
import AddPet from "./views/AddPet";
import PetDetails from "./views/PetDetails";
import EditPet from "./views/EditPet";

// test

function App() {
  return (
    <>
      <body>
        <h1 className="container-flex justify-content-center card-header shadow-lg p-5"
          style={{
            backgroundColor: "rgba(0,0,0, 0.65)",
            color: "white",
            fontWeight: "bold"
          }}>
          Pet Shelter
        </h1>
        <div className="container-flex justify-content-center">
          <Router>
            <Pets path="/" />
            <AddPet path="/pets/new" />
            <PetDetails path="/pets/:id" />
            <EditPet path="/pets/:id/edit" />
          </Router>
        </div>
      </body>
    </>
  );
}

export default App;
