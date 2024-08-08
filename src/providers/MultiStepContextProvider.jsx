import { createContext, useContext, useState } from "react";

export const MultiStepContext = createContext({});

export function MultiStepContextProvider({ children }) {
    const [step, setStep] = useState(1);

    function nextStep() {
        if (step === 4) return;
        setStep(prev => prev + 1);
    }

    function prevStep() {
        if (step === 1) return;
        setStep(prev => prev - 1)
    }

    return (
        <MultiStepContext.Provider
            value={{
                step,
                nextStep,
                prevStep,
            }}
        >
            {children}
        </MultiStepContext.Provider>
    )
}

export const useMultiContext = () => useContext(MultiStepContext);
