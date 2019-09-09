from __future__ import print_function
import sys
import argparse
import requests
#pip install requests
from PIL import Image, ImageDraw, ImageFont, ImageTk
#pip install image
from io import BytesIO
import matplotlib.pyplot as plt
#pip install matplotlib
import io 
import tkinter
import numpy as np
import cv2 as cv
import os
#pip install opencv-python



imagePath = sys.argv[1]
tag = sys.argv[2]

class App():
    BLUE = [255,0,0]        # rectangle color
    RED = [0,0,255]         # PR BG
    GREEN = [0,255,0]       # PR FG
    BLACK = [0,0,0]         # sure BG
    WHITE = [255,255,255]   # sure FG

    DRAW_BG = {'color' : BLACK, 'val' : 0}
    DRAW_FG = {'color' : WHITE, 'val' : 1}
    DRAW_PR_FG = {'color' : GREEN, 'val' : 3}
    DRAW_PR_BG = {'color' : RED, 'val' : 2}

    # setting up flags
    rect = (0,0,1,1)
    drawing = False         # flag for drawing curves
    rectangle = False       # flag for drawing rect
    rect_over = False       # flag to check if rect drawn
    rect_or_mask = 100      # flag for selecting rect or mask mode
    value = DRAW_FG         # drawing initialized to FG
    thickness = 3           # brush thickness
    
    def convert_to_tkimage(self):

        gray = cv.cvtColor(self.src, cv.COLOR_BGR2GRAY)
        _, binary = cv.threshold(gray, 100, 255, cv.THRESH_BINARY)
    
        img = Image.fromarray(binary)
        imgtk = ImageTk.PhotoImage(image=img)
    
        label2.config(image=imgtk)
        label2.image = imgtk
    
    def __init__(self,window):
        # Loading images
        #if len(sys.argv) == 2:
          #  filename = sys.argv[1] # for drawing purposes
        #else:
        #print("No input image given, so loading default image, lena.jpg \n")
        #print("Correct Usage: python grabcut.py <filename> \n")
        filename = imagePath
        
        self.img = cv.imread(cv.samples.findFile(filename))
        self.img = cv.resize(self.img, dsize=(635, 550), interpolation=cv.INTER_AREA)
        self.img2 = self.img.copy()                               # a copy of original image
        self.img5 = self.img.copy()
        self.mask = np.zeros(self.img.shape[:2], dtype = np.uint8) # mask initialized to PR_BG
        #self.mask = np.zeros(self.img.shape[:2], np.uint8)
        self.output = np.zeros(self.img.shape, np.uint8)           # output image to be shown

       
        #src = cv.imread('./6215934111.png')
        #self.src = cv.resize(self.img, (320, 400))
        #self.src = cv.resize(self.img2, (320, 400))

        #self.img = cv.cvtColor(self.src, cv.COLOR_BGR2RGB)
        #self.img2 = cv.cvtColor(self.src, cv.COLOR_BGR2RGB)
        self.img = self.img[:,:,::-1]
        self.img2 = self.img2[:,:,::-1]
        self.img3 = Image.fromarray(self.img)
        self.img4 = Image.fromarray(self.img2)
        self.imgtk = ImageTk.PhotoImage(image=self.img3)
        self.imgtk2 = ImageTk.PhotoImage(image=self.img4)

        self.label = tkinter.Label(window, image=self.imgtk)
        self.label.grid(row=0, column=0)
        
        self.label2 = tkinter.Label(window, image=self.imgtk2)
        self.label2.grid(row=0, column=1)


        button1 = tkinter.Button(window, text="옷 네모칸 치기")
        button1.grid(row=1, column=0)
        button3 = tkinter.Button(window, text="이미지 짜르기")
        button3.grid(row=1, column=1)
        button2 = tkinter.Button(window, text="색상 칠하기")
        button2.grid(row=2, column=0)
        button = tkinter.Button(window, text="검은색 칠하기")
        button.grid(row=2, column=1 )
        button4 = tkinter.Button(window, text="하얀색 칠하기")
        button4.grid(row=3, column=0)
        button5 = tkinter.Button(window, text="저장하기")
        button5.grid(row=3, column=1)

        button5.bind("<Button-1>",self.imagesave)
        button4.bind("<Button-1>",self.clickwhite)
        button.bind("<Button-1>",self.clickblack)
        button2.bind("<Button-1>",self.clickcolor)
        button3.bind("<Button-1>",self.nuggi)
        button1.bind("<Button-1>",self.clickright)
        #self.label.bind("<Button-1>",self.clickinit,"+")
        #self.label.bind("<B1-Motion>",self.onclick,"+")
        #self.label.bind("<ButtonRelease-1>",self.offclick,"+")
        #self.a=self.label.bind("<Button-1>",self.onpress,"+")
        #self.b=self.label.bind("<B1-Motion>",self.onpressing,"+")
        #self.c=self.label.bind("<ButtonRelease-1>",self.offpress,"+")

    def imagesave(self,event):
        self.img2 = cv.cvtColor(self.img2, cv.COLOR_BGR2RGB)
        #image 크기 400x300으로 조정
        self.img2 = cv.resize(self.img2, dsize=(400, 300), interpolation=cv.INTER_AREA)
        cv.imwrite('public/upload/python/'+tag+".png", self.img2)
        results={
            'data':self.img2
        }
        #print("저장 완료")
        window.quit()

    def clickwhite(self,event):
        #print(" mark background regions with left mouse button \n")
        self.value = self.DRAW_FG
    
    def clickblack(self,event):
        #print(" mark background regions with left mouse button \n")
        self.value =self.DRAW_BG 

    def nuggi(self,event):
        try:
            if (self.rect_or_mask == 0):         # grabcut with rect
                bgdmodel = np.zeros((1, 65), np.float64)
                fgdmodel = np.zeros((1, 65), np.float64)
                cv.grabCut(self.img5, self.mask, self.rect, bgdmodel, fgdmodel, 1, cv.GC_INIT_WITH_RECT)
                #self.mask2 = np.where((self.mask==2)|(self.mask==0), 0, 1).astype('uint8')
                #self.img = self.img*self.mask2[:,:, np.newaxis]
                self.mask2 = np.where((self.mask==1) + (self.mask==3), 255, 0).astype('uint8')
                self.img2 = cv.bitwise_and(self.img5, self.img5, mask=self.mask2)
                self.img2 = self.img2[:,:,::-1]
                self.img4 = Image.fromarray(self.img2)
                self.imgtk2 = ImageTk.PhotoImage(image=self.img4)
                self.label2.configure(image=self.imgtk2)
                self.rect_or_mask = 1
                #print(self.rect)
            elif self.rect_or_mask == 1:         # grabcut with mask
                bgdmodel = np.zeros((1, 65), np.float64)
                fgdmodel = np.zeros((1, 65), np.float64)
                cv.grabCut(self.img5, self.mask, self.rect, bgdmodel, fgdmodel, 1, cv.GC_INIT_WITH_MASK)
                self.mask2 = np.where((self.mask==1) + (self.mask==3), 255, 0).astype('uint8')
                self.img2 = cv.bitwise_and(self.img5, self.img5, mask=self.mask2)
                self.img2 = self.img2[:,:,::-1]
                self.img4 = Image.fromarray(self.img2)
                self.imgtk2 = ImageTk.PhotoImage(image=self.img4)
                self.label2.configure(image=self.imgtk2)

        except:
            import traceback
            traceback.print_exc()


    def clickcolor(self,event):
        self.drawing = True
        self.label.unbind("<Button-1>")
        self.label.unbind("<B1-Motion>")
        self.label.unbind("<ButtonRelease-1>")
        self.label.bind("<Button-1>",self.onpress,"+")
        self.label.bind("<B1-Motion>",self.onpressing,"+")
        self.label.bind("<ButtonRelease-1>",self.offpress,"+")
        #print(self.drawing)

    def offclick(self, event):
        self.rectangle = False
        self.rect_over = True
        cv.rectangle(self.img, (self.ix, self.iy), (event.x, event.y), self.BLUE, 2)
        self.rect = (min(self.ix, event.x), min(self.iy, event.y), abs(self.ix - event.x), abs(self.iy - event.y))
        self.rect_or_mask = 0
        self.label.unbind("<Button-1>")
        self.label.unbind("<B1-Motion>")
        self.label.unbind("<ButtonRelease-1>")
        #print(" Now press the key 'n' a few times until no further change \n")

    def clickinit(self,event):
        self.ix, self.iy = event.x,event.y
        
        # input and output windows
    def clickright(self, event):
        self.label.unbind("<Button-1>")
        self.label.unbind("<B1-Motion>")
        self.label.unbind("<ButtonRelease-1>")
        self.label.bind("<Button-1>",self.clickinit,"+")
        self.label.bind("<B1-Motion>",self.onclick,"+")
        self.label.bind("<ButtonRelease-1>",self.offclick,"+")
        self.rectangle = True
        #print(self.rectangle)
    def onclick(self,event):
        event.widget.focus_set()  # give keyboard focus to the label
        #event.widget.bind('<Key>', edit)
        #print("눌리고 있니?")
        if self.rectangle == True:
            #print("그리는중")
            self.img = self.img2.copy()
            cv.rectangle(self.img, (self.ix, self.iy), (event.x, event.y), self.BLUE, 2)
            self.rect = (min(self.ix, event.x), min(self.iy, event.y), abs(self.ix - event.x), abs(self.iy - event.y))
            self.rect_or_mask = 0
            self.img3 = Image.fromarray(self.img)
            self.imgtk = ImageTk.PhotoImage(image=self.img3)
            #self.label = tkinter.Label(window, image=self.imgtk)
            self.label.configure(image=self.imgtk)
            #self.label.grid(row=0, column=0)
            
            
    def onpress(self,event):
        if self.rect_over == False:
            self.rect_over=False
           # print("first draw rectangle \n")
        else:
            self.drawing = True
            cv.circle(self.img, (event.x,event.y), self.thickness, self.value['color'], -1)
            cv.circle(self.mask, (event.x,event.y), self.thickness, self.value['val'], -1)
            self.img3 = Image.fromarray(self.img)
            self.imgtk = ImageTk.PhotoImage(image=self.img3)
            #self.label = tkinter.Label(window, image=self.imgtk)
            self.label.configure(image=self.imgtk)


    def onpressing(self,event):
        if self.drawing == True:
            cv.circle(self.img, (event.x, event.y), self.thickness, self.value['color'], -1)
            cv.circle(self.mask, (event.x, event.y), self.thickness, self.value['val'], -1)
            self.img3 = Image.fromarray(self.img)
            self.imgtk = ImageTk.PhotoImage(image=self.img3)
            #self.label = tkinter.Label(window, image=self.imgtk)
            self.label.configure(image=self.imgtk)


    def offpress(self,event):
        if self.drawing == True:
            self.drawing = False
            cv.circle(self.img, (event.x, event.y), self.thickness, self.value['color'], -1)
            cv.circle(self.mask, (event.x, event.y), self.thickness, self.value['val'], -1)
            self.img3 = Image.fromarray(self.img)
            self.imgtk = ImageTk.PhotoImage(image=self.img3)
            #self.label = tkinter.Label(window, image=self.imgtk)
            self.label.configure(image=self.imgtk)

