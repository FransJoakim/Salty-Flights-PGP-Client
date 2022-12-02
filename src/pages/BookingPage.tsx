import { useState } from "react";
import { SummaryTrip } from "../components/SummaryTrip";
import { ContactForm } from "../components/ContactForm";
import { PassengersForm } from "../components/PassengersForm";
import { SummaryTravelers } from "../components/SummaryTravelers";

export const BookingPage = () => {
  const [step, setStep] = useState<number>(1);

  return (
    <div className="w-full h-full bg-green-400 flex justify-center p-12">
      <div className="flex mx-2 flex-col w-1/2">
        <PassengersForm step={step} setStep={setStep} />
        <ContactForm step={step} setStep={setStep} />
        <SummaryTravelers step={step} />
      </div>
      <SummaryTrip step={step} />
    </div>
  );
};
