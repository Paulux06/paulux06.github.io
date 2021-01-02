/**@type Float32Array */
var micro_buffer = [];
var loaded = false;
var elements_loaded = 0;
var max_element_loaded = 1;

var CONSTANTS = {
    VIEW_SELECT: 1,
    VIEW_CHAPTER: 2,
    CHAPTER_1: 3,
    CHAPTER_2: 4,
    CHAPTER_3: 5,
    CHAPTER_4: 6,
    RUNNING: 1,
    PAUL: 7,
    TOM: 8,
    ROBIN: 9,
    BENJAMIN: 10,
    HIDER_X_TRANSITION: "left 500ms linear, width 500ms linear",
    HIDER_Y_TRANSITION: "none",
    DIALOG_TEXT_HEIGHT: 23,
    ANIMATION_DELAY: 210
};

var PARAMETERS = {
    FULLSCREEN: false
}

var SOUNDS = {
    CHAPTER_1: {
        NARATIVE: null,
        BACKGROUND: null,
        EFFECT_INDEX: 0,
        EFFECTS: []
    },
    CHAPTER_2: {
        NARATIVE: null,
        BACKGROUND: null,
        EFFECT_INDEX: 0,
        EFFECTS: []
    },
    CHAPTER_3: {
        NARATIVE: null,
        BACKGROUND: null,
        EFFECT_INDEX: 0,
        EFFECTS: []
    },
    CHAPTER_4: {
        NARATIVE: null,
        BACKGROUND: null,
        EFFECT_INDEX: 0,
        EFFECTS: []
    },
    GUI: {
        HOVER: null,
        CLICK: null
    },
    SELECT: {
        BACKGROUND: null
    }
}

var PICTURES = {
    CHAPTER_1: {
        PIC_INDEX: 0,
        PICS: []
    },
    CHAPTER_2: {
        PIC_INDEX: 0,
        PICS: []
    },
    CHAPTER_3: {
        PIC_INDEX: 0,
        PICS: []
    },
    CHAPTER_4: {
        PIC_INDEX: 0,
        PICS: []
    }
}

loadRessources();
window.onload = () => {
    setChoicesEnabled(false);
    //startAudioStream();
    setupCredits();
    changeViewTo(CONSTANTS.VIEW_SELECT);
}

window.addEventListener("keydown", ev => {
    if (!PARAMETERS.FULLSCREEN)
        openFullscreen(document.body);
    console.log("UwU: "+ev.key)
})

window.addEventListener("mousedown", ev => {
    if (!PARAMETERS.FULLSCREEN)
        openFullscreen(document.body);
})

/**
 * Change l'état de ma fenetre des choix
 * @param {boolean} state état de la fenetre des choix (true: ouverte, false: fermée)
 */
function setChoicesEnabled(state, title="Question", left="Choix 1", right="Choix 2") {
    let choicesDiv = document.getElementById("choices-container")
    if (state) {
        choicesDiv.style.display = "block";
        setTimeout(() => {
            choicesDiv.style.opacity = "1";
            choicesDiv.style.transform = "scale(1)";
        }, 20);
        document.getElementById("choices-title").innerHTML = title;
        document.getElementById("choices-left").innerHTML = left;
        document.getElementById("choices-right").innerHTML = right;
    } else {
        choicesDiv.style.opacity = "0";
        choicesDiv.style.transform = "scale(2)";
        setTimeout(()=>{choicesDiv.style.display = "none";}, 210);
    }
    setDarkMode(state);
}

/**
 * Change l'état de ma fenetre des choix
 * @param {number} view_number état de la fenetre des choix (true: ouverte, false: fermée)
 */
