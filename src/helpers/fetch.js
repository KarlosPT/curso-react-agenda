const baseURL = import.meta.env.VITE_APP_API_URL; 

const fechtSinToken = (endpoint,data, method='GET') => {
    

    const url = `${baseURL}/${endpoint}`;//localhost:4000/api

    if(method === 'GET'){
        return fetch(url);
    }
    else{
        return fetch(url, {
            method,
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'

            }
        })
        
    }
}

const fechtConToken = (endpoint,data, method='GET') => {
    

    const url = `${baseURL}/${endpoint}`;//localhost:4000/api
    const token = localStorage.getItem('token') || '';

    if(method === 'GET'){
        return fetch(url,{
            method,
            headers: {
                'Content-Type': 'application/json',
                'x-token': token
            }
        });
    }
    else{
        return fetch(url, {
            method,
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'x-token': token

            }
        })
        
    }
}

export {
    fechtSinToken,
    fechtConToken
}