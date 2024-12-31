export default class ColorGenerator {

    public generateColor(): string {
        const randomValue = Math.floor(Math.random() * 0xFFFFFF);
        const hex = randomValue.toString(16).padStart(6, '0');
        return `#${hex}`;
    }

}