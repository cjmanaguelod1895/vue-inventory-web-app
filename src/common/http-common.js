import axios from "axios";

// let currentUserString = window.localStorage.currentUser;
// let currentUser = currentUserString ? JSON.parse(currentUserString) : '';

// export default axios.create({
//     baseURL: "https://localhost:44332/HRIS-API",
//     headers: {
//         "Content-type": "application/json",
//         Authorization: "Bearer Token " + currentUser.token
//     }
// });


export default () => {
    let currentUserString = window.localStorage.currentUser;
    let currentUser = currentUserString ? JSON.parse(currentUserString) : '';
    return axios.create({
        baseURL: 'https://localhost:44332/HRIS-API',
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer Token " + currentUser.token
        }
    });
}