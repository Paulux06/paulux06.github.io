import pygame, re
pygame.init()

pygame.display.set_caption("Map Editor")
icon = pygame.image.load('./ressources/icon.png')
pygame.display.set_icon(icon)

fichier = open('./ressources/map.txt', 'r')
fich = fichier.read()
data = fich.replace("\n", "").split(',')
dataSize = [int(len(data)/len(fich.split('\n'))), len(fich.split('\n'))]

for i in range(0, len(data)):
    try:
        data[i] = int(data[i].replace(" ", ''))
    except:
        data[i] = str(data[i])
fichier.close()

clock = pygame.time.Clock()

def show():
    for i in carte:
        print(i)

class texte:
    def __init__(self):
        self.text = ''
        self.font = pygame.font.SysFont('serif', 20)
    
    def refresh(self, s, mp):
        t = self.font.render(self.text, True, [255, 255, 255])
        s.blit(t, [10, int(dataSize[1])*scale+3*scale-t.get_height()/2])
        return self

    def setText(self, text):
        self.text = text
        return self

class Bloc:
    def __init__(self, number, x, y):
        self.x = x
        self.y = y
        self.n = number
        self.selected = False
    
    def refresh(self, s):
        if self.selected:
            if type(self.n) == str:
                pygame.draw.rect(s, [0, 80, 0], [self.x-scale/2, self.y-scale/2, scale, scale])
                return
            if self.n == 0:
                pygame.draw.rect(s, [160-self.n*160, 0, 0], [self.x-scale/2, self.y-scale/2, scale, scale], 1)
                return
            if self.n == 1:
                pygame.draw.rect(s, [255-self.n*160, 0, 0], [self.x-scale/2, self.y-scale/2, scale, scale])
                return
            if self.n == 2:
                pygame.draw.rect(s, [244-self.n*80, 0, 0], [self.x-scale/2, self.y-scale/2, scale, scale])
                return
            if self.n == 3:
                pygame.draw.rect(s, [180, 30, 30], [self.x-scale/2, self.y-scale/2, scale, scale])
                return
            if self.n == 5:
                pygame.draw.rect(s, [180, 180, 180], [self.x-scale/2, self.y-scale/2, scale, scale])
                return
            if self.n == 6:
                pygame.draw.rect(s, [90, 90, 90], [self.x-scale/2, self.y-scale/2, scale, scale])
                return
        else:
            if type(self.n) == str:
                pygame.draw.rect(s, [0, 180, 0], [self.x-scale/2, self.y-scale/2, scale, scale])
                return
            if self.n == 0:
                return False
            if self.n == 1:
                pygame.draw.rect(s, [255-self.n*255, 40-self.n*40, 140-self.n*140], [self.x-scale/2, self.y-scale/2, scale, scale])
                return
            if self.n == 2:
                pygame.draw.rect(s, [255-self.n*120, 40-self.n*10, 90-self.n*20], [self.x-scale/2, self.y-scale/2, scale, scale])
                return
            if self.n == 3:
                pygame.draw.rect(s, [220, 90, 90], [self.x-scale/2, self.y-scale/2, scale, scale])
                return
            if self.n == 5:
                pygame.draw.rect(s, [90, 90, 90], [self.x-scale/2, self.y-scale/2, scale, scale])
                return
            if self.n == 6:
                pygame.draw.rect(s, [60, 60, 60], [self.x-scale/2, self.y-scale/2, scale, scale])
                return

scene = []
interface = [texte()]
carte = []
mousePos = [0, 0]
blocNmbr = 1
mousePressed = [0, 0, 0]
scale = 7
screen = pygame.display.set_mode([int(dataSize[0])*scale, int(dataSize[1])*scale+6*scale]) #map size * 15 (+100px en y pour l'interface)

interface[0].setText('Bloc: construction')

def start(s=10):
    global scale
    global scene
    scale = s
    scene = []
    interface = []
    screen = pygame.display.set_mode([int(dataSize[0])*scale, int(dataSize[1])*scale+6*scale]) #map size * 15 (+100px en y pour l'interface)
    for y in range(0, int(dataSize[1])):
        col = []
        for x in range(0, int(dataSize[0])):
            col.append(data[x+y*int(dataSize[0])])
            scene.append(Bloc(data[x+y*int(dataSize[0])], x*scale+scale/2, y*scale+scale/2))
        carte.append(col)

start(scale)

def keep(liste):
    l = [liste[0], liste[1]]
    if l[0] < 0:
        l[0] = 0
    if l[0] > int(dataSize[0])*scale-1:
        l[0] = int(dataSize[0])*scale-1
    if l[1] < 0:
        l[1] = 0
    if l[1] > int(dataSize[1])*scale-1:
        l[1] = int(dataSize[1])*scale-1
    return l

