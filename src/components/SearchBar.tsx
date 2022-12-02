import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useQuery, QueryFunctionContext } from "@tanstack/react-query";
import { context } from "../ContextProvider";

const fetchFlights = async ({
  queryKey,
}: QueryFunctionContext<[string, string | null | undefined]>): Promise<
  Trip[]
> => {
  const result = await axios.get(
    "https://salty-flights-pgp-server-production.up.railway.app/availability" +
      queryKey[1]
  );
  return result.data;
};

export const useSearch = () => {
  const {
    searchQuery: { httpQuery },
  } = useContext(context);
  return useQuery({
    queryKey: ["flights", httpQuery],
    queryFn: fetchFlights,
    enabled: false,
  });
};

export const SearchBar = () => {
  const { control, register, handleSubmit } = useForm();
  const {
    searchQuery: { httpQuery, setHttpQuery },
    booking: {
      passengers: { setCount },
    },
  } = useContext(context);
  const { refetch } = useSearch();
  const [isOneWay, setIsOneWay] = useState<boolean>(false);
  const [passengerCount, setPassengerCount] = useState<string>("1");

  const getData = (formData: any) => {
    let queryString = `?D_City=${formData.departure}&A_City=${
      formData.destination
    }&D_Date=${formData.departureDate.getDate()}&P_Count=${passengerCount}`;

    if (formData.returnDate) {
      queryString = queryString + `&R_Date=${formData.returnDate.getDate()}`;
    }
    setCount(Number(passengerCount));
    setHttpQuery(queryString);
  };

  useEffect(() => {
    refetch();
  }, [httpQuery, refetch]);

  return (
    <div className="w-full h-80 bg-blue-400 flex justify-center items-center">
      <form
        onSubmit={handleSubmit((data) => getData(data))}
        className="flex flex-col"
      >
        <div className="w-full flex justify-center">
          <div className="flex flex-col">
            <div className="flex flex-col my-2">
              <label htmlFor="departure">From</label>
              <input
                {...register("departure", { required: true })}
                placeholder="Your favorite airport"
                className="p-2"
                value="Oslo"
              />
            </div>
            <Controller
              control={control}
              name="departureDate"
              rules={{ required: true }}
              defaultValue={new Date(2022, 11, 12)}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <ReactDatePicker
                  onChange={onChange}
                  onBlur={onBlur}
                  selected={value}
                  className="p-2"
                />
              )}
            />
            <div className="flex flex-col my-2">
              <select
                value={passengerCount}
                className="p-2 h-9"
                onChange={(e) => setPassengerCount(e.target.value)}
              >
                <option value={1}>1 traveler</option>
                <option value={2}>2 travelers</option>
                <option value={3}>3 travelers</option>
                <option value={4}>4 travelers</option>
                <option value={5}>5 travelers</option>
                <option value={6}>6 travelers</option>
                <option value={7}>7 travelers</option>
                <option value={8}>8 travelers</option>
                <option value={9}>9 travelers</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col mx-2">
            <div className="flex flex-col my-2">
              <label htmlFor="destination">To</label>
              <input
                {...register("destination", { required: true })}
                placeholder="Where to?"
                className="p-2"
                value="Amsterdam"
              />
            </div>
            <Controller
              control={control}
              name="returnDate"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <ReactDatePicker
                  onChange={onChange}
                  onBlur={onBlur}
                  selected={value}
                  className="p-2"
                  disabled={isOneWay}
                />
              )}
            />
            <div className="flex flex-col my-2">
              <select
                {...(register("return"), { defaultValue: "roundTrip" })}
                className="p-2 h-9"
                onChange={() => {
                  setIsOneWay(!isOneWay);
                }}
              >
                <option value={"roundTrip"}>Round trip</option>
                <option value={"oneWay"}>One-way</option>
              </select>
            </div>
          </div>
        </div>
        <button type="submit" className="bg-gray-500 my-2 p-2">
          Search
        </button>
      </form>
    </div>
  );
};
