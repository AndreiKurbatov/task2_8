class BagManager {
    private static totalPrice: number = 0;

    static addToBag(price: number): void {
        this.totalPrice += price;
    }

    static removeFromBag(price: number): void {
        this.totalPrice = Math.max(0, this.totalPrice - price);
    }

    static getTotalPrice(): number {
        return this.totalPrice;
    }
}
