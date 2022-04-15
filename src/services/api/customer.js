import axios from "axios";
import endPoints from "@services/api";

const config = {
    headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
    },
};

const addCustomer = async(body) => {
    const response = await axios.post(endPoints.users.addCustomers, body, config);
    return response.data;
}

const updateCustomer = async(id, body, token) => {
    config.headers.authorization = `Bearer ${token}`;
    const response = await axios.patch(endPoints.users.updateCustomer(id), body, config);
    return response.data;
}

module.exports = { addCustomer, updateCustomer };