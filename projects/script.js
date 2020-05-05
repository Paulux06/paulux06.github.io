function setup() {
    header(1);

    var projects = [
        {title: 'Plx Engine', description: 'Mon propre Game Engine 3D en C++ !', icon: './plx/icon.png', redirect: './plx/index.html'}
    ]

    for (let i = 0; i < projects.length; i++) {
        createProjectTile(projects[i], i);
    }
}

function createProjectTile(project, index) {
    var content = document.getElementById('content');
    var projectDiv = document.createElement('div');
    projectDiv.id = 'project';
    projectDiv.onclick = function() {window.location.href = project.redirect;};

    var leftDiv = document.createElement('div');
    leftDiv.id = 'project_left';
    var rightDiv = document.createElement('div');
    rightDiv.id = 'project_right';
    
    var icon = new Image();
    icon.src = project.icon;
    icon.id = 'project';

    var description = document.createElement('p');
    description.id = 'description';
    description.innerHTML = project.description;

    var title = document.createElement('p');
    title.id = 'title';
    title.innerHTML = project.title;

    rightDiv.appendChild(title);
    rightDiv.appendChild(description);
    leftDiv.appendChild(icon);
    projectDiv.appendChild(leftDiv);
    projectDiv.appendChild(rightDiv);
    content.appendChild(projectDiv);

    setTimeout(() => {
        projectDiv.style.filter = 'opacity(1)';
        setTimeout(() => {
            projectDiv.style.transition = "background-color 200ms ease-in-out";
        }, 300);
    }, index*200);
}