/*
* I’ll say right away that this is not a mandatory feature.
I imported only the ccn3 field for each country just to later,
as the user scrolls the page, import the full country object,
which is heavier as it contains many fields,
including particularly heavy ones like the flag image.
In this way, I tested a method to optimize data loading on the page
*/

export async function getAllCountriesCcn3() : Promise<string[]> {
    const url : string = "https://restcountries.com/v3.1/all?fields=ccn3";
    try {
        const response: Response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json : any[] = await response.json();
        const ccn3Codes : string[] = json
            .filter(item => item.ccn3 !== undefined)
            .map(item => item.ccn3);
        return ccn3Codes;
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Error: ${error.message}`);
        } else {
            console.error("Error: unknown error - ", error);
        }
        return [];
    }
}

export async function getAllCountries(ccn3 : string[]) : Promise<any[]> {
    const codesParam = ccn3.join(",");
    const url = `https://restcountries.com/v3.1/alpha?codes=${codesParam}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json : any[] = await response.json();
        return json;
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Error: ${error.message}`)
        } else {
            console.error("Error: unknown error - ", error);
        }
        return [];
    }
}

export async function getCountryByName(name : string) : Promise<any[]> {
    const url = `https://restcountries.com/v3.1/name/${name}?fullText=true`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`)
        }
        const json : any[] = await response.json();
        return json;
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Error: ${error.message}`);
        } else {
            console.error("Error: unknown error - ", error);
        }
        return [];
    }
}

export async function getAllCountriesByRegion(region : string) : Promise<any[]> {
    const url = `https://restcountries.com/v3.1/region/${region}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json : any[] = await response.json();
        return json;
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Error: ${error.message}`)
        } else {
            console.error("Error: unknown error - ", error);
        }
        return [];
    }
}

