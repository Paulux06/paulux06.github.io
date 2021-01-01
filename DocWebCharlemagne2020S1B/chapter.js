/**@type {{action: any, time: number}[]} */
var chapter_events = [];
var chapter_events_running = false;
var chapter_events_deltaTime = 0;
var pause_chapter_events = false;

function loadChapter(index=1) {
    switch (index) {
        case 1:
            setupchapter1();
            break;
        case 2:
            setupchapter2();
            break;
        case 3:
            setupchapter3();
            break;
        case 4:
            setupchapter4();
            break;
    
        default:
            break;
    }
}

function openDialog() {
    let container = document.getElementById("chapters-text-container");
    setDialogText("");
    container.style.maxHeight = "10vh";
}

function closeDialog() {
    let container = document.getElementById("chapters-text-container");
    setTimeout(() => {
        setDialogText("");
    }, 200);
    container.style.maxHeight = "0vh";
}

/**
 * set the chapter background to the given picture
 * @param {HTMLImageElement} img
 */
function setChapterBackground(img) {
    document.getElementById("chapters-background").style.backgroundImage = "url("+img.src+")";
} 

/**
 * Set the dialog text to the argument
 * @param {string} text 
 */
function setDialogText(text) {
    let container = document.getElementById("chapters-text-container");
    let content = document.getElementById("chapters-text-content");
    let hider_x = document.getElementById("chapters-text-hider-x");
    let hider_y = document.getElementById("chapters-text-hider-y");
    let bounds = container.getBoundingClientRect();
    let height = bounds.height;
    let width = bounds.width-12;
    setTimeout(()=>{content.innerHTML = text;}, 25);
    
    for (let i = 0; i < Math.ceil(height/CONSTANTS.DIALOG_TEXT_HEIGHT); i++) {
        setTimeout(() => {
            hider_x.style.transition = "none";
            hider_y.style.transition = "none";
            hider_x.style.left = "6px";
            hider_x.style.width = width+"px";
            hider_x.style.top = (i*CONSTANTS.DIALOG_TEXT_HEIGHT)+"px";
            hider_x.style.height = (height-i*CONSTANTS.DIALOG_TEXT_HEIGHT)+"px";
            hider_y.style.top = (i*CONSTANTS.DIALOG_TEXT_HEIGHT-height+(i+1)*CONSTANTS.DIALOG_TEXT_HEIGHT)+"px";
            hider_y.style.height = height+"px";
            setTimeout(() => {
                hider_x.style.transition = CONSTANTS.HIDER_X_TRANSITION;
                hider_y.style.transition = CONSTANTS.HIDER_Y_TRANSITION;
                hider_x.style.left = width.toString()+"px";
                hider_x.style.width = "0px";
            }, 50);
        }, i*1100);
    }
}

