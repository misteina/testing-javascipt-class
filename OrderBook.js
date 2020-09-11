"use strict";

class OrderBook {
    constructor (orders){
        this.orders = orders;
    }

    addOpenOrder(side , price){
        if (side !== 'BUY' && side !== 'SELL'){
            throw 'Invalid side parameter';
        }
        if (!Number.isInteger(price) || price < 0){
            throw 'Invalid side parameter';
        }

        let order = {};
        let orderId = this.orders[this.orders.length - 1].orderId + 1;
        order.orderId = orderId;
        order.side = side;
        order.price = price;
        // write to datastore
        this.orders.push(order);

        return orderId;
    }

    deleteOpenOrder(orderId){
        if (!Number.isInteger(orderId) || orderId < 0){
            throw 'Invalid side parameter';
        }
        let status = undefined;
        for (var i = 0; i < this.orders.length;i++){
            if (this.orders[i].orderId === orderId){
                // delete from datastore
                this.orders.splice(i, 1);
                status = true
            }
        }
        return status;
    }

    bestOpenOrder(side){
        if (side !== 'BUY' && side !== 'SELL') {
            throw 'Invalid side parameter';
        }
        let bestOpenOrder = null;
        let price = (side === 'BUY') ? 0.00 : Number.MAX_SAFE_INTEGER;
        let order;
        for (order of this.orders) {  
            if (side === 'BUY') {
                if (order.side === 'BUY' && (order.price > price || order.price === price)) {
                    price = order.price;
                    bestOpenOrder = {...order};
                }
            } else {
                if (order.side === 'SELL' && (order.price < price || order.price === price)) {
                    price = order.price;
                    bestOpenOrder = {...order};
                }
            }
        }
        return bestOpenOrder;
    }

    executeBestOpenOrder(side){
        if (side !== 'BUY' && side !== 'SELL') {
            throw 'Invalid side parameter';
        }
        let bestOpenOrder = this.bestOpenOrder(side);
        this.deleteOpenOrder(bestOpenOrder.orderId);
        return bestOpenOrder;
    }
}

module.exports = OrderBook;