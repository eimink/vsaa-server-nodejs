import requests
import json
import sys

if len(sys.argv) < 2:
  print("Usage: Your installation address")
  exit(1)
address = sys.argv[1]
print ("Started testing VSAA-Server %s" % sys.argv[1])
res = requests.get(address)
if(res.status_code != 200)
{
  print ("Failure while checking url")
  sys.exit("url failure")
}
print (res.text)
data = {'DeviceId':'test1', 'grant_type':'client_credentials', 'message_type':'SERVER_AUTH'}
headers = {'Accept': '*/*', 'Accept-Encoding':'identity', 'Authorization':'Basic NmFkOjk2Y2UxMzVjNDAzMGFjNTgwOWNlNDAz', 'Content-Type':'application/x-www-form-urlencoded'}
login = address + "/login"
res = requests.post(login,headers=headers,data=data)
if(res.status_code != 200)
{
  print ("Failure while authorizing")
  sys.exit("Authorizing failure")
}
res = json.loads(res.text)
token = res['access_token']
type = res['token_type']

data = {'ApiKey':'6ad','DeviceId':'test1', 'Description':'Generic event', 'message_type':'APPLICATION_EVENT_GENERIC'}
event = address + "/event"
authtoken = type + " " + token
headers['Authorization'] = authtoken
res = requests.post(event,headers=headers,data=data)
if(res.status_code != 200)
{
  print ("Failure while sending event")
  sys.exit("Event failure")
}
print(res.text)
print("script is done")