function setupchapter1() {
    clearChapterEvents();
    addChapterEvents(openDialog, 0);
    addChapterEvents(()=>{nextBackground(CONSTANTS.CHAPTER_1);}, 0);
    addChapterEvents(()=>{setDialogText("J’avais 15 ans en 1939.")}, 600);
    addChapterEvents(()=>{setDialogText("Nous vivions dans un pays antisémite, sous l’occupation allemande, dans le ghetto juif.")}, 3200);
    addChapterEvents(()=>{
        addPopup("more-ghetto", "Ghetto Juifs", "Plus d'information", {x:70,y:50}, "./doc/chapter_1/ghetto.html",
            ()=>{SOUNDS.CHAPTER_1.NARATIVE.pause();pauseChapterEvents();},
            ()=>{SOUNDS.CHAPTER_1.NARATIVE.play();resumeChapterEvents();}
        )
    }, 7000);
    addChapterEvents(()=>{setDialogText("Séparés des autres.")}, 7700);
    addChapterEvents(()=>{setDialogText("Les soldats de la Gestapo patrouillaient dans le ghetto, à la recherche de gens comme nous.")}, 9200);
    addChapterEvents(()=>{remPopup("more-ghetto")}, 13000);
    addChapterEvents(()=>{setDialogText("Nous savions que s’ils nous trouvaient chez nous, nous devrions quitter la ville.")}, 13700);
    addChapterEvents(()=>{setDialogText("C’est ce qu’il s’est passé.")}, 17900);
    addChapterEvents(()=>{setDialogText("Un soir de décembre, ils ont sonné.")}, 19600);
    addChapterEvents(()=>{nextBackground(CONSTANTS.CHAPTER_1);}, 21500);
    addChapterEvents(()=>{setDialogText("Nous nous sommes alors réfugiés dans notre cachette au grenier. ")}, 21800);
    addChapterEvents(()=>{nextBackground(CONSTANTS.CHAPTER_1);}, 24000);
    addChapterEvents(()=>{setDialogText("Mais ma mère n’a pas eu le temps de nous rejoindre lorsque la porte a été défoncée.")}, 24700);
    addChapterEvents(()=>{setDialogText("Lorsqu’ils l’ont interrogée, elle a prétendu que mes frères, mon père et moi avions quitté la ville.")}, 28900);
    addChapterEvents(()=>{nextBackground(CONSTANTS.CHAPTER_1);}, 30800);
    addChapterEvents(()=>{setDialogText("Nous sommes restés cachés. ")}, 34600);
    addChapterEvents(()=>{setDialogText("Elle nous a sauvé la vie.")}, 36800);
    addChapterEvents(()=>{setDialogText("Puis elle a été emmenée.")}, 38200);
    addChapterEvents(()=>{nextBackground(CONSTANTS.CHAPTER_1);}, 39000);
    addChapterEvents(closeDialog, 41000);
    try {SOUNDS.CHAPTER_1.NARATIVE.play();} catch (e) {}
    try {SOUNDS.CHAPTER_1.BACKGROUND.play();} catch (e) {}
    SOUNDS.CHAPTER_1.EFFECT_INDEX = 0;
    startChapterEvents();
}

function setupchapter2() {
    clearChapterEvents();
    addChapterEvents(openDialog, 0);
    addChapterEvents(()=>{setDialogText("Texte pour le chapitre 2.")}, 200);
    addChapterEvents(closeDialog, 2000);
    try {SOUNDS.CHAPTER_2.NARATIVE.play();} catch (e) {}
    try {SOUNDS.CHAPTER_2.BACKGROUND.play();} catch (e) {}
    SOUNDS.CHAPTER_2.EFFECT_INDEX = 0;
    startChapterEvents();
}

function setupchapter3() {
    clearChapterEvents();
    addChapterEvents(openDialog, 0);
    addChapterEvents(()=>{setDialogText("Texte pour le chapitre 3.")}, 200);
    addChapterEvents(closeDialog, 2000);
    try {SOUNDS.CHAPTER_3.NARATIVE.play();} catch (e) {}
    try {SOUNDS.CHAPTER_3.BACKGROUND.play();} catch (e) {}
    SOUNDS.CHAPTER_3.EFFECT_INDEX = 0;
    startChapterEvents();
}

function setupchapter4() {
    clearChapterEvents();
    addChapterEvents(openDialog, 0);
    addChapterEvents(()=>{setDialogText("Texte pour le chapitre 4.")}, 200);
    addChapterEvents(closeDialog, 2000);
    try {SOUNDS.CHAPTER_4.NARATIVE.play();} catch (e) {}
    try {SOUNDS.CHAPTER_4.BACKGROUND.play();} catch (e) {}
    SOUNDS.CHAPTER_4.EFFECT_INDEX = 0;
    startChapterEvents();
}
    
function clearChapterEvents() {
    chapter_events = [];
    chapter_events_deltaTime = 0;
    SOUNDS.CHAPTER_1.EFFECT_INDEX = 0;
    SOUNDS.CHAPTER_2.EFFECT_INDEX = 0;
    SOUNDS.CHAPTER_3.EFFECT_INDEX = 0;
    SOUNDS.CHAPTER_4.EFFECT_INDEX = 0;
    PICTURES.CHAPTER_1.PIC_INDEX = 0;
    PICTURES.CHAPTER_2.PIC_INDEX = 0;
    PICTURES.CHAPTER_3.PIC_INDEX = 0;
    PICTURES.CHAPTER_4.PIC_INDEX = 0;
    document.getElementById("chapters-background").style.backgroundImage = "none";
}

