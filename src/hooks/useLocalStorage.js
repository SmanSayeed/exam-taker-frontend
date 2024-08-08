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

