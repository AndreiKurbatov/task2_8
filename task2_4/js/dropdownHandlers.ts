export function initializeDropdowns(): void {
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
}
