export const apiRequest = async (url, method = 'GET', body = {}, headers = {}) => {
    const userId = localStorage.getItem('userId') || null;
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

        // Handle responses with no content
        if (response.status === 204 || response.headers.get('content-length') === '0') {
            return null;
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};
