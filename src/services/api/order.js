import axios from "axios";
import endPoints from "@services/api";

const config = {
    headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
    },
};

const addOrder = async (items, token) => {
    config.headers.authorization = `Bearer ${token}`;
    const status = { state: "paid" };
    if(items && items?.length > 0){
        try {
            const { data:order } = await axios.post(endPoints.orders.placeOrder, status, config);
            items.map( async (item) => {
                const data = {
                    orderId: order.id,
                    productId: item.id,
                    amount: 1
                }
                await axios.post(endPoints.orders.addItem, data);
            });
        
        return true;
            
        } catch (error) {
            console.log(error);
        }
    }
    return false;
};

const getOrder = async (orderId) => {
    try {
        const { data } = await axios.get(endPoints.orders.getOrder(orderId));
        return data;
    } catch (error) {
        console.log(error);
    }
}

const getAllOrders = async (token) => {
    config.headers.authorization = `Bearer ${token}`;
    try {
        const { data: orders } = await axios.get(endPoints.orders.getOrders, config);
        return orders;
    } catch (error) {
        console.log(error);
    }
}

module.exports = { addOrder, getOrder, getAllOrders };