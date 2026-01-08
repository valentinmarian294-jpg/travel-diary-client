import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const EditTrip = ({ travels, updateTravel }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (!Array.isArray(travels)) return;

    const tripToEdit = travels.find(
      (trip) => String(trip.id) === String(id)
    );

    if (!tripToEdit) return;

    setFormData({
      ...tripToEdit,
      images: Array.isArray(tripToEdit.images)
        ? tripToEdit.images
        : typeof tripToEdit.images === "string"
        ? [tripToEdit.images]
        : [""],
    });
  }, [travels, id]);

  if (!Array.isArray(travels) || !formData) {
    return <p>Loading trip...</p>;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ NEW: delete a single image by index
  const handleDeleteImage = (indexToDelete) => {
    setFormData({
      ...formData,
      images: formData.images.filter(
        (_, index) => index !== indexToDelete
      ),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleanedTrip = {
      ...formData,
      images: formData.images.filter((url) => url.trim() !== ""),
    };

    fetch(`http://localhost:3001/entries/${cleanedTrip.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cleanedTrip),
    })
      .then((res) => res.json())
      .then((updatedFromServer) => {
        updateTravel(updatedFromServer);
        navigate("/");
      })
      .catch((err) => {
        console.error("Error updating trip", err);
      });
  };

  return (
    <section className="edit-page">
      <div className="edit-card">
        <h1 className="edit-title">
          Edit your trip to {formData.city}
        </h1>

        <p className="edit-subtitle">
          Update the details of your adventure
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
            <label>Trip Images</label>

            {formData.images.map((img, index) => (
              <div key={index} className="edit-image-block">

                <input
                  type="url"
                  placeholder={`Image URL ${index + 1}`}
                  value={img}
                  onChange={(e) => {
                    const updatedImages = [...formData.images];
                    updatedImages[index] = e.target.value;

                    setFormData({
                      ...formData,
                      images: updatedImages,
                    });
                  }}
                />

                {img && (
                  <img
                    src={img}
                    alt={`Preview ${index + 1}`}
                    className="edit-image-preview"
                  />
                )}

                {/* ✅ NEW: delete button for this image */}
                <button
                  type="button"
                  onClick={() => handleDeleteImage(index)}
                  className="delete-image-btn"
                >
                  Delete image
                </button>
              </div>
            ))}

            <button
              type="button"
              className="secondary-btn"
              onClick={() =>
                setFormData({
                  ...formData,
                  images: [...formData.images, ""],
                })
              }
            >
              + Add another image
            </button>
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
