var project = {
    title: "Project title",
    description: "Project description",
    picturePath: "../ressources/icon.png",
    projectUrl: "./index.html",
    init: function(title, desc, pic, url) {
        this.title = title;
        this.description = desc;
        this.picturePath = pic;
        this.projectUrl = url;
        return this;
    }
}

function setup() {
    var projects = [
        Object.create(project).init(
            "Speed Coding #1 - Flappy Bird", "124 lignes de code, 1h45 de programmation",
            "./speedCoding1/icon.png", "./speedCoding1/flappyBird.zip"
            )
    ]
    for (let i = 0; i < projects.length; i++) {
        setTimeout(append_project, i*80, projects[i], i);
    }
}

function append_project(proj) {
    var content = document.getElementById('projectList')
    var projectBox = document.createElement("div");
    projectBox.id = "projectBox";

    var topDiv = document.createElement("div");
    var bottomDiv = document.createElement("div");
    topDiv.id = "projectTop"; bottomDiv.id = "projectBottom";

    var title = document.createElement("a");
    title.id = "projectTitle";
    title.innerHTML = proj.title;
    title.href = proj.projectUrl;
    topDiv.appendChild(title);

    var desc = document.createElement("p");
    desc.id = "projectDesc";
    desc.innerHTML = proj.description;
    bottomDiv.appendChild(desc);

    var img = document.createElement("img");
    img.id = "projectPic";
    img.src = proj.picturePath;
    bottomDiv.appendChild(img);

    projectBox.appendChild(topDiv);
    projectBox.appendChild(bottomDiv);

    content.appendChild(projectBox);
}