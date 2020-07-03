function getVoteNmb()
{
    var serverToken = "sYXVbA0eUuwCvK9";
    var url = "https://serveur-prive.net/api/stats/json/"+serverToken+"/vote";
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("votes-counter").innerHTML = "Votes sur serveur-prive.net: "+JSON.parse(this.responseText).data;
        };
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    setTimeout(getVoteNmb, 10000);
}