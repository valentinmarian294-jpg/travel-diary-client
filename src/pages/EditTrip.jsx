import { useParams } from "react-router-dom";
import { useState } from "react";

const EditTrip = ({ travels, updateTravel }) => {
  const { id } = useParams();

  if (!travels || travels.length === 0) {
    return <p>Loading trip...</p>;
  }

  const tripToEdit = travels.find(
  (trip) => String(trip.id) === String(id)
);

if (!tripToEdit) {
    return <p>Trip not found</p>;
  }
  const [formData, setFormData] = useState(tripToEdit);

  if (!tripToEdit) {
    return <p>Trip not found</p>;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTravel(formData);
  };

  return (
    <section className="edit-page">
      <div className="edit-card">
        <h1 className="edit-title">
          Edit your trip to {formData.city}
        </h1>

        <p className="edit-subtitle">
          Update the details of your trip below.
        </p>

        <form onSubmit={handleSubmit} className="edit-form">
          <div className="form-group">
            <label>City</label>
            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Country</label>
            <input
              name="country"
              value={formData.country}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Image URL</label>
            <input
              name="image"
              value={formData.image}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Rating</label>
            <input
              type="number"
              min="1"
              max="5"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
            />
          </div>

          <div className="edit-actions">
            <button type="submit" className="primary-btn">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditTrip;
