import * as URL from 'url-parse';

interface LoadParams {
    url: string,
    method?: 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'OPTIONS' | 'TRACE' | 'PATCH',
    data: Object,
}

export const Api = {
    load({ url, method = 'GET', data = {} }: LoadParams) {
        let body;
        if (method === 'GET' || method === 'HEAD') {
            const urlObj = URL(url, true);
            urlObj.set('query', data);
            url = urlObj.toString();
        } else {
            body = JSON.stringify(data);
        }
        return fetch(url, {
            method,
            body,
        }).then(response => response.json());
    }
};