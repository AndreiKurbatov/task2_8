import { getAllCountriesCcn3, getAllCountries, getCountryByName, getAllCountriesByRegion } from "./country-manager.js"

let observer: IntersectionObserver | undefined;

async function renderCountries(action: any, actionParameter?: string) {
    let ccn3Counter = 0;
    const allCcn3 = await getAllCountriesCcn3();
    const sentinel = document.getElementById('sentinel') as HTMLElement;

    if (sentinel) {
        switch (action.name) {
            case 'getAllCountries':
                observer = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            (async () => {
                                const ccn3Slice = allCcn3.slice(ccn3Counter, ccn3Counter + 20);
                                ccn3Counter += 20;
                                const countries = await action(ccn3Slice);
                                let content = generateCountryContent(countries);
                                sentinel.insertAdjacentHTML('beforebegin', content);
                            })();
                        }
                    })
                }, {
                    root: null,
                    rootMargin: '200px',
                    threshold: 0
                });
                observer.observe(sentinel);
                break;
            case 'getCountryByName':
            case 'getAllCountriesByRegion':
                let countries = await action(actionParameter);
                let content = generateCountryContent(countries);
                sentinel.insertAdjacentHTML('beforebegin', content);
                break;
            default:
                console.error(`The function with the name ${action.name} was not found`);
        }
    } else {
        console.error("The countries-list or the sentinel node were not found");
    }
}

function generateCountryContent(countries: any[]): string {
    let content = "";
    for (const country of countries) {
        const population : string = country.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        content += `
        <div class="country-container">
            <img class="flag" src=${country.flags.svg} alt="country flag">
            <div class="country-name">${country.name.common}</div>
            <div class="country-info-container">
                <div class="country-info">
                    <span class="population-header">Population: </span><span class="population-content">${population}</span>
                </div>
                <div class="country-info">
                    <span class="population-header">Region: </span><span class="population-content">${country.region}</span>
                </div>
                <div class="country-info">
                    <span class="population-header">Capital: </span><span class="population-content">${country.capital}</span>
                </div>
            </div>
        </div>
    `;
    }
    return content;
}

export async function populateWithCountries(): Promise<void> {

    document.addEventListener("DOMContentLoaded", () => {
        const countries = document.querySelectorAll(".country-container");
        countries.forEach(country => country.remove());
        renderCountries(getAllCountries);
    })

    const form = document.getElementById("search-form") as HTMLFormElement;
    const searchInput = document.getElementById("search") as HTMLInputElement;

    form.addEventListener("submit", (event) => {
        const sentinel = document.getElementById('sentinel') as HTMLElement;
        if (observer) {
            observer.unobserve(sentinel);
        }
        const countries = document.querySelectorAll(".country-container");
        countries.forEach(country => country.remove());
        event.preventDefault();
        const searchValue = searchInput.value.trim();
        renderCountries(getCountryByName, searchValue);
    })

    const regionInputs = document.querySelectorAll<HTMLInputElement>(".select-box__input");
    regionInputs.forEach(input => {
        input.addEventListener('change', (event) => {
            const sentinel = document.getElementById('sentinel') as HTMLElement;
            if (observer) {
                observer.unobserve(sentinel);
            }
            const countries = document.querySelectorAll(".country-container");
            countries.forEach(country => country.remove());
            const target = event.target as HTMLInputElement;
            if (target && target.nextElementSibling) {
                const selectedValue = target.nextElementSibling.textContent?.trim().toLowerCase();
                if (selectedValue === 'all') {
                    const countries = document.querySelectorAll(".country-container");
                    countries.forEach(country => country.remove());
                    renderCountries(getAllCountries);
                } else {
                    renderCountries(getAllCountriesByRegion, selectedValue);
                }
            }
        })
    });

}