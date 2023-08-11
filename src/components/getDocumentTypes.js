import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/document-types/getDocumentTypes';

export const getDocumentTypes = async () => {
    try {
        const headers = {
            'X-API-KEY': 'themostsecretkeyeverexisted'
        };

        const response = await axios.get(BASE_URL, { headers });
        return response.data;
    } catch (error) {
        console.error('Error fetching document types:', error);
        return [];
    }
};
