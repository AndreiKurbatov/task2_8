export async function importData() {
    try {
        const response = await fetch("../test-data/Wine_Test_Data.json");
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        return await response.json();
    }
    catch (error) {
        console.error("Error getting file with test data for wines:", error);
        return [];
    }
}
export async function getWineById(id) {
    try {
        const wines = await importData();
        return wines.find(wine => wine.id === id) || null;
    }
    catch (error) {
        console.error("Error getting wine by id", error);
        return null;
    }
}
export async function getWineByName(name) {
    try {
        const wines = await importData();
        return wines.filter(wine => wine.name.toLowerCase() === name.toLowerCase());
    }
    catch (error) {
        console.error("Error getting wine by name", error);
        return [];
    }
}
export async function getWineByType(type) {
    try {
        const wines = await importData();
        return wines.filter(wine => wine.type === type);
    }
    catch (error) {
        console.error("Error getting wine by type", error);
        return [];
    }
}
export async function getWineByPrice(price) {
    try {
        const wines = await importData();
        return wines.filter(wine => wine.price <= price);
    }
    catch (error) {
        console.error("Error getting wine by price", error);
        return [];
    }
}
export async function getWineByPriceAndType(type, price) {
    try {
        const wines = await importData();
        return wines.filter(wine => wine.price <= price && wine.type === type);
    }
    catch (error) {
        console.error("Error getting wine by price", error);
        return [];
    }
}
