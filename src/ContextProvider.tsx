import { createContext, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type searchContextInterface = {
  httpQuery: string;
  setHttpQuery: (value: string) => void;
};

type BookedTrip = {
  tripData: Trip | null;
  setTrip: (value: Trip) => void;
};

type passengerNr = {
  count: number;
  setCount: (value: number) => void;
};

type BookedPassengers = {
  details: Traveler[];
  setDetails: (value: Traveler[]) => void;
};

type Info = {
  email: string;
  phonenr: string;
} | null;

type ContactInformation = {
  data: Info;
  setData: (value: Info) => void;
};

type Booking = {
  trip: BookedTrip;
  passengers: passengerNr;
  passengerInfo: BookedPassengers;
  contactInfo: ContactInformation;
};

interface StateInterface {
  searchQuery: searchContextInterface;
  booking: Booking;
}

const emptyInitState: StateInterface = {
  searchQuery: {
    httpQuery: "",
    setHttpQuery: (_: string) => {},
  },
  booking: {
    trip: {
      tripData: null,
      setTrip: (_: Trip) => {},
    },
    passengers: {
      count: 1,
      setCount: (_: number) => {},
    },
    passengerInfo: {
      details: [],
      setDetails: (_: Traveler[]) => {},
    },
    contactInfo: {
      data: null,
      setData: (_: Info) => {},
    },
  },
};

export const context = createContext<StateInterface>(emptyInitState);

export const ContextProvider = ({ children }: { children: JSX.Element[] }) => {
  const [httpQuery, setHttpQuery] = useState<string>("");
  const [trip, setTrip] = useState<Trip | null>(null);
  const [passengers, setPassengers] = useState<number>(1);
  const [passengerInfo, setPassengerInfo] = useState<Traveler[]>([]);
  const [contactInfo, setContactInfo] = useState<Info>(null);

  const state: StateInterface = {
    searchQuery: {
      httpQuery: httpQuery,
      setHttpQuery: (value: string) => setHttpQuery(value),
    },
    booking: {
      trip: {
        tripData: trip,
        setTrip,
      },
      passengers: {
        count: passengers,
        setCount: setPassengers,
      },
      passengerInfo: {
        details: passengerInfo,
        setDetails: setPassengerInfo,
      },
      contactInfo: {
        data: contactInfo,
        setData: setContactInfo,
      },
    },
  };

  const queryClient = new QueryClient();

  return (
    <context.Provider value={state}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </context.Provider>
  );
};