function changeViewTo(view_number, chapter=0) {
    let selectDiv = document.getElementById("select-container");
    let chaptersDiv = document.getElementById("chapters-container");
    stopSounds()
    remAllPopups();
    clearChapterEvents();
    closeDialog();
    switch (view_number) {
        case CONSTANTS.VIEW_CHAPTER:
            chaptersDiv.style.opacity = "1";
            chaptersDiv.style.transform = "scale(1)";
            selectDiv.style.opacity = "0";
            selectDiv.style.transform = "scale(0)";
            switch (chapter) {
                case CONSTANTS.CHAPTER_1:
                    CONSTANTS.RUNNING = CONSTANTS.CHAPTER_1;
                    loadChapter(1);
                    break;
                case CONSTANTS.CHAPTER_2:
                    CONSTANTS.RUNNING = CONSTANTS.CHAPTER_2;
                    loadChapter(2);
                    break;
                case CONSTANTS.CHAPTER_3:
                    CONSTANTS.RUNNING = CONSTANTS.CHAPTER_3;
                    loadChapter(3);
                    break;
                case CONSTANTS.CHAPTER_4:
                    CONSTANTS.RUNNING = CONSTANTS.CHAPTER_4;
                    loadChapter(4);
                    break;
            
                default:
                    break;
            }
            break;

        case CONSTANTS.VIEW_SELECT:
            CONSTANTS.RUNNING = CONSTANTS.VIEW_SELECT;
            selectDiv.style.opacity = "1";
            selectDiv.style.transform = "scale(1)";
            chaptersDiv.style.opacity = "0";
            chaptersDiv.style.transform = "scale(2)";
            if (PARAMETERS.FULLSCREEN) SOUNDS.SELECT.BACKGROUND.play();
            break;

        default:
            break;
    }
}

function startAudioStream() {
    navigator.getUserMedia = navigator.getUserMedia ||     
    navigator.webkitGetUserMedia ||     
    navigator.mozGetUserMedia ||     
    navigator.msGetUserMedia;    
    navigator.getUserMedia({audio: true},     
    function (e) {
        // creates the audio context  
        window.AudioContext = window.AudioContext || window.webkitAudioContext;     
        context = new AudioContext();
        
        // creates an audio node from the microphone incoming stream
        mediaStream = context.createMediaStreamSource(e);
        
        var bufferSize = 2048;
        var numberOfInputChannels = 1;
        var numberOfOutputChannels = 1;
        if (context.createScriptProcessor) {
            recorder = context.createScriptProcessor(bufferSize, numberOfInputChannels, numberOfOutputChannels);
        } else {
            recorder = context.createJavaScriptNode(bufferSize, numberOfInputChannels, numberOfOutputChannels);
        }
        recorder.onaudioprocess = function (e) {
            micro_buffer = new Float32Array(e.inputBuffer.getChannelData(0));
        }
        // we connect the recorder with the input stream
        mediaStream.connect(recorder);
        recorder.connect(context.destination);
    },
    function (e) {console.error(e);});
}

function getMicVolume() {
    let sum = 0;
    micro_buffer.forEach(sample => {sum += Math.abs(sample);});
    return sum / micro_buffer.length;
}

function stopSounds() {
    try {
        SOUNDS.CHAPTER_1.NARATIVE.pause();
        SOUNDS.CHAPTER_1.NARATIVE.currentTime = 0;
        SOUNDS.CHAPTER_1.BACKGROUND.pause();
        SOUNDS.CHAPTER_1.BACKGROUND.currentTime = 0;
        SOUNDS.CHAPTER_1.EFFECTS.forEach(sound => {
            sound.pause();
            sound.currentTime = 0;
        });
    } catch (e) {}
    try {
        SOUNDS.CHAPTER_2.NARATIVE.pause();
        SOUNDS.CHAPTER_2.NARATIVE.currentTime = 0;
        SOUNDS.CHAPTER_2.BACKGROUND.pause();
        SOUNDS.CHAPTER_2.BACKGROUND.currentTime = 0;
        SOUNDS.CHAPTER_2.EFFECTS.forEach(sound => {
            sound.pause();
            sound.currentTime = 0;
        });
    } catch (e) {}
    try {
        SOUNDS.CHAPTER_3.NARATIVE.pause();
        SOUNDS.CHAPTER_3.NARATIVE.currentTime = 0;
        SOUNDS.CHAPTER_3.BACKGROUND.pause();
        SOUNDS.CHAPTER_3.BACKGROUND.currentTime = 0;
        SOUNDS.CHAPTER_3.EFFECTS.forEach(sound => {
            sound.pause();
            sound.currentTime = 0;
        });
    } catch (e) {}
    try {
        SOUNDS.CHAPTER_4.NARATIVE.pause();
        SOUNDS.CHAPTER_4.NARATIVE.currentTime = 0;
        SOUNDS.CHAPTER_4.BACKGROUND.pause();
        SOUNDS.CHAPTER_4.BACKGROUND.currentTime = 0;
        SOUNDS.CHAPTER_4.EFFECTS.forEach(sound => {
            sound.pause();
            sound.currentTime = 0;
        });
    } catch (e) {}
    try {
        SOUNDS.SELECT.BACKGROUND.pause();
        SOUNDS.SELECT.BACKGROUND.currentTime = 0;
    } catch (e) {}
}

