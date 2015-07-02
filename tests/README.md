------------
PYTHON TESTS
------------

------
Requires:
------

Insertion to database

ID  NAME  APIKEY  APISECRET                APISALT

0   test  6ad     96ce135c4030ac5809ce403  DERP


Test2 requires

> INSERT INTO User (Id,Applications_Id, Name, Password,Salt , age, regdate) VALUES (0,0,'testi','test','test',0,CURRENT_TIMESTAMP);

------
RELATIO DB:
------

>INSERT INTO Applications (Name,APIKEY,APISECRET,APISALT) VALUES('test','6ad','96ce135c4030ac5809ce403','DERP');

------
MongoDB:
------

>use vsaa

>db.Applications.insert({"Name" : "test", "ApiKey" : "6ad", "ApiSecret" : "96ce135c4030ac5809ce403", "ApiSalt" : "DERP" })

------
PIP installed:
------

https://pip.pypa.io/en/latest/installing.html

------
Requests module installed:
------

http://docs.python-requests.org/en/latest/user/install/#install


Script is ran in the server by using: python test1.py
