import Slider from './slider.js';
import Validator from './validator.js';

document.querySelectorAll<HTMLElement>('.income-source-dropdown-el').forEach(item => {
    item.addEventListener('click', function (e: MouseEvent) {
        e.preventDefault();
        e.stopPropagation();
        this.classList.toggle('expanded');

        const target = e.target as HTMLElement;
        const forAttribute = target.getAttribute('for');

        if (forAttribute) {
            const checkbox = document.getElementById(forAttribute) as HTMLInputElement;
            if (checkbox) {
                checkbox.checked = true;
            }
        }
    });
});

document.addEventListener('click', function () {
    document.querySelectorAll<HTMLElement>('.income-source-dropdown-el').forEach(item => {
        item.classList.remove('expanded');
    });
});

const rangeElement = document.querySelector<HTMLInputElement>('.range [type="range"]');
const valueElement = document.querySelector<HTMLElement>('.range .range-value span');

const options = {
    min: 2000,
    max: 75000,
    cur: 37500
};

if (rangeElement && valueElement) {
    const slider = new Slider(rangeElement, valueElement, options);
    slider.init();
}

const btn = document.querySelector<HTMLButtonElement>("button");
if (btn) {
    btn.addEventListener("click", () => {
        btn.classList.toggle("is_active");
    });
}

const validator = new Validator();

function addValidation(inputId: string, labelFor: string) {
    const inputElement = document.querySelector<HTMLInputElement>(`#${inputId}`);
    const labelElement = document.querySelector<HTMLLabelElement>(`label[for="${labelFor}"]`);

    if (inputElement && labelElement) {
        inputElement.addEventListener('blur', () => {
            const content = inputElement.value.trim();

            if (!validator.isRequired(content) || !validator.isName(content)) {
                labelElement.classList.add('is-required-field');
                inputElement.classList.add('is-required-field');
            }
        });

        inputElement.addEventListener('focus', () => {
            labelElement.classList.remove('is-required-field');
            inputElement.classList.remove('is-required-field');
        });
    }
}

addValidation('firstName', 'firstName');
addValidation('lastName', 'lastName');

const emailInput = document.querySelector<HTMLInputElement>('#email');
const emailLabel = document.querySelector<HTMLLabelElement>('label[for="email"]');
if (emailInput && emailLabel) {
    emailInput.addEventListener('blur', () => {
        const content = emailInput.value.trim();

        if (!validator.isRequired(content) || !validator.isEmail(content)) {
            emailLabel.classList.add('is-required-field');
            emailInput.classList.add('is-required-field');
        }
    });

    emailInput.addEventListener('focus', () => {
        emailLabel.classList.remove('is-required-field');
        emailInput.classList.remove('is-required-field');
    });
}

const ageInput = document.querySelector<HTMLInputElement>('#age');
const ageLabel = document.querySelector<HTMLLabelElement>('label[for="age"]');
if (ageInput && ageLabel) {
    ageInput.addEventListener('blur', () => {
        const content = Number(ageInput.value.trim());

        if (!validator.isRequired(content) || !validator.isAge(content)) {
            ageLabel.classList.add('is-required-field');
            ageInput.classList.add('is-required-field');
        }
    });

    ageInput.addEventListener('focus', () => {
        ageLabel.classList.remove('is-required-field');
        ageInput.classList.remove('is-required-field');
    });
}

const form = document.querySelector<HTMLFormElement>('.main-form-container');
const submitButton = document.querySelector<HTMLButtonElement>('.main-submit-button');

if (submitButton != null && form != null) {
    submitButton.disabled = true;

    function validateForm(): boolean {
        let isValid = true;

        const inputs = form!.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
            'input, textarea'
        );

        inputs.forEach(input => {
            const content = input.value.trim();
            const inputType = input.type;

            if (inputType === 'text' && !validator.isName(content)) {
                isValid = false;
            } else if (inputType === 'email' && !validator.isEmail(content)) {
                isValid = false;
            } else if (inputType === 'number' && !validator.isAge(Number(content))) {
                isValid = false;
            } else if (!validator.isRequired(content)) {
                isValid = false;
            }
        });

        return isValid;
    }

    function updateSubmitButtonState(): void {
        if (validateForm()) {
            submitButton!.disabled = false;
        } else {
            submitButton!.disabled = true;
        }
    }

    form.addEventListener('input', () => {
        updateSubmitButtonState();
    });

    form.addEventListener('blur', () => {
        updateSubmitButtonState();
    }, true);
}

