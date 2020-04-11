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

function home() {
    window.location.href = "../index.html";
}

function setup() {
    var projects = [
        Object.create(project).init(
            "Flow", "Un assistant vocal, qui s'améliore de jours en jours !",
            "./Flow/FlowIcon.png", "./Flow/index.html"
            ),
        Object.create(project).init(
            "EsGa", "J'avais un escape game à faire un ISN, il s'est transformé en Mario low-cost !",
            "../ressources/icon.png", "./index.html"
            ),
            Object.create(project).init(
            "Processors", "Mon premier jeu potable, viens y jeter un oeil !",
            "../ressources/icon.png", "./index.html"
            )
    ]
    
    for (let i = 0; i < projects.length; i++) {
        setTimeout(append_project, i*50, projects[i])
    }
}

function append_project(proj) {
    var content = document.getElementById('projectList')
    var projectBox = document.createElement("div");
        projectBox.id = "projectBox";

        var leftDiv = document.createElement("div");
        var rightDiv = document.createElement("div");
        leftDiv.id = "projectLeft"; rightDiv.id = "projectRight";

        var title = document.createElement("a");
        title.id = "projectTitle";
        title.innerHTML = proj.title;
        title.href = proj.projectUrl;
        leftDiv.appendChild(title);

        var desc = document.createElement("p");
        desc.id = "projectDesc";
        desc.innerHTML = proj.description;
        leftDiv.appendChild(desc);

        var img = document.createElement("img");
        img.id = "projectPic";
        img.src = proj.picturePath;
        rightDiv.appendChild(img);

        projectBox.appendChild(leftDiv);
        projectBox.appendChild(rightDiv);

        content.appendChild(projectBox);
}