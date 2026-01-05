import TravelCard from "./TravelCard";

const TravelList = ({ travels = [], deleteTravel }) => {
  console.log("TravelList component loaded");

return (
  <section className="travel-page">
    <h1 className="travel-page-title">Travel Diary</h1>

    <div className="travel-grid">
      {travels.map((travel) => (
        <TravelCard
          key={travel.id}
          travel={travel}
          deleteTravel={deleteTravel}
        />
      ))}
    </div>
  </section>
);

};

export default TravelList;
