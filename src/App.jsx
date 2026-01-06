import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import NavBar from "./components/NavBar";
import LoginTrips from "./pages/LoginTrips";
import Footer from "./components/Footer";
import TravelList from "./components/TravelList";
import EditTrip from "./pages/EditTrip";
import AddTravel from "./pages/AddTravel";
import TravelDetailsPage from "./pages/TravelDetailsPage";



function App() {
  const [user, setUser] = useState(null);
  const [travels, setTravels] = useState([]);

  const handleAddTravel = (newTravel) => {
  setTravels((prevTravels) => [...prevTravels, newTravel]);
};


  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if(storedUser){
      setUser(JSON.parse(storedUser));
    }
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
    <NavBar user={user} setUser={setUser} />
    
    <main>
      <Routes>
        <Route
  path="/"
  element={
    <TravelList
      travels={travels}
      deleteTravel={deleteTravel}
      user={user}
    />
  }
/>

        <Route
          path="/LoginTrips"
          element={
          <LoginTrips setUser={setUser}/>
        }
        />
        <Route
          path="/AddTravel"
          element={
          user ? (
            <AddTravel handleAddTravel={handleAddTravel} />
          ) : (
            <LoginTrips setUser={setUser}/>
          )
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
          path="/item/:id"
          element={
            <TravelDetailsPage 
              travels={travels}
              user={user}/>
          }
        />
      </Routes>
    </main>

    <Footer />
  </>
);
}

export default App;
