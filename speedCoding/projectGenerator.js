function home() {
    window.location.href = "../../index.html";
}

function setup() {
    var page = document.getElementById('page');
    var side = false; // false = left | true = right (title)

    for (let i = 0; i < article.length; i++) {
        setTimeout(function() {
            var content = document.createElement('div');
            content.id = "articleModule";
            var title = document.createElement('h2');
            title.id = "pageTitleLeft";
            if (side) {
                title.id = "pageTitleRight"
            }
            title.innerHTML = article[i].title;
            content.appendChild(title)

            var left = document.createElement('div')
            left.id = "insideLeft";
            
            for (let e = 0; e < article[i].desc.length; e++) {
                var desc = document.createElement('p');
                if (article[i].desc[e].startsWith('-')) {desc.id = "descriptionOption";}
                else {desc.id = "description";}
                desc.innerHTML = article[i].desc[e];
                left.appendChild(desc);
            }
            
            var picture = document.createElement('img');
            picture.id = "illustration";
            picture.src = article[i].image;

            for (let e = 0; e < Math.round(article[i].url.length/2); e++) {
                var redirect = document.createElement('a')
                redirect.id = "redirection";
                redirect.innerHTML = article[i].url[e*2];
                redirect.href = article[i].url[e*2+1];
                left.appendChild(redirect)
            }

            if (!side) {content.appendChild(left);}
            content.appendChild(picture);
            if (side) {content.appendChild(left);}

            side = !side;

            page.appendChild(content);
        }, i*200)
    }
    setTimeout(function() {
        var space = document.createElement("div")
        space.id = "space";
        page.append(space)
    }, article.length*200)
}