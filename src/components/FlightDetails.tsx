export const FlightDetails = ({
  flight,
  priceTotal,
}: {
  flight: Flight;
  priceTotal?: number;
}) => {
  const {
    flight_id,
    depatureDestination,
    arrivalDestination,
    departureTime,
    arrivalTime,
    duration,
    avaliableSeats,
    prices,
  } = flight;

  return (
    <div className="w-full flex flex-col p-4">
      <div>
        {flight_id} {departureTime.dateString}{" "}
        {arrivalTime.dateString !== departureTime.dateString
          ? "-> " + arrivalTime.dateString
          : ""}
      </div>
      <div>
        {`${depatureDestination} 
        ${departureTime.timeString} -> ${arrivalTime.timeString}
        ${arrivalDestination}`}
      </div>
      <div>Duration of flight: {duration}</div>
      <div>Avalible seats: {avaliableSeats}</div>
      <div>
        Price: {prices.currency} {prices.adult}
      </div>
      {priceTotal !== prices.adult && (
        <div>{`In total: ${prices.currency} ${priceTotal}`}</div>
      )}
    </div>
  );
};
