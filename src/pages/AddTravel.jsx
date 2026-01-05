import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function AddTravel({ handleAddTravel }) {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [image, setImage] = useState("");
  const [rating, setRating] = useState(0);
  const [note, setNote] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const newTravel = {
      id: uuidv4(),
      city,
      country,
      image,
      rating,
      note
    };

    console.log("NEW TRAVEL SUBMITTED:", newTravel);

     console.log("APP RECEIVED NEW TRAVEL:", newTravel);
     
    setCity("");
    setCountry("");
    setImage("");
    setRating(0);
    setNote("");
  };

  return (
    <section className="edit-page">
    <div className="edit-card">
      <form onSubmit={handleFormSubmit} className="edit-form">
        <span className="edit-title">Your trip</span>

        <label className="form-group">
          <p>City</p>
          <input 
            name="city"
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </label>

        <label className="form-group">
          <p>Country</p>
          <input
            name="country"
            type="text"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </label>

        <label className="form-group">
          <p>Trip Images</p>
          <input
            name="image"
            type="url"
            placeholder="City Image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </label>

        <label className="form-group">
          <p>Rating</p>
          <input
            name="rating"
            type="number"
            placeholder="Rating"
            value={rating}
            min="0"
            max="5"
            step="1"
            onChange={(e) => setRating(Number(e.target.value))}
          />
        </label>

        <label className="form-group">
          <p>Note</p>
          <input
            name="note"
            type="text"
            placeholder="Note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </label>

        <button className="primary-btn" type="submit">
          ADD TRIP
        </button>
      </form>
    </div>
    </section>
  );
}

export default AddTravel;

