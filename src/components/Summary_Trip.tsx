import { useContext } from "react";
import { context } from "../ContextProvider";
import { FlightDetails } from "./FlightDetails";
import { useNavigate } from "react-router-dom";

export const Summary_Trip = ({ step }: { step: number }) => {
  const navigate = useNavigate();
  const { booking } = useContext(context);
  const trip = booking.trip.tripData;
  const count = booking.passengers.count;

  if (!trip) {
    setTimeout(() => {
      navigate("/");
    }, 0);
    return null;
  }
  const priceDeparture = count * trip.departure.prices.adult;
  let priceReturn = 0;
  if (trip.return) {
    priceReturn = count * trip.return.prices.adult;
  }

  return (
    <div className="w-1/3 mx-2 p-12 border-black border-solid border-2 p-3 rounded-md bg-purple-400">
      <h2 className="text-3xl">Booking</h2>
      <FlightDetails flight={trip.departure} priceTotal={priceDeparture} />
      {trip.return && (
        <FlightDetails flight={trip.return} priceTotal={priceReturn} />
      )}
      <div className="p-4">
        <b>
          <span>{`In total (X${count}): `}</span>
          {priceDeparture + priceReturn}
        </b>
      </div>
    </div>
  );
};
