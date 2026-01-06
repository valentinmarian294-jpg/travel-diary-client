import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function AddTravel({ handleAddTravel }) {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [images, setImages] = useState([""]);
  const [rating, setRating] = useState(0);
  const [note, setNote] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const newTravel = {
      id: uuidv4(),
      city,
      country,
      images: images.filter((url) => url.trim() !== ""),
      rating,
      notes: note,
    };

    handleAddTravel(newTravel);

    setCity("");
    setCountry("");
    setImages([""]);
    setRating(0);
    setNote("");
  };

  return (
    <section className="edit-page">
      <div className="edit-card">
        <form onSubmit={handleFormSubmit} className="edit-form">
          <span className="edit-title">Your trip</span>

          <div className="form-group">
            <p>City</p>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <div className="form-group">
            <p>Country</p>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>

          <div className="form-group">
            <p>Trip Images</p>

            {images.map((img, index) => (
              <input
                key={index}
                type="url"
                placeholder={`Image URL ${index + 1}`}
                value={img}
                onChange={(e) => {
                  const updated = [...images];
                  updated[index] = e.target.value;
                  setImages(updated);
                }}
              />
            ))}

            <button
              type="button"
              onClick={() => setImages([...images, ""])}
              className="secondary-btn"
            >
              + Add another image
            </button>
          </div>

          <div className="form-group">
            <p>Rating</p>
            <input
              type="number"
              min="0"
              max="5"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            />
          </div>

          <div className="form-group">
            <p>Note</p>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          <button className="primary-btn" type="submit">
            ADD TRIP
          </button>
        </form>
      </div>
    </section>
  );
}

export default AddTravel;
