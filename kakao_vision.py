import sys
import argparse
import requests
from PIL import Image, ImageDraw, ImageFont
from io import BytesIO
import os
API_URL = 'https://kapi.kakao.com/v1/vision/product/detect'
MYAPP_KEY = os.environ['KAKAO_API_KEY']
imagePath = sys.argv[1]
tag = sys.argv[2]
def detect_product_file(file_directory):
    headers = {'Authorization': 'KakaoAK {}'.format(MYAPP_KEY)}

    try:
        #보내고자하는 파일을 'rb'(바이너리 리드)방식 열고
        files = open(file_directory, 'rb')

        # 파이썬 딕셔너리 형식으로 file 설정
        upload = {'file':files}
        
        resp = requests.post(API_URL, headers=headers, files = upload)
        resp.raise_for_status()
        return resp.json()
    except Exception as e:
        print(str(e))
        sys.exit(0)

def show_products_file(file_directory, detection_result):
    try:
        file_jpgdata = open(file_directory, 'rb')
        image = Image.open(file_jpgdata)
    except Exception as e:
        print(str(e))
        sys.exit(0)


    draw = ImageDraw.Draw(image)
    number = 1
    try :
        for obj in detection_result['result']['objects']:
            imgname = "public/upload/kakao/"+tag +""+ str(number) + '.png'
            x1 = int(obj['x1']*image.width)
            y1 = int(obj['y1']*image.height)
            x2 = int(obj['x2']*image.width)


            y2 = int(obj['y2']*image.height)
            tempImage = image.crop((x1-20, y1-20, x2+20, y2+20))
            resize_image = tempImage.resize((400, 300))
            resize_image.save(imgname)
            print(obj['class'])
            number = number + 1
    except Exception as e:
        print(e)
    del draw

    return image


if __name__ == "__main__":
    img = imagePath
    #img = './aaa.jpg'
    # 파일로 vision api에 요청을 보냅니다
    detection_result = detect_product_file(img)
    image = show_products_file(img, detection_result)

