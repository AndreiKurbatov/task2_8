export function addAvailableTask(id: string): void {
    const availableTasks = localStorage.getItem('availableTasks')
    try {
        if (availableTasks === null) {
            localStorage.setItem("availableTasks", JSON.stringify([id]));
        } else {
            const array = JSON.parse(availableTasks);
            array.unshift(id);
            localStorage.setItem("availableTasks", JSON.stringify(array));
        }
    } catch (Error) {
        console.error("Error adding a new task");
    }
}

export function removeAvailableTask(id: string): void {
    const availableTasks = localStorage.getItem('availableTasks')
    try {
        if (availableTasks) {
            const array = JSON.parse(availableTasks);
            const newArray = array.filter((item: string) => item !== id);
            localStorage.setItem("availableTasks", JSON.stringify(newArray));
        }
    } catch (Error) {
        console.error("Error removing a task");
    }
}

export function getNextTaskIndex(): number | null {
    let availableTasks = localStorage.getItem('availableTasks');
    try {
        if (availableTasks === null) {
            return 0;
        } else {
            const array = JSON.parse(availableTasks);
            const lastTaskIndex = Number(array[0]) + 1;
            return lastTaskIndex;
        }
    } catch (error) {
        console.error("Error getting last task index");
    }
    return null;
}
