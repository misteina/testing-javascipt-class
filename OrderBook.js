let orders = [];

function OrderBook(){
    this.addOpenOrder = function(side , price){
        let order = {};
        let orderId = orders.length + 1;
        order.orderId = orderId;
        order.side = side;
        order.price = price;
        orders.push(order);
        return orderId;
    }
    this.deleteOpenOrder = function(orderId){
        for (var i = 0; i < orders.length;i++){
            if (orders[i].orderId === orderId){
                orders.splice(i, 1);
            }
        }
    }
    this.bestOpenOrder = function(side){
        let price = 0;
        let bestOpenOrder = null;
        if (side === 'buy'){
            for (order of orders){
                if (order.price > price){
                    bestOpenOrder = order;
                } 
            }
        } else {

        }
    }
    this.executeBestOpenOrder = function(side){

    }
}