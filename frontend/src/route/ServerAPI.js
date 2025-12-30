export const urlAPI = "https://charuceramic.com/api";
// export const urlAPI = "http://localhost:5174/api";

export const ServerApi = (urlPath, method, userToken = null, bodySection = null, imgSender = false) => {
    return fetch(urlAPI + urlPath, {
        method: method,
        headers: {
            ...(imgSender ? null : { 'Content-Type': 'application/json' }),
            'Authorization': `Bearer ${userToken}`,
        },
        body: (method === 'GET' || method === 'DELETE') ? undefined : imgSender ? bodySection : JSON.stringify(bodySection),
    })
}
