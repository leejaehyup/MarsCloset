import pymysql.cursors
from random import randint
import vm

# MySQL Connection 연결
conn = pymysql.connect(host='localhost',port=3306, user='root',
                       passwd='apmsetup', db='Closet', charset='utf8')

# Connection 으로부터 Cursor 생성
curs = conn.cursor()


#현재 기온
temp = 20

#시즌 조건문
clothes_season = vm.season(temp)
#옷 조건 쿼리 앞 부분 (식별자, 카테고리 4개, Color)
head = "select rfid_number, subclass1, subclass2, subclass3, subclass4, Color FROM dcloset WHERE"

# 사용자의 성향 확인
sql = 'select * from preference where userID like "mars"'

#선호 스타일 개수 체크 (sql 실행 결과의 레코드 수 반환)
curs.execute(sql)

#해당하는 선호스타일 상세
pre = curs.fetchall()
#print(pre)


#상의 하의 매칭 저장 변수
savedata = []


# 선택한 선호 스타일의 수만큼 for문을 돌리고 해당하는 옷을 가져옴
for row in range(0, len(pre)):
    sqlT, sqlB = vm.style(pre, row)
    
    #상의 하의 쿼리 실행
    curs.execute(head + sqlT + clothes_season)
    Top = curs.fetchall()
    curs.execute(head + sqlB + clothes_season)
    Bottom = curs.fetchall()

    for i in range(0, 10):
        Tnum = randint(0, len(Top)-1)
        Bnum = randint(0, len(Bottom)-1)

        result = vm.usedvm(Bottom[Bnum][1], Bottom[Bnum][2], Bottom[Bnum][3],Bottom[Bnum][4], Bottom[Bnum][5],Top[Tnum][1], Top[Tnum][2], Top[Tnum][3], Top[Tnum][4],Top[Tnum][5])
        savedata.append([result, Top[Tnum][0], Bottom[Bnum][0]])
        print(Top[Tnum])
        print(Bottom[Bnum])
	

#정렬
savedata.sort(key=lambda savedata: savedata[0], reverse=True)
#print("정렬값: ", savedata)
#print(len(savedata))

#상위 5개 값
print(savedata[0:5])

#connection 닫기
conn.close()
