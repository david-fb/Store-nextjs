import axios from "axios";
import endPoints from "@services/api";

const config = {
    headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
    },
};

const sendRecoveryMail = async (body) => {
    try {
        const response = await axios.post(endPoints.auth.recoveryPassword, body, config);
        return response.status;
    } catch (error) {
        console.error(error);
    }
}

module.exports = { sendRecoveryMail };