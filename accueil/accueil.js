function loadAccueil() {
    clearContent();

    /********************************************
    *                                           *
    *                   QUOTE                   *
    *                                           *
    ********************************************/
    var quote_container = document.createElement("div");
    quote_container.id = "quote-container";
    var quote_text = document.createElement("h1");
    quote_text.id = "quote-text"; quote_text.innerHTML = "Apprendre à programmer"
    quote_container.appendChild(quote_text);
    MAIN_PAGE_CONTAINER.appendChild(quote_container);
    
    /********************************************
    *                                           *
    *             LANGUAGES CHOICE              *
    *                                           *
    ********************************************/
    var languages_container = document.createElement("div");
    languages_container.id = "languages-container";
    var languages_centering = document.createElement("div");
    languages_centering.id = "languages-centering";
    var languages_borders = document.createElement("div");
    languages_borders.id = "languages-borders";
    var languages = [
        {title: "HTML / CSS / JavaScript", img: "./resources/accueil/javascript.png"},
        {title: "C / C++", img: "./resources/accueil/cpp.png"},
        {title: "Java", img: "./resources/accueil/java.png"},
        {title: "Python", img: "./resources/accueil/python.png"}
    ]
    for (let i = 0; i < languages.length; i++) {
        setTimeout(() => {
            var pic = new Image();
            pic.onload = ()=>{
                var language_container = document.createElement("div");
                var language_text = document.createElement("h2");
                language_text.classList.add("language-text");
                language_text.innerHTML = languages[i].title;
                language_container.classList.add("language-container");
                language_container.style.backgroundImage = "url("+languages[i].img+")";
                language_container.appendChild(language_text);
                var space = document.createElement("div"); space.id = "languages-space";
                if (i > 0) languages_container.appendChild(space);
                languages_container.appendChild(language_container);
            }
            pic.src = languages[i].img;
        }, i*200+500);
    }
    languages_borders.appendChild(languages_container);
    languages_centering.appendChild(languages_borders);
    MAIN_PAGE_CONTAINER.appendChild(languages_centering);
    setTimeout(() => {languages_borders.style.transform = "scale(1, 1)";}, 500);

    /********************************************
    *                                           *
    *                   QUOTE                   *
    *                                           *
    ********************************************/
    setTimeout(() => {
        var quote_container = document.createElement("div");
        quote_container.id = "quote-container";
        var quote_text = document.createElement("h1");
        quote_text.id = "quote-text"; quote_text.innerHTML = "Mes projets"
        quote_container.appendChild(quote_text);
        MAIN_PAGE_CONTAINER.appendChild(quote_container);
    }, 1200);

    /********************************************
    *                                           *
    *              PROJECT CHOICE               *
    *                                           *
    ********************************************/
    setTimeout(() => {
        var project_centerer = document.createElement("div");
        var project_border = document.createElement("div");
        var project_container = document.createElement("div");
        var project_left = document.createElement("div");
        var project_separator = document.createElement("div");
        var project_right = document.createElement("div");
        var project_l_top = document.createElement("div");
        var project_separator2 = document.createElement("div");
        var project_l_bottom = document.createElement("div");
        var project_r_top = document.createElement("div");
        var project_separator3 = document.createElement("div");
        var project_r_bottom = document.createElement("div");
        var project_l_top_text = document.createElement("h2");
        var project_l_bottom_text = document.createElement("h2");
        var project_r_top_text = document.createElement("h2");
        var project_r_bottom_text = document.createElement("h2");
        project_centerer.id = "project-centerer";
        project_container.id = "project-container";
        project_border.id = "project-borders";
        project_left.id = "project-left";
        project_right.id = "project-right";
        project_l_top.id = "project-l-top";
        project_l_bottom.id = "project-l-bottom";
        project_r_top.id = "project-r-top";
        project_r_bottom.id = "project-r-bottom";
        project_l_top_text.id = "project-l-top-text";
        project_l_bottom_text.id = "project-l-bottom-text";
        project_r_top_text.id = "project-r-top-text";
        project_r_bottom_text.id = "project-r-bottom-text";
        project_separator.id = "project-separator";
        project_separator2.id = "project-separator";
        project_separator3.id = "project-separator";
        project_l_top_text.innerHTML = "Flow";
        project_l_bottom_text.innerHTML = "Processors";
        project_r_top_text.innerHTML = "Robot";
        project_r_bottom_text.innerHTML = "Site web";

        project_l_bottom.appendChild(project_l_bottom_text);
        project_l_top.appendChild(project_l_top_text);
        project_r_top.appendChild(project_r_top_text);
        project_r_bottom.appendChild(project_r_bottom_text);
        project_left.appendChild(project_l_top);
        project_left.appendChild(project_separator);
        project_left.appendChild(project_l_bottom);
        project_right.appendChild(project_r_top);
        project_right.appendChild(project_separator2);
        project_right.appendChild(project_r_bottom);
        project_container.appendChild(project_left);
        project_container.appendChild(project_separator3);
        project_container.appendChild(project_right);
        project_border.appendChild(project_container);
        project_centerer.appendChild(project_border);
        MAIN_PAGE_CONTAINER.appendChild(project_centerer);
        setTimeout(() => {project_border.style.transform = "scale(1, 1)";}, 200);
    }, 1300);
}