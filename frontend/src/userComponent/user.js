//all methods to interact with backend are defined here

const baseUrl = "http://localhost:3001";

//create a new user
const create = async (user) => {
    try {
        let response = await fetch(`${baseUrl}/users/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        return await response.json()
    } catch(err) {
        console.log(err)
    }
}

//get all users
const list = async (signal) => {
    try {
        let response = await fetch(`${baseUrl}/users/`, {
            method: 'GET',
            signal: signal,
        });
        return await response.json();
    } catch(err) {
        console.log(err)
    }
}

//get a user profile
const read = async (params, credentials, signal) => {
    try {
    let response = await fetch(`${baseUrl}/users/` + params.userId, {
        method: 'GET',
        signal: signal,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + credentials.t
        }
    }); 
    return await response.json();
    } catch(err) {
        console.log(err)
    }
}

//update a user record
const update = async (params, credentials, user) => {
    try {
        let response = await fetch(`${baseUrl}/users/` + params.userId, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: JSON.stringify(user)
        });
        return await response.json();
    } catch(err) {
        console.log(err);
    }
}

//delete a user record
const remove = async (params, credentials) => {
    try {
        let response = await fetch(`${baseUrl}/users/` + params.userId, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            }
        });
        return await response.json()
    } catch(err) {
        console.log(err)
    }
}
   
export { create, list, read, update, remove };