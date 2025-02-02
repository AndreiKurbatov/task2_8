export async function getAllCountriesCcn3() {
    const url = "https://restcountries.com/v3.1/all?fields=ccn3";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        const ccn3Codes = json
            .filter(item => item.ccn3 !== undefined)
            .map(item => item.ccn3);
        return ccn3Codes;
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(`Error: ${error.message}`);
        }
        else {
            console.error("Error: unknown error - ", error);
        }
        return [];
    }
}
export async function getAllCountries(ccn3) {
    const codesParam = ccn3.join(",");
    const url = `https://restcountries.com/v3.1/alpha?codes=${codesParam}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        return json;
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(`Error: ${error.message}`);
        }
        else {
            console.error("Error: unknown error - ", error);
        }
        return [];
    }
}
export async function getCountryByName(name) {
    const url = `https://restcountries.com/v3.1/name/${name}?fullText=true`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        return json;
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(`Error: ${error.message}`);
        }
        else {
            console.error("Error: unknown error - ", error);
        }
        return [];
    }
}
export async function getAllCountriesByRegion(region) {
    const url = `https://restcountries.com/v3.1/region/${region}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        return json;
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(`Error: ${error.message}`);
        }
        else {
            console.error("Error: unknown error - ", error);
        }
        return [];
    }
}
