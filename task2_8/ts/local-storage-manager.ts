export class LocalStorageUtils {
    private static userBagKey: string = "userBagContent";
    private static userBagQuantityKey: string = "userBagQuantity";

    static addItemToUserBag(id: number): void {
        let bag: number[] = JSON.parse(localStorage.getItem(this.userBagKey) || "[]");
        let quantities: Record<number, number> = JSON.parse(localStorage.getItem(this.userBagQuantityKey) || "{}");

        if (!bag.includes(id)) {
            bag.push(id);
            localStorage.setItem(this.userBagKey, JSON.stringify(bag));
        }
        quantities[id] = (quantities[id] || 0) + 1;

        localStorage.setItem(this.userBagKey, JSON.stringify(bag));
        localStorage.setItem(this.userBagQuantityKey, JSON.stringify(quantities));

    }

    static removeItemFromUserBag(id: number): void {
        let bag: number[] = JSON.parse(localStorage.getItem(this.userBagKey) || "[]");
        let quantities: Record<number, number> = JSON.parse(localStorage.getItem(this.userBagQuantityKey) || "{}");

        if (quantities[id] && quantities[id] > 1) {
            quantities[id] -= 1;
        } else {
            bag = bag.filter(item => item !== id);
            delete quantities[id];
        }

        localStorage.setItem(this.userBagKey, JSON.stringify(bag));
        localStorage.setItem(this.userBagQuantityKey, JSON.stringify(quantities));
    }

    static getUserBagContent(): number[] {
        return JSON.parse(localStorage.getItem(this.userBagKey) || "[]");
    }

    static getUserBagQuantities(): Record<number, number> {
        return JSON.parse(localStorage.getItem(this.userBagQuantityKey) || "{}");
    }

}