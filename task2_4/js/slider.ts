export default class Slider {
    private rangeElement: HTMLInputElement;
    private valueElement: HTMLElement;
    private options: { min: number; max: number; cur: number };

    constructor(rangeElement: HTMLInputElement, valueElement: HTMLElement, options: { min: number; max: number; cur: number }) {
        this.rangeElement = rangeElement;
        this.valueElement = valueElement;
        this.options = options;

        this.rangeElement.addEventListener('input', this.updateSlider.bind(this));
    }

    init(): void {
        this.rangeElement.setAttribute('min', this.options.min.toString());
        this.rangeElement.setAttribute('max', this.options.max.toString());
        this.rangeElement.value = this.options.cur.toString();

        this.updateSlider();
    }

    private asMoney(value: string): string {
        return '$' + parseFloat(value)
            .toLocaleString('en-US', { maximumFractionDigits: 2 });
    }

    private generateBackground(): string | undefined {
        if (this.rangeElement.value === this.options.min.toString()) {
            return undefined;
        }

        const percentage = (parseInt(this.rangeElement.value) - this.options.min) / (this.options.max - this.options.min) * 100;
        return `background: linear-gradient(to right, #18ffff, #7a00ff ${percentage}%, #d3edff ${percentage}%, #dee1e2 100%)`;
    }

    private updateSlider(): void {
        this.valueElement.innerHTML = this.asMoney(this.rangeElement.value);
        const backgroundStyle = this.generateBackground();
        if (backgroundStyle) {
            this.rangeElement.style.cssText = backgroundStyle;
        }
    }
}
