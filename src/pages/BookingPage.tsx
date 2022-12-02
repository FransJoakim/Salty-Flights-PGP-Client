import { useState } from "react";
import { Summary_Trip } from "../components/Summary_Trip";
import { ContactForm } from "../components/ContactForm";
import { PassengersForm } from "../components/PassengersForm";
import { Summary_Travelers } from "../components/Summary_Travelers";

export const BookingPage = () => {
  const [step, setStep] = useState<number>(1);

  return (
    <div className="w-full h-full bg-green-400 flex justify-center p-12">
      <div className="flex mx-2 flex-col w-1/2">
        <PassengersForm step={step} setStep={setStep} />
        <ContactForm step={step} setStep={setStep} />
        <Summary_Travelers step={step} />
      </div>
      <Summary_Trip step={step} />
    </div>
  );
};
