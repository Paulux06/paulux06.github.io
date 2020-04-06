from PIL import Image, GifImagePlugin
path = "./ressources/"+input('texture GIF name: ')
try:
    gif = Image.open(path)
except:
    print('Erreur, aucun fichier nommé '+path)
    quit()
animLength = int(input('Animation frames number ('+str(gif.n_frames)+'): '))
textureSize = input('Texture size (16x16): ').replace('(', '').replace(')', '').split('x')
textureSize[0], textureSize[1] = int(textureSize[0]), int(textureSize[1])
gif = Image.open(path)
animation = []
gif.resize(textureSize)

for f in range(0, gif.n_frames, int(gif.n_frames/animLength)):
    gif.seek(int(f))
    im = gif.resize(textureSize, Image.NEAREST).copy()
    animation.append(im)
final = Image.new('RGBA', (textureSize[1]*(animLength-1), textureSize[0]), (0, 0, 0, 0))

for f in range(0, len(animation)-1):
    offset = [f*textureSize[1], 0]
    final.paste(animation[f], offset)

datas = final.getdata()

newData = []
for item in datas:
    if item[0] > 245 and item[1] > 245 and item[2] > 245:
        newData.append( (item[0], item[1], item[2], 0) )
    else:
        if not item[3] < 20:
            newData.append( (item[0], item[1], item[2], min(int(item[0]+item[1]+item[2]), 255)) )
        else:
            newData.append( (item[0], item[1], item[2], 0) )
final.putdata(newData)

fileName = input('Saved texture name: ')
final.save('./ressources/'+fileName, "PNG")