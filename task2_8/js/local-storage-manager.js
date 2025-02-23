export class LocalStorageUtils {
    static addItemToUserBag(id) {
        let bag = JSON.parse(localStorage.getItem(this.userBagKey) || "[]");
        let quantities = JSON.parse(localStorage.getItem(this.userBagQuantityKey) || "{}");
        if (!bag.includes(id)) {
            bag.push(id);
            localStorage.setItem(this.userBagKey, JSON.stringify(bag));
        }
        quantities[id] = (quantities[id] || 0) + 1;
        localStorage.setItem(this.userBagKey, JSON.stringify(bag));
        localStorage.setItem(this.userBagQuantityKey, JSON.stringify(quantities));
    }
    static removeItemFromUserBag(id) {
        let bag = JSON.parse(localStorage.getItem(this.userBagKey) || "[]");
        let quantities = JSON.parse(localStorage.getItem(this.userBagQuantityKey) || "{}");
        if (quantities[id] && quantities[id] > 1) {
            quantities[id] -= 1;
        }
        else {
            bag = bag.filter(item => item !== id);
            delete quantities[id];
        }
        localStorage.setItem(this.userBagKey, JSON.stringify(bag));
        localStorage.setItem(this.userBagQuantityKey, JSON.stringify(quantities));
    }
    static getUserBagContent() {
        return JSON.parse(localStorage.getItem(this.userBagKey) || "[]");
    }
    static getUserBagQuantities() {
        return JSON.parse(localStorage.getItem(this.userBagQuantityKey) || "{}");
    }
}
LocalStorageUtils.userBagKey = "userBagContent";
LocalStorageUtils.userBagQuantityKey = "userBagQuantity";
