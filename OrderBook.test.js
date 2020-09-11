const OrderBook = require('./OrderBook');
const orders = require('./datastore');

const book = new OrderBook(orders);

describe('Testing addOpenOrder() method', () => {
    let id = orders[orders.length - 1].orderId + 1;

    test('Add open order', () => {
        expect(book.addOpenOrder('BUY', 300)).not.toBeNaN();
    });

    test('Check order is saved to datastore', () => {
        expect(orders[orders.length - 1]).toHaveProperty('orderId', id);
    });

    test('Reject add open order with invalid parameters', () => {
        expect(() => book.addOpenOrder('SOLD', -10)).toThrow();
    });
});

describe('Testing deleteOpenOrder() method', () => {
    test('Delete open order', () => {
        expect(book.deleteOpenOrder(3)).toBeTruthy();
    });

    test('Delete non-existing open order', () => {
        expect(book.deleteOpenOrder(100)).toBeUndefined();
    });

    test('Reject delete open order with invalid order id', () => {
        expect(() => book.deleteOpenOrder('orderId')).toThrow();
    });
});

describe('Testing bestOpenOrder() method', () => {
    test('Best open order on BUY side', () => {
        let orderItem = book.bestOpenOrder('BUY');
        let price = 0.00;
        for (order of orders) {
            if (order.side === 'BUY' && (order.price > price || order.price === price)) {
                price = order.price;
            }
        }
        expect(orderItem.price).toBe(price);
    });

    test('Best open order on SELL side', () => {
        let orderItem = book.bestOpenOrder('SELL');
        let price = Number.MAX_SAFE_INTEGER;
        for (order of orders) {
            if (order.side === 'SELL' && (order.price < price || order.price === price)) {
                price = order.price;
            }
        }
        expect(orderItem.price).toBe(price);
    });

    test('Reject best open order with invalid side parameter', () => {
        expect(() => book.bestOpenOrder('SOLD')).toThrow();
    });
});

describe('Testing executeBestOpenOrder() method', () => {
    test('Execute best Open order on BUY side', () => {
        expect(book.executeBestOpenOrder('BUY')).toHaveProperty('side', 'BUY');
    });

    test('Execute best Open order on SELL side', () => {
        expect(book.executeBestOpenOrder('SELL')).toHaveProperty('side', 'SELL');
    });

    test('Reject execute best Open order with invalid parameters', () => {
        expect(() => book.executeBestOpenOrder('SOLD')).toThrow();
    });
});