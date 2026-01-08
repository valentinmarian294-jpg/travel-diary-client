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
  fetch("http://localhost:3001/entries", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTravel),
  })
    .then((res) => res.json())
    .then((createdTrip) => {
      setTravels((prev) => [...prev, createdTrip]);
    })
    .catch((err) => {
      console.error("Error adding trip", err);
    });
};
  useEffect(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    setUser(JSON.parse(storedUser));
  }

  fetch("http://localhost:3001/entries")
    .then((res) => res.json())
    .then((data) => {
      setTravels(data);
    })
    .catch((err) => {
      console.error("Error loading trips", err);
    });
}, []);



  const deleteTravel = (id) => {
  fetch(`http://localhost:3001/entries/${id}`, {
    method: "DELETE",
  })
    .then(() => {
      setTravels((prev) => prev.filter((t) => t.id !== id));
    })
    .catch((err) => {
      console.error("Error deleting trip", err);
    });
};


 const updateTravel = (updatedTrip) => {
  const cleanedTrip = {
    ...updatedTrip,
    images: Array.isArray(updatedTrip.images)
      ? updatedTrip.images.filter((url) => url && url.trim() !== "")
      : [],
  };

  fetch(`http://localhost:3001/entries/${cleanedTrip.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cleanedTrip),
  })
    .then((res) => res.json())
    .then((savedTrip) => {
      setTravels((prev) =>
        prev.map((trip) =>
          trip.id === savedTrip.id ? savedTrip : trip
        )
      );
    });
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
            element={<LoginTrips setUser={setUser} />}
          />

          <Route
            path="/AddTravel"
            element={
              user ? (
                <AddTravel handleAddTravel={handleAddTravel} />
              ) : (
                <LoginTrips setUser={setUser} />
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
                user={user}
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
