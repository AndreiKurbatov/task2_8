export function addAvailableTask(id : string) : void {
    const availableTasks = localStorage.getItem('availableTasks')
    if (availableTasks ===  null) {
        localStorage.setItem("availableTasks", JSON.stringify([id]));
    } else {
        const array = JSON.parse(availableTasks);
        array.unshift(id);
        localStorage.setItem("availableTasks", JSON.stringify(array));
    }
}

export function removeAvailableTask(id : string) : void {
    const availableTasks = localStorage.getItem('availableTasks')
    if (availableTasks) {
        const array = JSON.parse(availableTasks);
        const newArray = array.filter((item: string) => item !== id);
        localStorage.setItem("availableTasks", JSON.stringify(newArray));
    }
}

export function getLastTaskIndex() : string {
    let availableTasks = localStorage.getItem('availableTasks');
    if (availableTasks ===  null) {
        localStorage.setItem("availableTasks", JSON.stringify([0]));
        availableTasks = localStorage.getItem('availableTasks') || '';
    }
    try {
        const array = JSON.parse(availableTasks);
        const lastTaskIndex = array[0];
        return lastTaskIndex;
    } catch (error) {}
    return '';
}