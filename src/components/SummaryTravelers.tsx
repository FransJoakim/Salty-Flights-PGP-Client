import { useContext } from "react";
import { context } from "../ContextProvider";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const postBooking = async (data: Booking) => {
  const { data: response } = await axios.post(
    "https://salty-flights-pgp-server-production.up.railway.app/book",
    data
  );
  return response.data;
};

export const SummaryTravelers = ({ step }: { step: number }) => {
  const navigate = useNavigate();
  const {
    booking: { passengerInfo, trip },
  } = useContext(context);

  const { mutate, isLoading } = useMutation(postBooking, {
    onSuccess: (data: any) => {
      const message = "success";
      alert(message);
      navigate("/");
    },
  });

  const bookAndConfirm = () => {
    if (trip.tripData) {
      const booking = {
        travelers: passengerInfo.details,
        trip: trip.tripData,
      };
      mutate(booking);
    }
  };

  return (
    <div className="w-full border-black border-solid border-2 p-3 rounded-md bg-purple-400">
      <h3 className="text-2xl">
        <b>Summary</b>
      </h3>
      {step === 3 && (
        <div className="w-full py-4 flex flex-col">
          <b>Passengers</b>
          {passengerInfo.details.map((person) => {
            return (
              <div>{`${person.firstName} ${person.surName}, ${person.sex}`}</div>
            );
          })}
          <button onClick={bookAndConfirm} className={`mt-6 p-4 bg-red-500`}>
            Confirm & Book
          </button>
        </div>
      )}
    </div>
  );
};
