import { addAvailableTask, removeAvailableTask, getLastTaskIndex } from "./task-info-manager.js";

export function addFunctionality(): void {

    document.querySelectorAll<HTMLInputElement>(".cbtest-19").forEach(checkbox => {
        checkbox.addEventListener('change', (event: Event) => {
            const target = event.target as HTMLInputElement;
            const taskContainer = target.closest('.task-container') as HTMLElement;
            const taskContentTextarea = taskContainer.querySelector('.task-content-textarea') as HTMLTextAreaElement;

            if (taskContentTextarea) {
                const div = document.createElement('div');
                div.textContent = taskContentTextarea.value || '';
                taskContentTextarea.replaceWith(div);
                div.classList.add("task-content");
            }

            if (taskContainer) {
                const availableTools = taskContainer.querySelector('.available-tools') as HTMLElement;

                if (target.checked && availableTools) {
                    (availableTools.children[0] as HTMLElement).style.display = 'none';
                    (availableTools.children[1] as HTMLElement).style.display = 'none';
                    (availableTools.children[2] as HTMLElement).style.display = 'block';
                    try {
                        const checkbox = taskContainer.querySelector<HTMLInputElement>(".cbtest-19");
                        if (checkbox) {
                            const id = checkbox.id.split('-')[1];
                            const task: Task = JSON.parse(localStorage.getItem(id) || '');
                            task.isDone = true;
                            localStorage.setItem(id, JSON.stringify(task));
                        }
                    } catch (error) { }
                } else if (!target.checked && availableTools) {
                    (availableTools.children[0] as HTMLElement).style.display = '';
                    (availableTools.children[1] as HTMLElement).style.display = '';
                    (availableTools.children[2] as HTMLElement).style.display = '';
                    try {
                        const checkbox = taskContainer.querySelector<HTMLInputElement>(".cbtest-19");
                        if (checkbox) {
                            const id = checkbox.id.split('-')[1];
                            const task: Task = JSON.parse(localStorage.getItem(id) || '');
                            task.isDone = false;
                            localStorage.setItem(id, JSON.stringify(task));
                        }
                    } catch (error) { }
                }
            }
        })
    })

    document.querySelectorAll<HTMLElement>(".task-container").forEach(container => {
        container.addEventListener('mouseenter', (event: Event) => {
            const target = event.target as HTMLElement;
            const cbtest = target.querySelector<HTMLInputElement>(".cbtest-19");
            const availableTools = target.querySelector<HTMLElement>('.available-tools');

            if (cbtest && cbtest.checked && availableTools) {
                (availableTools.children[0] as HTMLElement).style.display = 'none';
                (availableTools.children[1] as HTMLElement).style.display = 'none';
                (availableTools.children[2] as HTMLElement).style.display = 'block';
            }
        })
        container.addEventListener('mouseleave', (event: Event) => {
            const target = event.target as HTMLElement;
            const cbtest = target.querySelector<HTMLInputElement>(".cbtest-19");
            const availableTools = target.querySelector<HTMLElement>('.available-tools');

            if (cbtest && cbtest.checked && availableTools) {
                (availableTools.children[0] as HTMLElement).style.display = '';
                (availableTools.children[1] as HTMLElement).style.display = '';
                (availableTools.children[2] as HTMLElement).style.display = '';
            }
        })
    })

    document.querySelectorAll<HTMLElement>(".available-tools > .available-tool-icon:nth-child(3)").forEach(editButton => {
        editButton.addEventListener('click', (event: Event) => {
            const target = event.target as HTMLElement;
            const taskContainer = target.closest('.task-container') as HTMLElement;

            const checkbox = taskContainer.querySelector<HTMLInputElement>(".cbtest-19");
            if (checkbox) {
                const id = checkbox.id.split('-')[1];
                localStorage.removeItem(id);
                taskContainer.remove();
                removeAvailableTask(id);
            }
        });
    });

    document.querySelectorAll<HTMLElement>(".available-tools > .available-tool-icon:nth-child(2)").forEach(editButton => {
        editButton.addEventListener('click', (event: Event) => {
            const target = event.target as HTMLElement;
            const taskContainer = target.closest('.task-container') as HTMLElement;
            const taskContent = taskContainer.querySelector<HTMLElement>(".task-content");
            const textarea = document.createElement('textarea');

            if (taskContent) {
                textarea.value = taskContent.textContent || '';
                taskContent.replaceWith(textarea);
                textarea.classList.add("task-content-textarea");

                textarea.addEventListener("input", () => {
                    textarea.style.height = "auto";
                    textarea.style.height = `${textarea.scrollHeight}px`;
                });

                textarea.style.height = "auto";
                textarea.style.height = `${textarea.scrollHeight}px`;
            }
        });
    });

    document.querySelectorAll<HTMLElement>(".available-tools > .available-tool-icon:nth-child(1)").forEach(checkIcon => {
        checkIcon.addEventListener('click', (event: Event) => {
            const target = event.target as HTMLElement;
            const taskContainer = target.closest('.task-container') as HTMLElement;
            const taskContentTextarea = taskContainer.querySelector<HTMLTextAreaElement>(".task-content-textarea");
            const div = document.createElement('div');

            if (taskContentTextarea) {
                const value = taskContentTextarea.value || '';
                div.textContent = value;
                try {
                    const checkbox = taskContainer.querySelector<HTMLInputElement>(".cbtest-19");
                    if (checkbox) {
                        const id = checkbox.id.split('-')[1];
                        const task: Task = JSON.parse(localStorage.getItem(id) || '');
                        task.taskContent = value;
                        localStorage.setItem(id, JSON.stringify(task));
                    }
                } catch (error) { }
                taskContentTextarea.replaceWith(div);
                div.classList.add("task-content");
            }
        });
    });
}

const addButton = document.querySelector<HTMLElement>(".add-button")
const toDoPage = document.querySelector<HTMLElement>(".to-do-page");
const creationTextarea = document.getElementById("creation-textarea") as HTMLTextAreaElement;
if (addButton && toDoPage && creationTextarea) {
    addButton.addEventListener('click', (event: Event) => {
        if (creationTextarea) {
            const value = creationTextarea.value.trim() || '';
            let taskIndex = Number(getLastTaskIndex());
            taskIndex++;
            const newTask = `
            <div class="task-container">
                <div class="checkbox-wrapper-19">
                    <input class="cbtest-19" type="checkbox" id="cbtest-${taskIndex}" />
                    <label for="cbtest-${taskIndex}" class="check-box">
                </div>
                <div class="task-content">${value}</div>
                <div class="available-tools">
                    <img class="available-tool-icon" src="images/check-symbol.png" alt="check symbol">
                    <img class="available-tool-icon" src="images/underline-button.png" alt="underline button">
                    <img class="available-tool-icon" src="images/rubbish-bin-delete-button.png" alt="rubbish bin delete button">
                </div>
            </div>
            `;
            toDoPage.insertAdjacentHTML("afterbegin", newTask);
            creationTextarea.value = '';
            localStorage.setItem(String(taskIndex), JSON.stringify({ id: taskIndex, taskContent: value, isDone: false }));
            addAvailableTask(String(taskIndex));
            addFunctionality();
        }
    });
}