/**
 * Adds a new event to the chapter event queue
 * @param {any} action 
 * @param {number} time 
 */
function addChapterEvents(action, time) {
    chapter_events.push({action: action, time: time});
}

function startChapterEvents() {
    chapter_events_running = true;
    checkForChapterEvents();
}

function checkForChapterEvents() {
    if (!chapter_events_running) return;
    let index = 0;
    while (true) {
        if (index >= chapter_events.length) break;
        if (chapter_events[index].time <= chapter_events_deltaTime) {
            chapter_events[index].action();
            chapter_events.splice(0, 1);
            index++;
        }
        else break;
    }
    if (chapter_events.length == 0) chapter_events_running = false;
    chapter_events_deltaTime += 200;
    if (!pause_chapter_events) setTimeout(checkForChapterEvents, 200);
}

function pauseChapterEvents() {
    pause_chapter_events = true;
}
function resumeChapterEvents() {
    if (pause_chapter_events) {
        pause_chapter_events = false;
        checkForChapterEvents();
    }
}

function playEffect(chapter_number) {
    switch (chapter_number) {
        case CONSTANTS.CHAPTER_1:
            SOUNDS.CHAPTER_1.EFFECTS[SOUNDS.CHAPTER_1.EFFECT_INDEX++].play();
            break;
        case CONSTANTS.CHAPTER_2:
            SOUNDS.CHAPTER_2.EFFECTS[SOUNDS.CHAPTER_2.EFFECT_INDEX++].play();
            break;
        case CONSTANTS.CHAPTER_3:
            SOUNDS.CHAPTER_3.EFFECTS[SOUNDS.CHAPTER_3.EFFECT_INDEX++].play();
            break;
        case CONSTANTS.CHAPTER_4:
            SOUNDS.CHAPTER_4.EFFECTS[SOUNDS.CHAPTER_4.EFFECT_INDEX++].play();
            break;
    
        default:
            break;
    }
}

function nextBackground(chapter_number) {
    switch (chapter_number) {
        case CONSTANTS.CHAPTER_1:
            setChapterBackground(PICTURES.CHAPTER_1.PICS[PICTURES.CHAPTER_1.PIC_INDEX++]);
            if (PICTURES.CHAPTER_1.PIC_INDEX == PICTURES.CHAPTER_1.PICS.length)
                PICTURES.CHAPTER_1.PIC_INDEX = 0;
            break;
        case CONSTANTS.CHAPTER_2:
            setChapterBackground(PICTURES.CHAPTER_2.PICS[PICTURES.CHAPTER_2.PIC_INDEX++]);
            if (PICTURES.CHAPTER_2.PIC_INDEX == PICTURES.CHAPTER_2.PICS.length)
                PICTURES.CHAPTER_2.PIC_INDEX = 0;
            break;
        case CONSTANTS.CHAPTER_3:
            setChapterBackground(PICTURES.CHAPTER_3.PICS[PICTURES.CHAPTER_3.PIC_INDEX++]);
            if (PICTURES.CHAPTER_3.PIC_INDEX == PICTURES.CHAPTER_3.PICS.length)
                PICTURES.CHAPTER_3.PIC_INDEX = 0;
            break;
        case CONSTANTS.CHAPTER_4:
            setChapterBackground(PICTURES.CHAPTER_4.PICS[PICTURES.CHAPTER_4.PIC_INDEX++]);
            if (PICTURES.CHAPTER_4.PIC_INDEX == PICTURES.CHAPTER_4.PICS.length)
                PICTURES.CHAPTER_4.PIC_INDEX = 0;
            break;
    
        default:
            break;
    }
}