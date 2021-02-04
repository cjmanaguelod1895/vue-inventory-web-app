import axios from "axios";
export default () => {
    let currentUserString = window.localStorage.currentUser;
    let currentUser = currentUserString ? JSON.parse(currentUserString) : '';
    return axios.create({
        baseURL: 'https://localhost:44317/Inventory',
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer Token " + currentUser.token
        }
    });
}