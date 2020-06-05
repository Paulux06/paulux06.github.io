window.onload = function() {
    this.header(0)

    var presentation =
    [
        {
            title: "Projets",
            exemples:
            [
                {
                    title: "Calculatrice TI",
                    description: "Retrouvez tout mes programmes, ressources, aides pour développer des applications sur TI 83 PCE !",
                    link: "./projects/TI/index.html"
                },
                {
                    title: "Processors",
                    description: "Un petit jeu innovant, en continuelle amélioration, et disponible sur Windows, Linux et Android !",
                    link: "./projects/Processors/index.html"
                }
            ],
            link: "./projects/index.html"
        },
        {
            title: "Réseaux",
            exemples:
            [
                {
                    title: "Discord",
                    description: "Vous aimez programmer, ou vous voulez apprendre ? Rejoinez mon serveur Discord: VIP Devs !"
                },
                {
                    title: "Youtube",
                    description: "Je suis pas très actif, mais si tu veut passer voir mes vidéos il n'y a pas de soucis !"
                }
            ]
        }
    ]

    for (let i = 0; i < presentation.length; i++) {
        var panneau = this.document.createElement('div')
        panneau.id = "panneau"
        var titleDIV = this.document.createElement('div')
        titleDIV.id = "titleDIV"
        var title = this.document.createElement('h2')
        title.id = "panneau"
        title.style.color = this.MINT_DARK
        title.innerHTML = presentation[i].title
        titleDIV.appendChild(title)
        panneau.appendChild(titleDIV)

        var contentDIV = this.document.createElement('div')
        contentDIV.id = "contentDIV"

        for (let e = 0; e < presentation[i].exemples.length; e++) {
            var tuile = this.document.createElement('div')
            tuile.id = "tuile"
            tuile.style.backgroundColor = this.DARKGRAY_DARK
            var titre = this.document.createElement('h3')
            titre.id = "tuile"
            titre.style.color = this.MINT_DARK
            titre.innerHTML = presentation[i].exemples[e].title
            tuile.appendChild(titre)
            var desc = this.document.createElement('p')
            desc.id = "tuile"
            desc.style.color = this.MINT_DARK
            desc.innerHTML = presentation[i].exemples[e].description
            tuile.appendChild(desc)
            contentDIV.appendChild(tuile)
        }
        panneau.appendChild(contentDIV)
        panneau.style.backgroundColor = this.DARKGRAY_DARK
        document.getElementById('content').appendChild(panneau)
    }

    this.showContent()
}