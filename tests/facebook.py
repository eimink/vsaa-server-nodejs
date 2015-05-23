import requests
import json
import sys

if len(sys.argv) < 2:
  print("Usage: Your installation address")
  exit(1)
address = sys.argv[1]
fbtoken = "CAAWm6iITx3UBAFbCR1zJCyTbiA5xAYC3HdmJe55LSeED8FTZAKVqJCzIF895ZBxV440ZBz3v1FsOwfGbVV2UZBWkDy7QTPJZCmQzTYOKi9TaNb74brFe0SzALxFpGQZANmOnariW3Y4M6twQCTWzsoBNXo76zElD80aZAn6sq19gcWkv2i2lrelYCZCe4ddjb6TqedINQOgiBdVtDxzNGJU3BwvPyIorMQ8ZD"
print ("Started testing VSAA-Server %s" % sys.argv[1])
print("----------------")
res = requests.get(address)
print (res.text)
print("server done")
print("----------------")
print("testing login")
data = {'DeviceId':'test1', 'grant_type':'client_credentials', 'message_type':'SERVER_AUTH'}
headers = {'Accept': '*/*', 'Accept-Encoding':'identity', 'Authorization':'Basic NmFkOjk2Y2UxMzVjNDAzMGFjNTgwOWNlNDAz', 'Content-Type':'application/x-www-form-urlencoded'}
login = address + "/login"
res = requests.post(login,headers=headers,data=data)
res = json.loads(res.text)
token = res['access_token']
type = res['token_type']
print("login tested")
print("----------------")
print("testing events")
data = {'ApiKey':'6ad','DeviceId':'test1', 'Description':'Generic event', 'message_type':'APPLICATION_EVENT_GENERIC'}
event = address + "/event"
authtoken = type + " " + token
headers['Authorization'] = authtoken
res = requests.post(event,headers=headers,data=data)
print(res.text)
print("event tested")
print("----------------")
print("Starting FB test")
data = {'ApiKey':'6ad','DeviceId':'test1', 'Description':'Generic event', 'message_type':'APPLICATION_EVENT_GENERIC','usertoken':fbtoken}
event = address + "/fbtoken"
authtoken = type + " " + token
headers['Authorization'] = authtoken
res = requests.post(event,headers=headers,data=data)
print(res.text);
print("script is done")
