import { getAllCountriesCcn3, getAllCountries, getCountryByName } from "./country-manager.js";
async function addCountriesToInterface(action, actionParameter) {
    let ccn3Counter = 0;
    const allCcn3 = await getAllCountriesCcn3();
    const sentinel = document.getElementById('sentinel');
    if (sentinel) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    (async () => {
                        let countries;
                        switch (action.name) {
                            case 'getAllCountries':
                                const ccn3Slice = allCcn3.slice(ccn3Counter, ccn3Counter + 20);
                                ccn3Counter += 20;
                                countries = await action(ccn3Slice);
                                break;
                            case 'getCountryByName':
                                countries = await action(actionParameter);
                                break;
                            case 'getAllCountriesByRegion':
                                countries = await action(actionParameter);
                                break;
                            default:
                                console.error(`The function with the name ${action.name} was not found`);
                        }
                        let content = generateCountryContent(countries);
                        sentinel.insertAdjacentHTML('beforebegin', content);
                    })();
                }
            });
        }, {
            root: null,
            rootMargin: '200px',
            threshold: 0
        });
        observer.observe(sentinel);
    }
    else {
        console.error("The countries-list or the sentinel node were not found");
    }
}
function generateCountryContent(countries) {
    let content = "";
    for (const country of countries) {
        content += `
        <div class="country-container">
            <img class="flag" src=${country.flags.svg} alt="country flag">
            <div class="country-name">${country.name.common}</div>
            <div class="country-info-container">
                <div class="country-info">
                    <span class="population-header">Population: </span><span class="population-content">${country.population}</span>
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
export async function populateWithCountries() {
    document.addEventListener("DOMContentLoaded", () => {
        const countries = document.querySelectorAll(".country-container");
        countries.forEach(country => country.remove());
        addCountriesToInterface(getAllCountries);
    });
    const form = document.getElementById("search-form");
    const searchInput = document.getElementById("search");
    form.addEventListener("submit", (event) => {
        const countries = document.querySelectorAll(".country-container");
        countries.forEach(country => country.remove());
        event.preventDefault();
        const searchValue = searchInput.value.trim();
        addCountriesToInterface(getCountryByName, searchValue);
    });
}
