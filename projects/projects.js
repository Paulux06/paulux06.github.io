function loadProjects(projectID=0) {
    if (loadingBusy) return;
    loadingBusy = true;
    clearContent();

    /********************************************
    *                                           *
    *                   QUOTE                   *
    *                                           *
    ********************************************/
    var quote_container = document.createElement("div");
    quote_container.classList.add("title-container");
    var quote_text = document.createElement("h1");
    quote_text.classList.add("title-text"); quote_text.innerHTML = "Mes projets";
    quote_container.appendChild(quote_text);
    MAIN_PAGE_CONTAINER.appendChild(quote_container);
    
    /********************************************
    *                                           *
    *             LANGUAGES CHOICE              *
    *                                           *
    ********************************************/
    var projects_container = document.createElement("div");
    projects_container.classList.add("enrols-container");
    var projects_centering = document.createElement("div");
    projects_centering.classList.add("enrols-centering");
    var projects = [
        {title: "Flow", img: "./resources/accueil/javascript.png"},
        {title: "Processors", img: "./resources/accueil/cpp.png"},
        {title: "Robot", img: "./resources/accueil/java.png"},
        {title: "Site web", img: "./resources/accueil/python.png"}
    ]
    for (let i = 0; i < projects.length; i++) {
        setTimeout(() => {
            var pic = new Image();
            pic.onload = ()=>{
                var project_borders = document.createElement("div");
                project_borders.classList.add("enrols-borders");
                var project_container = document.createElement("div");
                var project_text = document.createElement("h2");
                var project_text_container = document.createElement("div");
                project_text.classList.add("enrol-text");
                project_text.innerHTML = projects[i].title;
                project_text_container.classList.add("enrol-text-container");
                project_container.classList.add("enrol-container");
                project_container.style.backgroundImage = "url("+projects[i].img+")";
                project_text_container.appendChild(project_text);
                project_container.appendChild(project_text_container);
                var space = document.createElement("div"); space.classList.add("enrols-space");
                if (i > 0) projects_container.appendChild(space);
                project_borders.appendChild(project_container);
                projects_container.appendChild(project_borders);
            }
            projects_centering.appendChild(projects_container);
            pic.src = projects[i].img;
        }, 600+i*10);
    }
    MAIN_PAGE_CONTAINER.appendChild(projects_centering);
    setTimeout(() => {projects_centering.style.transform = "scale(1, 1)";}, 500);

    /********************************************
    *                                           *
    *              PROJECT ASKING               *
    *                                           *
    ********************************************/
    var quote_container = document.createElement("div");
    quote_container.classList.add("title-container");
    var quote_text = document.createElement("h3");
    quote_text.classList.add("redirect"); quote_text.innerHTML = "Proposer une idée de projet"
    quote_container.appendChild(quote_text);
    setTimeout(()=>{MAIN_PAGE_CONTAINER.appendChild(quote_container);}, 600);
    setTimeout(()=>{loadingBusy = false;}, 600);
}