import { useEffect, useState } from 'react';

export default function useLocalStorage({ key, defaultValue }) {
    const [value, setValue] = useState(() => {
        try {
            const storedValue = localStorage.getItem(key);
            return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
        } catch (error) {
            console.error("Failed to parse JSON from localStorage:", error);
            return defaultValue;
        }
    });

    useEffect(() => {
        if (value === "" || value === null) {
            localStorage.removeItem(key);
        } else {
            localStorage.setItem(key, JSON.stringify(value));
        }
    }, [value, key]);

    return [value, setValue];
}



// import { useEffect, useState } from 'react';

// export default function useLocalStorage(props) {
//     const [value, setValue] = useState(() => {
//         const storedValue = localStorage.getItem(props.key)
//         return storedValue !== null ? JSON.parse(storedValue) : props.defaultValue
//     });

//     useEffect(() => {
//         localStorage.setItem(props.key, JSON.stringify(value))
//     }, [value, props.key])

//     return [value, setValue]
// }

