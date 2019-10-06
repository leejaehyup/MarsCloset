import random
import pymysql.cursors

'''
DB에 임의의 데이터 집어넣는 코드
'''

# MySQL Connection 연결
conn = pymysql.connect(host='localhost',
                       port=3306, user='root', passwd='apmsetup', db='Closet', charset='utf8')


curs = conn.cursor()



subclass1 = ["t-shirts", "shirts"]
subclass2 = ["logn sleeve", "short sleeve", "sleeveless"]
subclass3 = ["box", "crop", "halter", "hoody", "mantoman", "neat"]
subclass4 = ["printing", "dot", "leopard", "race", "basic", "stripe", "check", "camouflage"]
Color = ["colorful", "lucid", "natural", "stiff", "strong", "warm", "zingzy"]
season = ["W", "S", "F", "WS", "WF", "WU", "SF", "SU", "FU", "WSF", "WFU", "SFU", "SFU", "SFU", "SFU", "SFU", "SFU"]

for i in range(5, 20):
    num2 = random.randrange(0,len(subclass2))  #sub2
    num3 = random.randrange(0,len(subclass3))  #sub3
    num4 = random.randrange(0,len(subclass4))  #sub4
    num5 = random.randrange(0,len(Color))  #color
    num6 = random.randrange(0,len(season)) #season
    sql = "insert into dcloset VALUES ('%s', '%s', 'mars', 'top', '%s', '%s', 1, NULL, '%s', '%s', '%s', '%s')"%(i, i, subclass1[0], Color[num5], subclass2[num2], subclass3[num3], subclass4[num4], season[num6])
    #print(sql)
    curs.execute(sql)
    
#shirts
subclass2 = ["long", "short"]
subclass3 = ["business", "casual"]

for i in range(20, 40):
    num2 = random.randrange(0,len(subclass2))  #sub2
    num3 = random.randrange(0,len(subclass3))  #sub3
    num4 = random.randrange(0,len(subclass4))  #sub4
    num5 = random.randrange(0,len(Color))  #color
    num6 = random.randrange(0,len(season)) #season
    sql = "insert into dcloset VALUES ('%s', '%s', 'mars', 'top', '%s', '%s', 1, NULL, '%s', '%s', '%s', '%s');"%(i, i, subclass1[1], Color[num5], subclass2[num2], subclass3[num3], subclass4[num4], season[num6])
    #print(sql)
    curs.execute(sql)

# 바지
subclass1 = ["pants", "skirt"]
subclass2 = ["long", "short"]
subclass3 = ["leggings", "jogger", "bootcut", "jeans"]
for i in range(40, 60):
    num2 = random.randrange(0,len(subclass2))  #sub2
    num3 = random.randrange(0,len(subclass3))  #sub3
    num4 = random.randrange(0,len(subclass4))  #sub4
    num5 = random.randrange(0,len(Color))  #color
    num6 = random.randrange(0,len(season)) #season
    sql = "insert into dcloset VALUES ('%s', '%s', 'mars', 'bottoms', '%s', '%s', 1, NULL, '%s', '%s', '%s', '%s');"%(i, i, subclass1[0], Color[num5], subclass2[0], subclass3[num3], subclass4[num4], season[num6])
    #print(sql)
    curs.execute(sql)

# 치마
subclass2 = ["skirt"]
subclass3 = ["accordion skirt", "a-line skirt", "mini skirt", "tube skirt", "wrap skirt"]

for i in range(60, 80):
   
    num3 = random.randrange(0,len(subclass3))  #sub3
    num4 = random.randrange(0,len(subclass4))  #sub4
    num5 = random.randrange(0,len(Color))  #color
    num6 = random.randrange(0,len(season)) #season
    sql = "insert into dcloset VALUES ('%s', '%s', 'mars', 'bottoms', '%s', '%s', 1, NULL, '%s', '%s', '%s', '%s');"%(i, i, subclass1[1], Color[num5], subclass2[0], subclass3[num3], subclass4[num4], season[num6])
    #print(sql)
    curs.execute(sql)