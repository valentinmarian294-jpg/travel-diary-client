import { Link } from "react-router-dom";

const TravelCard = ({ travel, deleteTravel, user }) => {

console.log("TRAVEL CARD DATA:", travel);


  return (
    <div className="travel-card">

      <Link to={`/item/${travel.id}`} className="travel-link">
<img
  src={
    Array.isArray(travel.images)
      ? travel.images.find((url) => url && url.trim() !== "")
      : typeof travel.images === "string"
      ? travel.images
      : typeof travel.image === "string"
      ? travel.image
      : ""
  }
  alt={travel.city}
  className="travel-image"
/>

      <div className="travel-content">
        <h2 className="travel-city">{travel.city}</h2>
        <p className="travel-country">{travel.country}</p>

        <div className="rating">
          {Array.from({ length: 5 }, (_, index) => (
            <span key={index}>
              {index < travel.rating ? "⭐" : "☆"}
            </span>
          ))}
        </div>
      </div>
      </Link>

      {user && (
  <div className="travel-actions">
    <Link to={`/edit/${travel.id}`}>
      <button className="edit-button-travel">Edit</button>
    </Link>

    <button
      onClick={() => deleteTravel(travel.id)}
      className="delete-button-travel"
    >
      Delete
    </button>
  </div>
)}

    </div>
  );
};

export default TravelCard;
