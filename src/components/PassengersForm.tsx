import { FieldErrorsImpl, FieldValues, UseFormRegister } from "react-hook-form";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { context } from "../ContextProvider";

export const PassengersForm = ({
  step,
  setStep,
}: {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {
    booking: {
      passengers: { count },
      passengerInfo: { setDetails },
    },
  } = useContext(context);

  const proto = [];
  for (let i = 1; i <= count; i++) {
    proto.push(i);
  }

  const registerPassengers = (data: any) => {
    const passengerInfo: Traveler[] = [];
    for (let i = 1; i <= count; i++) {
      const p_Details = {
        firstName: data[`${i}_firstName`],
        surName: data[`${i}_surName`],
        sex: data[`${i}_sex`],
      };
      passengerInfo.push(p_Details);
    }

    setDetails(passengerInfo);
    setStep(2);
  };

  return (
    <form
      onSubmit={handleSubmit((data) => registerPassengers(data))}
      className="flex flex-col w-full mb-4"
    >
      <div className="border-black border-solid border-2 p-3 rounded-md bg-purple-400">
        <h3>
          <b>{"Passenger information"}</b>
        </h3>
        {step === 1 && (
          <>
            {proto.map((pasNr) => (
              <Passenger_N_Form
                pasNr={pasNr}
                register={register}
                errors={errors}
                key={pasNr}
              />
            ))}
          </>
        )}
        {step === 1 && (
          <button type="submit" className="bg-red-500 my-2 p-2">
            Next
          </button>
        )}
      </div>
    </form>
  );
};

export const Passenger_N_Form = ({
  pasNr,
  register,
  errors,
}: {
  pasNr: number;
  register: UseFormRegister<FieldValues>;
  errors: Partial<
    FieldErrorsImpl<{
      [x: string]: any;
    }>
  >;
}) => {
  return (
    <div className="my-2 border-black border-solid border-2 p-3 rounded-md bg-pink-400">
      <h3>
        <b>{"Passenger " + pasNr}</b>
      </h3>
      <div className="w-full flex justify-center items-center">
        <div className="flex flex-col">
          <label htmlFor={`${pasNr}_firstName`}>First Name</label>
          <input
            {...register(`${pasNr}_firstName`, { required: true })}
            placeholder="Your favorite airport"
            className="p-2"
            value="Franz"
          />
        </div>
        <div className="flex flex-col mx-2">
          <label htmlFor={`${pasNr}_surName`}>Surname</label>
          <input
            {...register(`${pasNr}_surName`, { required: true })}
            placeholder="Where to?"
            className="p-2"
            value="Evertsen"
          />
        </div>
        <div className="flex flex-col my-2">
          <label htmlFor={`${pasNr}_sex`}>Sex</label>
          <select
            {...register(`${pasNr}_sex`, {
              required: "select one option",
            })}
            className="p-2 h-10"
            value="other"
          >
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Other</option>
          </select>
          {errors.func && (
            <p style={{ color: "red" }}>
              <>{errors.func.message}</>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
