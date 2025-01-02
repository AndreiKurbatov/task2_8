import Fox from './Fox.js';
import { FoxTypeEnum } from './FoxTypeEnum.js';


const foxes: Fox[] = [
    new Fox(
        0,
        './images/red-smile-fox.png',
        'Red smile fox',
        'Lorem ipsum dolor sit amet, eu mei posse possim atomorum, vix cu fabellas assueverit. Vel ad option partiendo maiestatis, nec affert appetere.',
        2547,
        FoxTypeEnum.RED_FOX
    ),
    new Fox(
        1,
        './images/pet-smile-fox.png',
        'Pet smile fox',
        'Lorem ipsum dolor sit amet, eu mei posse possim atomorum, vix cu fabellas assueverit. Vel ad option ',
        1000,
        FoxTypeEnum.PET_FOX
    ),
    new Fox(
        2,
        './images/arctic-smile-fox.png',
        'Arctic smile fox',
        'Lorem ipsum dolor sit amet, eu mei posse possim atomorum, vix cu fabellas assueverit. Vel ad option partiendo maiestatis, nec affert appetere te, his assentior, libris docendi tractatos mea eu.',
        4659,
        FoxTypeEnum.ARCTIC_FOX
    ),
    new Fox(
        3,
        './images/kit-smile-fox.png',
        'Kit smile fox',
        'Lorem ipsum dolor sit amet, eu mei posse possim atomorum, vix cu fabellas assueverit. Vel ad option partiendo maiestatis, nec affert appetere te, his ipsum corpora no.',
        37,
        FoxTypeEnum.KIT_FOX
    ),
    new Fox(
        4,
        './images/pet-smile-fox1.png',
        'Pet smile fox',
        'Lorem ipsum dolor sit amet, eu mei posse possim atomorum, vix cu fabellas assueverit. Vel ad option partiendo maiestatis, nec affert appetere te, ',
        9764,
        FoxTypeEnum.PET_FOX
    ),
    new Fox(
        5,
        './images/kit-smile-fox1.png',
        'Kit smile fox',
        'Lorem ipsum dolor sit amet, eu mei posse possim atomorum, vix cu fabellas assueverit. Vel ad option partiendo maiestatis, nec affert appetere te,',
        1287,
        FoxTypeEnum.KIT_FOX
    ),
    new Fox(
        6,
        './images/fennec-smile-fox.png',
        'Fennec smile fox',
        'Lorem ipsum dolor sit amet, eu mei posse possim atomorum, vix cu fabellas assueverit. Vel ad option partiendo maiestatis, nec affert appetere te, his assentior, libris docendi tractatos mea eu.',
        9897,
        FoxTypeEnum.FENNEC_FOX
    ),
    new Fox(
        7,
        './images/red-smile-fox1.png',
        'Red smile fox',
        'Lorem ipsum dolor sit amet, eu mei posse possim atomorum, vix cu fabellas assueverit. Vel ad option partiendo maiestatis, nec affert appetere te, his \assentior, libris docendi tractatos mea eu',
        1100,
        FoxTypeEnum.RED_FOX
    )
]

let isEditModeOn = false;

const foxesContainer = document.getElementById("foxes-container") as HTMLElement;
foxesContainer.innerHTML = generateFoxContent(foxes);
addLikeActiveFunctionality();

document.getElementById("fennec-fox")?.addEventListener("click", () => {
    const foxesContainer = document.getElementById("foxes-container") as HTMLElement;
    const sortedFoxes = foxes.filter(v => v.getFoxType() == FoxTypeEnum.FENNEC_FOX);
    foxesContainer.innerHTML = generateFoxContent(sortedFoxes);
    addLikeActiveFunctionality();
    enableEditingDescription();
});

document.getElementById("arctic-fox")?.addEventListener("click", () => {
    const foxesContainer = document.getElementById("foxes-container") as HTMLElement;
    const sortedFoxes = foxes.filter(v => v.getFoxType() == FoxTypeEnum.ARCTIC_FOX);
    foxesContainer.innerHTML = generateFoxContent(sortedFoxes);
    addLikeActiveFunctionality();
    enableEditingDescription();
});

document.getElementById("kit-fox")?.addEventListener("click", () => {
    const foxesContainer = document.getElementById("foxes-container") as HTMLElement;
    const sortedFoxes = foxes.filter(v => v.getFoxType() == FoxTypeEnum.KIT_FOX);
    foxesContainer.innerHTML = generateFoxContent(sortedFoxes);
    addLikeActiveFunctionality();
    enableEditingDescription();
});

document.getElementById("red-fox")?.addEventListener("click", () => {
    const foxesContainer = document.getElementById("foxes-container") as HTMLElement;
    const sortedFoxes = foxes.filter(v => v.getFoxType() == FoxTypeEnum.RED_FOX);
    foxesContainer.innerHTML = generateFoxContent(sortedFoxes);
    addLikeActiveFunctionality();
    enableEditingDescription();
});

