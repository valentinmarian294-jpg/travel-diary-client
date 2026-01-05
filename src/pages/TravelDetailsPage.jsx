import {useParams} from "react-router-dom";
import travelData from "../public/db.json";

const TravelDetailsPage = () => {
    const {id} = useParams();
    const travel = travelData.find((item) => item.id === id);
    
    if (!travel) {
        return <h2>Travel not found</h2>
    }

    return (
        <div className="travel-details">
            <h1>{travel.country}</h1>
            <img src={travel.image} alt={travel.city} />
            <p>City: {travel.city} </p>
            <p>Data: {travel.data} </p>
            <p>Notes: {travel.note} </p>
        </div>
    );
};

export default TravelDetailsPage;