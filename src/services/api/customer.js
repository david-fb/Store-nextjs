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

module.exports = { addCustomer };