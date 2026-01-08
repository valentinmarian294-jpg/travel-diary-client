import {useParams} from "react-router-dom";
import { useState } from "react";


const TravelDetailsPage = ({ travels, user }) => {

    console.log("TravelDetailsPage renders");
    console.log("travels prop:", travels);


    const { id } = useParams();
    
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isImageOpen, setIsImageOpen] = useState(false);
    


    if (!travels || travels.length === 0) {
        return <p>Loading trip...</p>;
    } 

    const trip = travels.find(
        (t) => String(t.id) === String(id)
    );


  const images =
  Array.isArray(trip.images) && trip.images.length > 0
    ? trip.images
    : trip.image
    ? [trip.image]
    : [];




    if (!trip) {
        return <p>Trip not found</p>
    }

    return (
    <section className="travel-details">

        <div className="details-image-wrapper">
  <img
    src={images[currentIndex]}
    alt={`${trip.city} image ${currentIndex + 1}`}
    className="details-image"
    onClick={() => setIsImageOpen(true)}
  />

  {images.length > 1 && (
    <>
      <button
        className="carousel-btn prev"
        onClick={() =>
          setCurrentIndex(
            currentIndex === 0
              ? images.length - 1
              : currentIndex - 1
          )
        }
      >
        ‹
      </button>

      <button
        className="carousel-btn next"
        onClick={() =>
          setCurrentIndex(
            currentIndex === images.length - 1
              ? 0
              : currentIndex + 1
          )
        }
      >
        ›
      </button>


      {images.length > 1 && (
  <div className="carousel-dots">
    {images.map((_, index) => (
      <span
        key={index}
        className={
          index === currentIndex
            ? "carousel-dot active"
            : "carousel-dot"
        }
        onClick={() => setCurrentIndex(index)}
      />
    ))}
  </div>
)}

    </>
  )}
</div>


        <div className="details-cards">

            <div className="details-card">
                <h2 className="details-card-title">Overview</h2>
                <p><strong>City:</strong> {trip.city}</p>
                <p><strong>Country:</strong> {trip.country}</p>
            </div>

            <div className="details-card">
                <h2 className="details-card-title">Notes</h2>
                <p>{trip.notes}</p>
            </div>

            <div className="details-card">
                <h2 className="details-card-title">Trip Info</h2>
                <p><strong>Date:</strong> {trip.date}</p>
                <p><strong>Rating:</strong> {trip.rating} / 5</p>
            </div>

        </div>
{user && (
  <div className="travel-actions">
    <a href={`/edit/${trip.id}`}>
      <button className="edit-button-travel">Edit</button>
    </a>

    <button
      className="delete-button-travel"
      onClick={() => alert("Delete handled elsewhere")}
    >
      Delete
    </button>
  </div>
)}


{isImageOpen && (
  <div
    className="image-modal"
    onClick={() => setIsImageOpen(false)}
  >
    <img
      src={images[currentIndex]}
      alt="Full size"
      className="image-modal-content"
    />
  </div>
)}

    </section>
);

};

export default TravelDetailsPage;