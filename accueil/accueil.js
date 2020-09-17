function loadAccueil() {
    clearContent();
    var quote_container = document.createElement("div");
    quote_container.id = "quote-container";
    var quote_text = document.createElement("h1");
    quote_text.id = "quote-text"; quote_text.innerHTML = "«Programmer, c'est vous libérer.»"
    quote_container.appendChild(quote_text);
    MAIN_PAGE_CONTAINER.appendChild(quote_container);
    
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
        }, i*200+800);
    }
    languages_borders.appendChild(languages_container);
    languages_centering.appendChild(languages_borders);
    MAIN_PAGE_CONTAINER.appendChild(languages_centering);
    setTimeout(() => {languages_borders.style.transform = "scale(1, 1)";}, 500);
}