if __name__ == '__main__':
    window=tkinter.Tk()
    window.title("YUN DAE HEE")
    window.geometry("{0}x{1}+0+0".format(window.winfo_screenwidth(), window.winfo_screenheight()))
    #window.overrideredirect(True)
    App(window)
    window.mainloop()
    #print(__doc__)
    #App().run()
    cv.destroyAllWindows()





img = cv.imread('public/upload/python/'+tag+".png",cv.IMREAD_UNCHANGED)

data = np.reshape(img, (-1,3))
data = np.float32(data)

criteria = (cv.TERM_CRITERIA_EPS + cv.TERM_CRITERIA_MAX_ITER, 10, 1.0)
flags = cv.KMEANS_RANDOM_CENTERS
compactness,labels,centers = cv.kmeans(data,1,None,criteria,10,flags)
print('bgr({})'.format(centers[0].astype(np.int32)))



API_URL = 'https://kapi.kakao.com/v1/vision/product/detect'
MYAPP_KEY = os.environ['KAKAO_API_KEY']

def detect_product(filename):
    headers = {'Authorization': 'KakaoAK {}'.format(MYAPP_KEY)}

    try:
        files = { 'file' : open(filename, 'rb')}
        resp = requests.post(API_URL, headers=headers, files=files)
        resp.raise_for_status()
        return resp.json()
    except Exception as e:
        print(str(e))
        sys.exit(0)

