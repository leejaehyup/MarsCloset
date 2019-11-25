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
import time
import numpy as np
import automl_analysis
import cv2 as cv
import os
import threading
#pip install opencv-python

'''
automl_analysis.pre(image_url, name)
'''
imagePath = sys.argv[1]
tag = sys.argv[2]
kakaoTitle = sys.argv[3]
Thread = threading.Thread(target=automl_analysis.pre, args=(imagePath, kakaoTitle))
Thread.start()
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
        #filename = "public/images/01.png"
        
        self.img = cv.imread(cv.samples.findFile(filename))
        self.img = cv.resize(self.img, dsize=(400, 300), interpolation=cv.INTER_AREA)
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

        #UI
        self.emptylabel3 = tkinter.Label(window, width=20, pady=10, bg="#000")
        self.emptylabel3.grid(row=0, column=0, columnspan=20)
        self.emptylabel3 = tkinter.Label(window, width=20, pady=10, bg="#000")
        self.emptylabel3.grid(row=0, column=0, columnspan=20)

        self.emptylabel1 = tkinter.Label(window, width=20, pady=10, bg="#000", text="before", fg="#fff", font=('나눔바른고딕',17,'bold'))
        self.emptylabel1.grid(row=1, column=0, columnspan=10)
        self.emptylabel1 = tkinter.Label(window, width=20, pady=10, bg="#000", text="after", fg="#fff", font=('나눔바른고딕',17,'bold'))
        self.emptylabel1.grid(row=1, column=10, columnspan=10)

        self.label = tkinter.Label(window, image=self.imgtk)
        self.label.grid(row=2, column=0, columnspan=10)
        self.label2 = tkinter.Label(window, image=self.imgtk2)
        self.label2.grid(row=2, column=10, columnspan=10)

        self.emptylabel = tkinter.Label(window, width=20, pady=10, bg="#000")
        self.emptylabel.grid(row=3, column=0, columnspan=20)

        frame1 = tkinter.Frame(window, relief="solid", bd=1, bg="#c33232", width=30, pady=2, padx=2)
        frame1.grid(row=4, column=4, columnspan=4)
        button1 = tkinter.Button(frame1, text="영역 선택하기", width=26, pady=10, bg="#f9f9f9", fg="#000", relief="solid", overrelief="solid", font=('나눔바른고딕',12,'normal'))
        button1.pack(side="left")

        frame2 = tkinter.Frame(window, relief="solid", bd=1, bg="#fff", width=30, pady=2, padx=2)
        frame2.grid(row=4, column=8, columnspan=4)
        button3 = tkinter.Button(frame2, text="이미지 짜르기", width=26, pady=10, bg="#f9f9f9", fg="#000", relief="solid", overrelief="solid", font=('나눔바른고딕',12,'normal'))
        button3.pack(side="left")

        frame3 = tkinter.Frame(window, relief="solid", bd=1, bg="#518b4c", width=20, pady=2, padx=2)
        frame3.grid(row=4, column=13, columnspan=3)
        button5 = tkinter.Button(frame3, text="저장하기", width=26, pady=10, bg="#518b4c", fg="#fff", relief="solid", overrelief="solid", font=('나눔바른고딕',12,'normal'))
        button5.pack(side="left")

        self.emptylabel1 = tkinter.Label(window, width=20, pady=5, bg="#000")
        self.emptylabel1.grid(row=5, column=0, columnspan=20)

        frame6 = tkinter.Frame(window, relief="solid", bd=1, bg="#fff", width=18, pady=1, padx=1)
        frame6.grid(row=6, column=6, columnspan=4)
        button2 = tkinter.Button(frame6, relief="flat", width=30, pady=10, bg="#fff", text="색상 선택", font=('나눔바른고딕',12,'normal'))
        button2.pack(side="left")

        frame4 = tkinter.Frame(window, relief="solid", bd=1, bg="#fff", width=18, pady=1, padx=1)
        frame4.grid(row=7, column=6, columnspan=2)
        button = tkinter.Button(frame4, text="검은색", width=14, pady=10, bg="#000", fg="#fff", relief="solid", overrelief="solid", font=('나눔바른고딕',12,'normal'))
        button.pack(side="left")
        
        frame5 = tkinter.Frame(window, relief="solid", bd=1, bg="#fff", width=18, pady=1, padx=1)
        frame5.grid(row=7, column=8, columnspan=2)
        button4 = tkinter.Button(frame5, text="하얀색", width=14, pady=10, bg="#fff", fg="#000", relief="solid", overrelief="solid", font=('나눔바른고딕',12,'normal'))
        button4.pack(side="left")

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
    window.attributes("-topmost", True)
    window.configure(bg='#000')
    window.overrideredirect(True)
    App(window)
    window.mainloop()
    #print(__doc__)
    #App().run()
    cv.destroyAllWindows()


sys.stdout.flush()

