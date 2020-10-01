function loadProjects(projectID=0) {
    if (loadingBusy) return;
    CURRENT_SECTION = "projects";
    loadingBusy = true;
    clearContent();

    var projects = [
        {title: "Mes Projets",
            list: [
                {title: "Flow", img: "./resources/accueil/javascript.png"},
                {title: "Processors", img: "./resources/accueil/cpp.png"},
                {title: "Robot", img: "./resources/accueil/java.png"},
                {title: "Site web", img: "./resources/accueil/python.png"}
            ]
        },
        {title: "Mini-codes",
            list: [
                {title: "Visualizer", img: "./resources/projets/visualizer.png"}
            ]
        }
    ]
    for (let h = 0; h < projects.length; h++) {
        setTimeout(() => {
            var cur_prod = projects[h];
            /********************************************
            *                                           *
            *                   QUOTE                   *
            *                                           *
            ********************************************/
            var quote_container = document.createElement("div");
            quote_container.classList.add("title-container");
            var quote_text = document.createElement("h1");
            quote_text.classList.add("title-text"); quote_text.innerHTML = cur_prod.title;
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
            for (let i = 0; i < cur_prod.list.length; i++) {
                setTimeout(() => {
                    var pic = new Image();
                    pic.onload = ()=>{
                        var project_borders = document.createElement("div");
                        project_borders.classList.add("enrols-borders");
                        var project_container = document.createElement("div");
                        var project_text = document.createElement("h2");
                        var project_text_container = document.createElement("div");
                        project_text.classList.add("enrol-text");
                        project_text.innerHTML = cur_prod.list[i].title;
                        project_text_container.classList.add("enrol-text-container");
                        project_container.classList.add("enrol-container");
                        project_container.style.backgroundImage = "url("+cur_prod.list[i].img+")";
                        project_text_container.appendChild(project_text);
                        project_container.appendChild(project_text_container);
                        var space = document.createElement("div"); space.classList.add("enrols-space");
                        if (i > 0) projects_container.appendChild(space);
                        project_borders.appendChild(project_container);
                        projects_container.appendChild(project_borders);
                    }
                    projects_centering.appendChild(projects_container);
                    pic.src = cur_prod.list[i].img;
                }, 200+i*10);
            }
            MAIN_PAGE_CONTAINER.appendChild(projects_centering);
            setTimeout(() => {projects_centering.style.transform = "scale(1, 1)";}, 500);
        }, h*800);
    }

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
    setTimeout(()=>{MAIN_PAGE_CONTAINER.appendChild(quote_container);}, 900);
    setTimeout(()=>{loadingBusy = false;}, 900);
}