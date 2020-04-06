Pour jouer en ligne:
	Allez sur https://paulux06.github.io !

Pour jouer en local:
    - Installer NodeJS:

        - Windows:
            télécharger l'installateur sur https://nodejs.org/dist/v12.16.1/node-v12.16.1-x64.msi
            redémarrer l'ordinateur

        - Linux (Debian):
            ouvrir un terminal, et taper [wget -qO- https://deb.nodesource.com/setup_12.x | sudo -E bash -]
            puis [sudo apt install -y nodejs] et [reboot]
        
    - Demarrer le serveur local:

        - Windows:
            démarrer une fenetre PowerShell dans ce dossier (Shift + Clic Droit sur le dossier => Ouvrir PowerShell)
            taper [node ./multiplayer.js]

        - Linux (Debian):
            Ouvrir un terminal dans ce dossier
            taper [node ./multiplayer.js]

    - Jouer:
        Ouvrir un navigateur Internet
        Taper [localhost] pour adresse URL (ou l'adresse du PC-Serveur)
	Avoir son adresse IP: [Windows: cmd => "ip-config"] [Linux: terminal: "hostname -I"]

Librairies externes utilisées:
    - Express.js (pour la gestion des ressources / fichiers)
    - Socket.io (pour la gestion des requêtes serveur / client)
