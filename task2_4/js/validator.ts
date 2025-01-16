export default class Validator {

    isName(value: string): boolean {
        const nameRegex = /^[a-zA-ZÀ-ÿ\s]+$/;
        return nameRegex.test(value);
    }

    isEmail(value: string): boolean {
        const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(value);
    }

    isAge(value: number): boolean {
        return Number.isInteger(value) && value > 0;
    }

    isRequired(value: string | number): boolean {
        return value !== null && value !== undefined && value.toString().trim().length > 0;
    }
}