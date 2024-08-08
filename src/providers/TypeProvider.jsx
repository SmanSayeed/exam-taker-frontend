import { createContext, useState } from "react";

export const TypeContext = createContext();

export const TypeProvider = ({ initialType, children }) => {
    const [type, setType] = useState(initialType);

    return (
        <TypeContext.Provider value={{ type, setType }}>
            {children}
        </TypeContext.Provider>
    );
};

