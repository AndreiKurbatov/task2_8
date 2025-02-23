"use strict";
class BagManager {
    static addToBag(price) {
        this.totalPrice += price;
    }
    static removeFromBag(price) {
        this.totalPrice = Math.max(0, this.totalPrice - price);
    }
    static getTotalPrice() {
        return this.totalPrice;
    }
}
BagManager.totalPrice = 0;
