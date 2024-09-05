import { useEffect, useState } from 'react';

export default function useLocalStorage(props) {
    const [value, setValue] = useState(() => {
        const storedValue = localStorage.getItem(props.key)
        return storedValue !== null ? JSON.parse(storedValue) : props.defaultValue
    });

    useEffect(() => {
        localStorage.setItem(props.key, JSON.stringify(value))
    }, [value, props.key])

    return [value, setValue]
}



// import { useEffect, useState } from 'react';

// export default function useLocalStorage(props) {
//     const [value, setValue] = useState(() => {
//         const storedValue = localStorage.getItem(props.key);

//         try {
//             return storedValue !== null ? JSON.parse(storedValue) : props.defaultValue;
//         } catch (e) {
//             return storedValue !== null ? storedValue : props.defaultValue;
//         }
//     });

//     useEffect(() => {
//         try {
//             localStorage.setItem(props.key, JSON.stringify(value));
//         } catch (e) {
//             localStorage.setItem(props.key, value);
//         }
//     }, [value, props.key]);

//     return [value, setValue];
// }

