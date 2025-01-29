import { setupListeners } from "./task-options.js";

function generateTasks(): void {
    const availableTasks = localStorage.getItem('availableTasks')
    try {
        if (availableTasks) {
            const tasksArray = JSON.parse(availableTasks);
            const toDoPage = document.querySelector<HTMLElement>(".to-do-page");
            let taskNodes = '';
            for (const taskId of tasksArray) {
                const taskStr = localStorage.getItem(taskId) || '';
                if (taskStr) {
                    const task: Task = JSON.parse(taskStr);
                    taskNodes += `
                    <div class="task-container">
                        <div class="checkbox-wrapper-19">
                            <input class="cbtest-19" type="checkbox" id="cbtest-${task.id}" ${task.isDone ? 'checked="checked"' : ''}/>
                            <label for="cbtest-${task.id}" class="check-box">
                        </div>
                        <div class="task-content">${task.content}</div>
                        <div class="available-tools">
                            <img class="available-tool-icon" src="images/check-symbol.png" alt="check symbol">
                            <img class="available-tool-icon" src="images/underline-button.png" alt="underline button">
                            <img class="available-tool-icon" src="images/rubbish-bin-delete-button.png" alt="rubbish bin delete button">
                        </div>
                    </div>
                    `;
                }
            }
            if (toDoPage) {
                toDoPage.insertAdjacentHTML('beforeend', taskNodes)
                setupListeners();
            }
        }
    } catch (Error) {
        console.error("Error generating a task");
    }
}

generateTasks();
