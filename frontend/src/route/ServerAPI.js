// export const urlAPI = "http://192.168.0.102:5555";
export const urlAPI = "http://192.168.0.107:5174";
// export const urlAPI = "http://localhost:2000/api";

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
