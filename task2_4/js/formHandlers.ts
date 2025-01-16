import Validator from './validator.js';

export function addValidation(value : string, validator: Validator): void {
    const inputElement = document.querySelector<HTMLInputElement>(`#${value}`);
    const labelElement = document.querySelector<HTMLLabelElement>(`label[for="${value}"]`);

    if (inputElement && labelElement) {
        inputElement.addEventListener('blur', () => {
            const content = inputElement.value.trim();

            const type = inputElement.type;
            if (type === 'email') {
                if (!validator.isRequired(content) || !validator.isEmail(content)) {
                    labelElement.classList.add('is-required-field');
                    inputElement.classList.add('is-required-field');
                }
            } else if (type === 'text') {
                if (!validator.isRequired(content) || !validator.isName(content)) {
                    labelElement.classList.add('is-required-field');
                    inputElement.classList.add('is-required-field');
                }
            } else if (type === 'number') {
                if (!validator.isRequired(content) || !validator.isAge(Number(content))) {
                    labelElement.classList.add('is-required-field');
                    inputElement.classList.add('is-required-field');
                }
            }
        });

        inputElement.addEventListener('focus', () => {
            labelElement.classList.remove('is-required-field');
            inputElement.classList.remove('is-required-field');
        });
    }
}

export function handleFormValidation(formSelector: string, submitButtonSelector: string, validator: Validator): void {
    const form = document.querySelector<HTMLFormElement>(formSelector);
    const submitButton = document.querySelector<HTMLButtonElement>(submitButtonSelector);

    if (!form || !submitButton) return;

    submitButton.disabled = true;

    function validateForm(): boolean {
        let isValid = true;

        const inputs = form!.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input, textarea');

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
        submitButton!.disabled = !validateForm();
    }

    form.addEventListener('input', updateSubmitButtonState);
    form.addEventListener('blur', updateSubmitButtonState, true);
}
