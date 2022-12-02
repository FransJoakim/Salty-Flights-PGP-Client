type Price = {
  currency: string;
  adult: number;
  child: number;
};

type ConnectionDetails = {
  timeDateString: string;
  dateString: string;
  timeString: string;
};

interface Flight {
  flight_id: string;
  depatureDestination: string;
  arrivalDestination: string;
  departureTime: ConnectionDetails;
  arrivalTime: ConnectionDetails;
  duration: string;
  avaliableSeats: number;
  prices: Price;
}

interface Trip {
  departure: Flight;
  return?: Flight;
}

type Traveler = {
  firstName: string;
  surName: string;
  sex: string;
};

interface Booking {
  trip: Trip;
  travelers?: Traveler[];
}
