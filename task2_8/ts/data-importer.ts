import { Wine } from "./wine.js";
import { wineData } from "./wine-data.js";

export async function importData(): Promise<Wine[]> {
    try {
        const response = wineData;/*
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        return await response.json();*/
        return response;
    } catch (error) {
        console.error("Error getting file with test data for wines:", error);
        return [];
    }
}

export async function getWineById(id: number): Promise<Wine | null> {
    try {
        const wines = await importData();
        return wines.find(wine => wine.id === id) || null;
    } catch (error) {
        console.error("Error getting wine by id", error);
        return null;
    }
}

export async function getWineByName(name: string): Promise<Wine[]> {
    try {
        const wines = await importData();
        return wines.filter(wine => wine.name.toLowerCase() === name.toLowerCase());
    } catch (error) {
        console.error("Error getting wine by name", error);
        return [];
    }
}

export async function getWineByType(type: number): Promise<Wine[]> {
    try {
        const wines = await importData();
        return wines.filter(wine => wine.type === type);
    } catch (error) {
        console.error("Error getting wine by type", error);
        return [];
    }
}

export async function getWineByPrice(price: number): Promise<Wine[]> {
    try {
        const wines = await importData();
        return wines.filter(wine => wine.price <= price);
    } catch (error) {
        console.error("Error getting wine by price", error);
        return [];
    }
}

export async function getWineByPriceAndType(type: number, price: number): Promise<Wine[]> {
    try {
        const wines = await importData();
        return wines.filter(wine => wine.price <= price && wine.type === type);
    } catch (error) {
        console.error("Error getting wine by price", error);
        return [];
    }
}