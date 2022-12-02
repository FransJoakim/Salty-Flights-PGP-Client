import { useContext } from "react";
import { context } from "../ContextProvider";
import { useNavigate } from "react-router-dom";
import { useSearch } from "./SearchBar";
import { FlightDetails } from "./FlightDetails";

export const ResultsList = () => {
  const { data } = useSearch();

  return (
    <div className="w-full flex flex-col items-center p-8 justify-center">
      {data?.map((flight, index) => (
        <TripListing {...flight} key={index} />
      ))}
    </div>
  );
};

export const TripListing = (tripListing: Trip) => {
  const navigate = useNavigate();

  const {
    booking: {
      trip: { setTrip },
    },
  } = useContext(context);

  const goToBooking = () => {
    setTrip(tripListing);
    navigate("/booking");
  };

  return (
    <div className="w-3/4 bg-slate-400 flex flex-col p-4 m-6">
      <FlightDetails flight={tripListing.departure} />
      {tripListing.return && <FlightDetails flight={tripListing.return} />}
      <button onClick={goToBooking}>Book</button>
    </div>
  );
};