document.getElementById("pet-fox")?.addEventListener("click", () => {
    const foxesContainer = document.getElementById("foxes-container") as HTMLElement;
    const sortedFoxes = foxes.filter(v => v.getFoxType() == FoxTypeEnum.PET_FOX);
    foxesContainer.innerHTML = generateFoxContent(sortedFoxes);
    addLikeActiveFunctionality();
    enableEditingDescription();
});

document.getElementById("main-header")?.addEventListener("click", () => {
    const foxesContainer = document.getElementById("foxes-container") as HTMLElement;
    foxesContainer.innerHTML = generateFoxContent(foxes);
    addLikeActiveFunctionality();
    enableEditingDescription();
});

document.getElementById("editor-mode")?.addEventListener("click", () => {
    const editorModeButton = document.getElementById("editor-mode") as HTMLElement;
    isEditModeOn = !isEditModeOn;
    if (isEditModeOn) {
        editorModeButton.classList.add('editor-mode-on');
        enableEditingDescription();
    } else {
        editorModeButton.classList.remove('editor-mode-on');
    }
})

function generateFoxContent(foxes: Fox[]): string {
    let result = '';
    for (const fox of foxes) {
        result += `
            <div id="fox-item${fox.getFoxId()}" class="fox-item">
                <div id="fox-photo-wrapper${fox.getFoxId()}" class="fox-photo-wrapper">
                    <img id="fox-photo${fox.getFoxId()}" class="fox-photo" src=${fox.getPhotoPath()} alt="${fox.getName()} photo">
                </div>
                <div id="fox-content-container${fox.getFoxId()}" class="fox-content-container">
                    <div id="fox-internal-header-container${fox.getFoxId()}" class="fox-internal-header-container">
                        <span id="fox-header${fox.getFoxId()}" class="fox-header">${fox.getName()}</span>
                        <span id="fox-like${fox.getFoxId()}" class="fox-like">
                            <span id="heart${fox.getFoxId()}" class="heart">&#x2764;</span>
                            <span id="likes-value${fox.getFoxId()}" class="likes-value">${fox.getLikesAmount().toString().padStart(4, '0')}</span>
                        </span>
                    </div>
                    <div id="fox-description${fox.getFoxId()}" class="fox-description">${fox.getDescription()}</div>
                    <div id="fox-read-more${fox.getFoxId()}" class="fox-read-more">Read more &#x276F;&#x276F;</div>
                </div>
            </div>
        `
    }
    return result;
};

function addLikeActiveFunctionality(): void {
    document.querySelectorAll(".fox-like").forEach(foxLike => {
        foxLike.addEventListener('click', (event) => {
            const heart = foxLike.querySelector('.heart');
            if (heart) {
                heart.classList.add('grow');
                setTimeout(() => {
                    heart.classList.remove('grow');
                }, 300);
            }

            const target = event.target as HTMLElement;
            const foxId = Number.parseInt(target.id.slice(target.id.length - 1));

            foxes[foxId].setLikesAmount(foxes[foxId].getLikesAmount() + 1);

            const likesValue = document.getElementById("likes-value" + foxId) as HTMLElement;
            likesValue.textContent = foxes[foxId].getLikesAmount().toString().padStart(4, '0');
        });
    });
}

function enableEditingDescription(): void {
    document.querySelectorAll(".fox-description").forEach(foxDescription => {

        foxDescription.addEventListener("dblclick", event => {
            if (isEditModeOn) {
                const target = event.target as HTMLElement;
                const id = target.getAttribute("id");
                const originalContent = target.textContent || "";
                const textarea = document.createElement("textarea");
                textarea.setAttribute("maxlength", "215");
                textarea.classList.add("fox-description-textarea");
                textarea.value = originalContent;
                target.replaceWith(textarea);
                textarea.focus();

                const saveChanges = () => {
                    const newContent = textarea.value.trim();
                    const newDiv = document.createElement("div");
                    if (id === null) {
                        throw new Error("fox-description id is not found");
                    }
                    newDiv.id = id;
                    newDiv.className = "fox-description";
                    newDiv.textContent = newContent || originalContent;
                    textarea.replaceWith(newDiv);
                    enableEditingDescription();
                }

                document.addEventListener("click", (event) => {
                    if (isEditModeOn) {
                        const editorMode = document.getElementById("editor-mode") as HTMLElement;
                        const target = event.target as HTMLElement;
                        const body = document.getElementById("body") as HTMLElement;
                        if ((body.contains(target) || editorMode.contains(target)) && !textarea.contains(target)) {
                            saveChanges();
                        }
                    }
                });
                textarea.addEventListener("keydown", (e) => {
                    if (isEditModeOn) {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            saveChanges();
                        }
                    }
                });
            }
        })

    })
}