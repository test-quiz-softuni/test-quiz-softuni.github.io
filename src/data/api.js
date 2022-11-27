import { clearUserData, getUserData } from "../utilities.js";

const host = 'https://parseapi.back4app.com';

async function request(url, method, data) {
    const options = {
        method,
        headers: {
            'X-Parse-Application-Id': 'z5JHNVs4B6F3TdpkTUHYsTXbMu7bYUn9Vh9b6wWI',
            'X-Parse-REST-API-Key': 'QWoje8bEdpMAUfb5GYwuXOow1cT9TwHsRZYgdkGQ',
        }
    }
    if (data != undefined) {
        options.headers['Content-Type'] = 'application/json'
        options.body = JSON.stringify(data)
    }
    const user = getUserData()
    if (user) {
        options.headers['X-Parse-Session-Token'] = user.sessionToken
    }
    try {
        const response = await fetch(host + url, options);

        if (response.ok != true) {
            if (response.status == 403) {
                clearUserData();
            }
            const error = await response.json();
            throw new Error(error.error);
        }
        if (response.status == 204) {
            return response;
        }
        const data = await response.json();
        return data;

    } catch (error) {
        alert(error.message || error.error);
        throw error;
    }

}
export async function get(url) {
    return await request(url, 'GET')
}
export async function post(url, data) {
    return await request(url, 'POST', data)
}
export async function put(url, data) {
    return await request(url, 'PUT', data)
}
export async function del(url) {
    return await request(url, 'DELETE')
}