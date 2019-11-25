import sys
from google.cloud import automl_v1beta1
from google.cloud.automl_v1beta1.proto import service_pb2
import os
from PIL import Image
from google.oauth2 import service_account
import io

credential_path = "My First Project-16d5e4053210.json"
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = credential_path

ThrowName = ["swimming suit", "sandals", "sports shoes", "tote bag", "backpack", "baggage", "glasses", "watch", "underwear bra", "underwear panty", "one-piece", "hat", "shoes"]

ModelKey = {"pattern" : "ICN5140964119692188295", "pants_length" : "ICN9221879716894655070", "pants" : "ICN1435646272958429070", "shirts" : "ICN671259347501955927", "outer" : "ICN3162897506572894675",
            "t-shirts" : "ICN2694649581366444291", "t-shirts_length" : "ICN8706314141597844622","skirt" : "ICN6916473036674941451", "style" : "ICN6116847621121556535"}
project_id = "theta-reserve-248104"

test_num = 0

#def pre(image, name ,result_value, x1, y1, x2, y2):
def pre(image_url, name):
    test_num = 0
    
    image = Image.open(image_url)
    #image -> bytes
    imgByteArr = io.BytesIO()
    image.save(imgByteArr, format='PNG')
    content = imgByteArr.getvalue()
    
    array_data = []

    if name == 't-shirts' or name == 'shirts' or name =='outer':
        array_data.append('top')
        #type분석(2차)
        result_make(content, name, array_data)
    elif name == 'pants' or name == 'skirt':
        array_data.append('bottom')
        #type분석(2차)
        result_make(content, name, array_data)
    else:
        array_data.append(name)
        array_data.append(name)

    #length분석(추가)
    length_name = sleeved(name)
    if length_name != '' :
        result_make(content, length_name, array_data)
    else:
        array_data.append('null_object')
        
    #pattern분석(3차)
    pattern_name = pattern(name)
    if pattern_name != '' :
        result_make(content, pattern_name, array_data)
    else:
        array_data.append('null_object')

    #style분석(4차)
    style_name = style(name)
    if style_name != '' :
       result_make(content, style_name, array_data)
    else:
        array_data.append('null_object')

    array_diction = {
        "category":array_data[0],
        "type":name,
        "subclass":array_data[1],
        "pattern":array_data[3],
        "style":array_data[4],
        "length":array_data[2]}
    print(array_diction)
    test_num = 1
    return


def result_make(content, name, array_data):
    sco = 0.01
    object_name = ''
    for result in get_prediction(content, ModelKey[name]).payload:
        if float(result.classification.score) > sco:
            sco = float(result.classification.score)
            object_name = result.display_name
    array_data.append(object_name)

#length분석(상의 하의 한하여 길이 분석)
def sleeved(name):
    if name == 't-shirts' or name == 'shirts':
        return 't-shirts_length'
    elif name == 'pants':
        return 'pants_length'
    else :
        return ''

#pattern분석
def pattern(name):
    if name == 't-shirts' or name == 'shirts' or name == 'outer' or name == 'pants' or name == 'skirt':
        return 'pattern'
    else :
        return ''

#style분석
def style(name):
    if name == 't-shirts' or name == 'shirts' or name == 'outer' or name == 'pants' or name == 'skirt':
        return 'style'
    else :
        return ''

#name을 통해서 학습된 자료중 선택 분석
def get_prediction(content, model_id):
    prediction_client = automl_v1beta1.PredictionServiceClient()

    name = 'projects/{}/locations/us-central1/models/{}'.format(project_id, model_id)
    payload = {'image': {'image_bytes': content }}
    params = {"score_threshold": "0.2"}
    request = prediction_client.predict(name, payload, params)
    return request  # waits till request is returned
