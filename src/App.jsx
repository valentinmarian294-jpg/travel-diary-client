import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import TravelList from "./components/TravelList";
import EditTrip from "./pages/EditTrip";
import AddTravel from "./pages/AddTravel";


function App() {
  const [travels, setTravels] = useState([]);

  const handleAddTravel = (newTravel) => {
  setTravels((prev) => [newTravel, ...prev]);
};


  useEffect(() => {
    fetch("/db.json")
      .then((res) => res.json())
      .then((data) => {
        setTravels(data.entries);
      })
      .catch((err) => {
        console.error("Error loading db.json", err);
      });
  }, []);

  const deleteTravel = (id) => {
    setTravels((prev) => prev.filter((t) => t.id !== id));
  };
  
  const updateTravel = (updatedTrip) => {
  setTravels((prev) =>
    prev.map((trip) =>
      trip.id === updatedTrip.id ? updatedTrip : trip
    )
  );
};



return (
  <>
    <NavBar />

    <main>
      <Routes>
        <Route
          path="/"
          element={
            <TravelList
              travels={travels}
              deleteTravel={deleteTravel}
            />
          }
        />
        <Route
  path="/add"
  element={
    <AddTravel handleAddTravel={handleAddTravel} />
  }
/>


        <Route
          path="/edit/:id"
          element={
            <EditTrip
              travels={travels}
              updateTravel={updateTravel}
            />
          }
        />

        <Route
          path="/AddTravel"
          element={
            <AddTravel
              travels={travels}
              addTravel={AddTravel}
            />
          }
        />
      </Routes>
    </main>

    <Footer />
  </>
);
}

export default App;
