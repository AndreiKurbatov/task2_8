import Slider from './slider.js';
import Validator from './validator.js';
import { addValidation, handleFormValidation } from './formHandlers.js';
import { initializeDropdowns } from './dropdownHandlers.js';

const rangeElement = document.querySelector<HTMLInputElement>('.range [type="range"]');
const valueElement = document.querySelector<HTMLElement>('.range .range-value span');

const options = {
    min: 2000,
    max: 75000,
    cur: 37500,
};

if (rangeElement && valueElement) {
    const slider = new Slider(rangeElement, valueElement, options);
    slider.init();
}

initializeDropdowns();

const validator = new Validator();

addValidation('firstName', validator);
addValidation('lastName', validator);
addValidation('email', validator);
addValidation('age', validator);

handleFormValidation('.main-form-container', '.main-submit-button', validator);
