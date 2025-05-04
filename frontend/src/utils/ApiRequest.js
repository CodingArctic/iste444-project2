import { useContent } from "./ContentProvider";

export const apiRequest = async (url, method = 'GET', body = {}, headers = {}) => {
    const { userId } = useContent(); 
    const requestBody = { ...body, requestorId: userId };
    const baseUrl = 'http://localhost:8080';

    try {
        const response = await fetch(`${baseUrl}${url}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
            body: method !== 'GET' ? JSON.stringify(requestBody) : null,
        });

        if (!response.ok) {
            throw new Error(`http status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API Request Error:', error);
        throw error;
    }
};