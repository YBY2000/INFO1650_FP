import { useState } from 'react';

const useRequest = (url, options = {}) => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const request = async (body = null) => {
        setIsLoading(true);
        setError(null);

        const defaultHeaders = {
            'Content-Type': 'application/json',
        };

        const defaultUrl = 'http://localhost:3000/api';

        try {
            const response = await fetch(defaultUrl + url, {
                ...options,
                headers: { ...defaultHeaders, ...options.headers },
                body: body ? JSON.stringify(body) : null,
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            setIsLoading(false);
            return result; // Return the data directly
        } catch (err) {
            setError(err);
            setIsLoading(false);
            throw err; // Rethrow the error so it can be caught by the caller
        }
    };
    
    return { error, isLoading, request };
};

export default useRequest;
