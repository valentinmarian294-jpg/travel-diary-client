import {useParams} from "react-router-dom";


const TravelDetailsPage = ({ travels, user }) => {

    console.log("TravelDetailsPage renders");
    console.log("travels prop:", travels);


    const { id } = useParams();

    if (!travels || travels.length === 0) {
        return <p>Loading trip...</p>;
    } 

    const trip = travels.find(
        (t) => String(t.id) === String(id)
    );

    

    if (!trip) {
        return <p>Trip not found</p>
    }

    return (
    <section className="travel-details">

        <div className="details-image-wrapper">
            <img
                src={trip.image}
                alt={trip.city}
                className="details-image"
            />
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

    </section>
);

};

export default TravelDetailsPage;