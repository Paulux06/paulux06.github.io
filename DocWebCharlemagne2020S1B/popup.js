/**@type {{div: HTMLDivElement, frame: HTMLIFrameElement, id: string, open: boolean}[]} */
let popup_list = [];

/**
 * adds a new popup on screen
 * @param {string} popup_id 
 * @param {string} popup_title 
 * @param {string} popup_desc
 * @param {{x: number, y: number}} popup_position position in percent (example: {x: 50, y: 50})
 * @param {string} web_page link of the web page to show then maximized
 * @param {any} on_maximize optional callback function if popup is maximized
 * @param {any} on_minimize optional callback function if popup is minimized
 */
function addPopup(popup_id, popup_title, popup_desc, popup_position, web_page, on_maximize=()=>{}, on_minimize=()=>{}) {
    let new_popup = {div: document.createElement("div"), frame: document.createElement("iframe"), id: popup_id, open: false};
    new_popup.div.classList.add("popup-div");
    new_popup.div.style.left = popup_position.x+"%";
    new_popup.div.style.top = popup_position.y+"%";
    let width = Math.round(window.innerWidth*0.2);
    let height = Math.round(window.innerHeight*0.1);
    new_popup.div.style.width = width+"px";
    new_popup.div.style.height = height+"px";
    let title = document.createElement("p");
    title.classList.add("popup-title")
    title.innerHTML = popup_title;
    let desc = document.createElement("p");
    desc.classList.add("popup-desc")
    desc.innerHTML = popup_desc;
    new_popup.frame.classList.add("popup-frame")
    new_popup.frame.src = web_page;
    new_popup.div.appendChild(title);
    new_popup.div.appendChild(desc);
    new_popup.div.appendChild(new_popup.frame);
    document.getElementById("popup-container").appendChild(new_popup.div);
    new_popup.div.onclick = ()=>{
        if (new_popup.open) {
            new_popup.div.style.left = popup_position.x+"%";
            new_popup.div.style.top = popup_position.y+"%";
            let width = Math.round(window.innerWidth*0.2);
            let height = Math.round(window.innerHeight*0.1);
            new_popup.div.style.width = width+"px";
            new_popup.div.style.height = height+"px";
            new_popup.frame.style.display = "none";
            new_popup.open = false;
            on_minimize();
        } else {
            new_popup.div.style.left = "0px";
            new_popup.div.style.top = "0px";
            new_popup.div.style.width = (window.innerWidth-16)+"px";
            new_popup.div.style.height = (window.innerHeight-12)+"px";
            new_popup.div.style.transform = "none";
            new_popup.frame.style.display = "block";
            new_popup.open = true;
            on_maximize();
        }
    };
    new_popup.div.addEventListener("mouseover", ()=>{
        if (!new_popup.open) {
            new_popup.div.style.transform = "scale(1.05)";
            new_popup.div.style.boxShadow = "0px 6px 20px #0005"
        }
    })
    new_popup.div.addEventListener("mouseout", ()=>{
        if (!new_popup.open) {
            new_popup.div.style.transform = "scale(1)";
            new_popup.div.style.boxShadow = "0px 2px 12px #0006"
        }
    })
    popup_list.push(new_popup);
}
/**removes the popup with popup_id as id*/
function remPopup(popup_id) {
    for (let i = 0; i < popup_list.length; i++) {
        if (popup_list[i].id == popup_id) {
            popup_list[i].div.classList.add("remove-popup");
            setTimeout(() => {
                popup_list[i].div.remove();
                popup_list.splice(i, 1);
            }, 500);
            break;
        }
    }
}
/**removes all the popups*/
function remAllPopups(popup_id) {
    for (let i = 0; i < popup_list.length; i++) {
        popup_list[i].div.classList.add("remove-popup");
        setTimeout(() => {
            popup_list[0].div.remove();
            popup_list.splice(0, 1);
        }, 500);
    }
}