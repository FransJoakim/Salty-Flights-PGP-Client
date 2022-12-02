import { useContext } from "react";
import { useForm } from "react-hook-form";
import { context } from "../ContextProvider";

export const ContactForm = ({
  step,
  setStep,
}: {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const { register, handleSubmit } = useForm();
  const {
    booking: {
      contactInfo: { setData },
    },
  } = useContext(context);

  const registerPassengers = (data: any) => {
    setData({
      email: data.email,
      phonenr: data.phonenr,
    });
    setStep(3);
  };

  return (
    <form
      onSubmit={handleSubmit((data) => registerPassengers(data))}
      className="flex flex-col w-full mb-4"
    >
      <div className="border-black border-solid border-2 p-3 rounded-md bg-purple-400">
        <h3>
          <b>{"Contact information"}</b>
        </h3>
        {step === 2 && (
          <div className="w-full flex justify-center items-center">
            <div className="flex flex-col mx-2 flex-1">
              <label htmlFor={"email"}>Email</label>
              <input
                {...register(`email`, { required: true })}
                placeholder="Where to?"
                className="p-2"
                value="mann@ok.no"
              />
            </div>
            <div className="flex flex-col flex-1">
              <label htmlFor="phonenr">Phone number</label>
              <input
                {...register(`phonenr`, { required: true })}
                placeholder="Your favorite airport"
                className="p-2"
                value="12345678"
              />
            </div>
          </div>
        )}
      </div>
      {step === 2 && (
        <button type="submit" className="bg-red-500 my-2 p-2">
          Next
        </button>
      )}
    </form>
  );
};