def refreshScreen():
    screen.fill([0, 70, 100])

    for item in scene:
        if mousePos[0] < item.x+scale/2 and mousePos[0] > item.x-scale/2 and mousePos[1] < item.y+scale/2 and mousePos[1] > item.y-scale/2:
            item.selected = True
        else:
            item.selected = False
        item.refresh(screen)

    pygame.draw.rect(screen, [40, 40, 40], [0, int(dataSize[1])*scale, int(dataSize[0])*scale, int(dataSize[1])*scale+6*scale])
    for item in interface:
        item.refresh(screen, mousePos)

    clock.tick(60)
    pygame.display.flip()

placeBloc = False
removeBloc = False
selectMode = False
startMousePos = [0, 0]

def fillOfBlocs(first, second):
    first[1] = min(first[1], scale*int(dataSize[1]))
    second[1] = min(second[1], scale*int(dataSize[1]))
    for x in range(min(int((first[0]/scale)*scale), (int(second[0]/scale)*scale)), max(int((first[0]/scale)*scale), (int(second[0]/scale)*scale))+scale, scale):
        refreshScreen()
        for y in range(min(int((first[1]/scale)*scale), (int(second[1]/scale)*scale)), max(int((first[1]/scale)*scale), (int(second[1]/scale)*scale))+scale, scale):
            carte[int(y/scale)][int(x/scale)] = blocNmbr
            for b in scene:
                if b.x == int(x/scale)*scale+scale/2 and b.y == int(y/scale)*scale+scale/2:
                    b.n = blocNmbr

mainRun = True
while mainRun:
    for e in pygame.event.get():
        if e.type == pygame.QUIT:
            mainRun = False
        if e.type == pygame.MOUSEBUTTONDOWN:
            if e.button == pygame.BUTTON_LEFT:
                placeBloc = True
            if e.button == pygame.BUTTON_RIGHT:
                removeBloc = True
            if e.button == pygame.BUTTON_WHEELDOWN:
                blocNmbr -= 1
            if e.button == pygame.BUTTON_WHEELUP:
                blocNmbr += 1
        if e.type == pygame.MOUSEBUTTONUP:
            if e.button == pygame.BUTTON_LEFT:
                placeBloc = False
            if e.button == pygame.BUTTON_RIGHT:
                removeBloc = False
        if e.type == pygame.KEYDOWN and e.key == pygame.K_LCTRL:
            selectMode = True
            startMousePos = mousePos
        if e.type == pygame.KEYUP and e.key == pygame.K_LCTRL:
            selectMode = False
            fillOfBlocs(startMousePos, mousePos)

    blocNmbr = min(max(blocNmbr, 0), 7)
    if blocNmbr == 0:
        interface[0].setText('Bloc: vide')
    if blocNmbr == 1:
        interface[0].setText('Bloc: construction')
    if blocNmbr == 2:
        interface[0].setText('Bloc: decoration')
    if blocNmbr == 3:
        interface[0].setText('Bloc: piece')
    if blocNmbr == 4:
        interface[0].setText('Bloc: texte')
    if blocNmbr == 5:
        interface[0].setText('Bloc: pierre')
    if blocNmbr == 6:
        interface[0].setText('Bloc: lave')
    if blocNmbr == 7:
        interface[0].setText('Bloc: sortie')
    #if blocNmbr == 8:
    #    interface[0].setText('Bloc: boutton')
    #if blocNmbr == 9:
    #    interface[0].setText('Bloc: porte')

    mousePressed = [pygame.mouse.get_pressed()[0], pygame.mouse.get_pressed()[1], pygame.mouse.get_pressed()[2]]
    mousePos = [pygame.mouse.get_pos()[0], pygame.mouse.get_pos()[1]]
    mCarte = keep(mousePos)
    refreshScreen()

    if placeBloc and mousePos[1] < int(dataSize[1])*scale:
        for b in scene:
                    if b.x == int(mCarte[0]/scale)*scale+scale/2 and b.y == int(mCarte[1]/scale)*scale+scale/2:
                        b.n = blocNmbr
                        if blocNmbr == 4:
                            t = pygame.font.SysFont('serif', 30).render('waiting for input text', True, [255, 255, 255])
                            screen.blit(t, [10, 200-t.get_height()/2])
                            pygame.display.flip()
                            b.n = input('texte: ').replace(',', "")
                        carte[int(mCarte[1]/scale)][int(mCarte[0]/scale)] = b.n

    if removeBloc and mousePos[1] < int(dataSize[1])*scale:
        for b in scene:
                    if b.x == int(mCarte[0]/scale)*scale+scale/2 and b.y == int(mCarte[1]/scale)*scale+scale/2:
                        b.n = 0
                        carte[int(mCarte[1]/scale)][int(mCarte[0]/scale)] = 0

newCarte = ''
state = 0
for i in range(0, len(carte)):
    for e in range(0, len(carte[i])):
        if state > int(dataSize[0])-1:
            newCarte += '\n'
            state = 0   
        newCarte += str(carte[i][e])+', '
        state += 1
newCarte = newCarte[0:len(newCarte)-2]
fichier = open('./ressources/map.txt', 'w')
fichier.write(newCarte)
fichier.close()