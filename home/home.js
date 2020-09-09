function goHome()
{
    clearPage();
    var page = document.getElementById("content-container");

    for (let i = 0; i < home_content.length; i++) {
        const subject = home_content[i];
        
        var subject_container = document.createElement("div");
        var subject_title_container = document.createElement("div");
        var subject_title_text = document.createElement("h2");
        var subject_tile_container = document.createElement("div");
        
        subject_container.id = "subject-container";
        subject_tile_container.id = "subject-tile-container";

        subject_title_container.id = "subject-title-container";
        subject_title_container.classList.add("button");
        
        subject_title_text.id = "subject-title-text";
        subject_title_text.classList.add("box");
        subject_title_text.innerHTML = subject.title;
        subject_title_text.onclick = () => {location.href = subject.redirect;};

        for (let j = 0; j < subject.tiles.length; j++) {
            const tile = subject.tiles[j];
            
            var tile_container = document.createElement("div");
            var tile_title = document.createElement("h3");
            var tile_desc_container = document.createElement("div");

            tile_container.id = "tile-container";
            tile_container.classList.add("button");
            tile_container.onclick = () => {location.href = tile.redirect;};

            tile_title.id = "tile-title";
            tile_title.classList.add("box");
            tile_title.classList.add("label");
            tile_title.innerHTML = tile.title;

            for (let k = 0; k < tile.desc.length; k++) {
                var paragraph = document.createElement("p");
                paragraph.id = "description";
                paragraph.innerHTML = tile.desc[k];
                paragraph.classList.add("label");
                tile_desc_container.appendChild(paragraph);
            }
            
            tile_container.appendChild(tile_title);
            tile_container.appendChild(tile_desc_container);
            subject_tile_container.appendChild(tile_container);
        }

        subject_title_container.appendChild(subject_title_text);
        subject_container.appendChild(subject_title_container);
        subject_container.appendChild(subject_tile_container);
        page.appendChild(subject_container);
    }
}