def show_products(filename, detection_result):
    try:
        #image_resp = requests.get(filename)
        #image_resp.raise_for_status()
        #file_jpgdata = BytesIO(image_resp.content)
        image = Image.open(filename)
        
    except Exception as e:
        print(str(e))
        sys.exit(0)


    draw = ImageDraw.Draw(image)
    for val in detection_result.values():
        if 'objects' in val:
            state = True
        else:
            state = False
    #for val in detection_result.values():
     #   if val['objects'] is None:
      #      state = False
       # else:
        #    state = True

    if(state == True):
        for obj in detection_result['result']['objects']:
            global x1,y1,x2,y2
            x1 = int(obj['x1']*image.width)
            y1 = int(obj['y1']*image.height)
            x2 = int(obj['x2']*image.width)
            y2 = int(obj['y2']*image.height)
            draw.rectangle([(x1,y1), (x2, y2)], fill=None, outline=(255,0,0,255))
            draw.text((x1+5,y1+5), obj['class'], (255,0,0))
            area=(x1,y1,x2,y2)
            #print(x1)
            #print(y1)
            #print(x2)
            #print(y2)
            print(obj['class'])
            img = cv.imread(imagePath)
            crop_img = img[y1:y2, x1:x2]
            cv.imwrite('public/upload/kakao/'+tag+".png", crop_img)
            global kakaoPath
            kakaoPath = "public/upload/kakao/"+tag+".png"
            #crop_img = image.crop(area) 
            #b = io.BytesIO()
        
            #crop_img.save(b, format="PNG") 
            #crop_img.save("public/upload/kakao/"+tag+".png") 

    else:
        print("not clothes")

    del draw

    return image

if __name__ == "__main__":
   # parser = argparse.ArgumentParser(description='Detect Products.')
   # parser.add_argument('image_file', type=str, nargs='?',
    #    default=imagePath,
     #   help='image file to show product\'s rect')

    #args = parser.parse_args()
    imagePath =sys.argv[1]
    detection_result = detect_product(imagePath)
    image = show_products(imagePath, detection_result)
    #image.show()




#print(str(results))
sys.stdout.flush()