function openFullscreen(elem) {
    if (elem.requestFullscreen) {
        elem.requestFullscreen().then(()=>{
            PARAMETERS.FULLSCREEN = true;
        });
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen().then(()=>{
            PARAMETERS.FULLSCREEN = true;
        });
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen().then(()=>{
            PARAMETERS.FULLSCREEN = true;
        });
    }
    if (CONSTANTS.RUNNING==CONSTANTS.VIEW_SELECT) SOUNDS.SELECT.BACKGROUND.play();
}
  
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen().then(()=>{
            PARAMETERS.FULLSCREEN = false;
        });
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen().then(()=>{
            PARAMETERS.FULLSCREEN = false;
        });
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen().then(()=>{
            PARAMETERS.FULLSCREEN = false;
        });
    }
}

function loadRessources() {
    max_element_loaded = 2;
    SOUNDS.CHAPTER_1.NARATIVE = new Audio("./resources/audio/chapter_1/narative.wav");
    SOUNDS.CHAPTER_1.NARATIVE.addEventListener("loadeddata", verifyLoading);
    SOUNDS.CHAPTER_1.BACKGROUND = new Audio("./resources/audio/rain.wav");
    SOUNDS.CHAPTER_1.BACKGROUND.addEventListener("loadeddata", verifyLoading);
    SOUNDS.CHAPTER_1.BACKGROUND.volume = 0.4;
    SOUNDS.CHAPTER_1.BACKGROUND.loop = true;
    
    max_element_loaded+=2;
    SOUNDS.CHAPTER_2.NARATIVE = new Audio("./resources/audio/chapter_2/narative.wav");
    SOUNDS.CHAPTER_2.NARATIVE.addEventListener("loadeddata", verifyLoading);
    SOUNDS.CHAPTER_2.BACKGROUND = new Audio("./resources/audio/rain.wav");
    SOUNDS.CHAPTER_2.BACKGROUND.addEventListener("loadeddata", verifyLoading);
    SOUNDS.CHAPTER_2.BACKGROUND.volume = 0.4;
    SOUNDS.CHAPTER_2.BACKGROUND.loop = true;
    
    max_element_loaded+=2;
    SOUNDS.CHAPTER_3.NARATIVE = new Audio("./resources/audio/chapter_3/narative.wav");
    SOUNDS.CHAPTER_3.NARATIVE.addEventListener("loadeddata", verifyLoading);
    SOUNDS.CHAPTER_3.BACKGROUND = new Audio("./resources/audio/rain.wav");
    SOUNDS.CHAPTER_3.BACKGROUND.addEventListener("loadeddata", verifyLoading);
    SOUNDS.CHAPTER_3.BACKGROUND.volume = 0.4;
    SOUNDS.CHAPTER_3.BACKGROUND.loop = true;

    max_element_loaded+=3;
    SOUNDS.SELECT.BACKGROUND = new Audio("./resources/audio/campfire.wav");
    SOUNDS.SELECT.BACKGROUND.addEventListener("loadeddata", verifyLoading);
    SOUNDS.SELECT.BACKGROUND.loop = true;
    SOUNDS.GUI.HOVER = new Audio("./resources/audio/hover.wav");
    SOUNDS.GUI.HOVER.addEventListener("loadeddata", verifyLoading);
    SOUNDS.GUI.HOVER.volume = 0.5;
    SOUNDS.GUI.CLICK = new Audio("./resources/audio/click.wav");
    SOUNDS.GUI.CLICK.addEventListener("loadeddata", verifyLoading);
    SOUNDS.GUI.CLICK.volume = 0.5;

    max_element_loaded+=3;
    let img = new Image(); img.src = "./resources/images/select/background.png";
    img.addEventListener("load", ()=>{
        document.getElementById("select-background").style.backgroundImage = "url(./resources/images/select/background.png)";
        verifyLoading();
    });
    img = new Image(); img.src = "./resources/images/select/foreground.png";
    img.addEventListener("load", ()=>{
        document.getElementById("select-foreground").style.backgroundImage = "url(./resources/images/select/foreground.png)";
        verifyLoading();
    });
    img = new Image(); img.src = "./resources/images/back.svg";
    img.addEventListener("load", ()=>{
        document.getElementById("back-button-div").style.backgroundImage = "url(./resources/images/back.svg)";
        verifyLoading();
    });

    let chapter_1_pics = ["./resources/images/chapter_1/ghetto.jpg", "./resources/images/chapter_1/echelle.jpg",
                          "./resources/images/chapter_1/grenier_1.jpg", "./resources/images/chapter_1/grenier_2.jpg"]
    let chapter_2_pics = ["./resources/images/chapter_2/grenier.jpg", "./resources/images/chapter_2/alarme.jpg",
                          "./resources/images/chapter_2/wagon.jpg", "./resources/images/chapter_2/arrivee_camps.jpg"]
    let chapter_3_pics = ["./resources/images/chapter_3/travail.jpg", "./resources/images/chapter_3/camp.jpg"]
    let chapter_4_pics = []
    max_element_loaded+=chapter_1_pics.length;
    for (let i = 0; i < chapter_1_pics.length; i++) {
        img = new Image(); img.src = chapter_1_pics[i];
        img.addEventListener("load", verifyLoading);
        PICTURES.CHAPTER_1.PICS.push(img);
    }
    max_element_loaded+=chapter_2_pics.length;
    for (let i = 0; i < chapter_2_pics.length; i++) {
        img = new Image(); img.src = chapter_2_pics[i];
        img.addEventListener("load", verifyLoading);
        PICTURES.CHAPTER_2.PICS.push(img);
    }
    max_element_loaded+=chapter_3_pics.length;
    for (let i = 0; i < chapter_3_pics.length; i++) {
        img = new Image(); img.src = chapter_3_pics[i];
        img.addEventListener("load", verifyLoading);
        PICTURES.CHAPTER_3.PICS.push(img);
    }
    max_element_loaded+=chapter_4_pics.length;
    for (let i = 0; i < chapter_4_pics.length; i++) {
        img = new Image(); img.src = chapter_4_pics[i];
        img.addEventListener("load", verifyLoading);
        PICTURES.CHAPTER_4.PICS.push(img);
    }

    animateLoading();
}

function verifyLoading() {
    elements_loaded++;
    document.getElementById("loading-bar-div").style.width = Math.round((elements_loaded/max_element_loaded)*100)+"%";
    loaded = (elements_loaded == max_element_loaded);
}

function animateLoading() {
    try {
        document.getElementById("loading-text").style.transform = "translateY(10%)";
        setTimeout(() => {
            document.getElementById("loading-text").style.transform = "translateY(-10%)";
        }, 500);
    } catch (e) {}
    if (!loaded) setTimeout(animateLoading, 1000);
    else {
        try {
            document.getElementById("loading-page").style.left = window.innerWidth+"px";
            setTimeout(() => {
                document.getElementById("loading-page").style.display = "none";
            }, 200);
        } catch (e) {}
    }
}

/**@param {boolean} state */
function setDarkMode(state) {
    let main_container = document.getElementById("main-container");
    if (state) {
        main_container.style.filter = "brightness(0.4)";
    } else {
        main_container.style.filter = "brightness(1)";
    }
}