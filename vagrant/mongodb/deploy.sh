#/bin/bash
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list
sudo apt-get update -y
sudo apt-get install -y mongodb-org git
sudo service mongod start
sudo apt-get -y update
sudo apt-get -y install nodejs node
sudo apt-get -y install npm
sudo apt-get -y -q install git
wget https://bootstrap.pypa.io/get-pip.py
sudo python get-pip.py
pip install requests
git clone https://github.com/eimink/vsaa-server-nodejs.git
cd vsaa-server-nodejs
npm install restify-oauth2
npm install mongojs mongodb underscore
npm install node-uuid
sudo npm install sharedmemory

dbdriver="mongodb"
dbmodule="mongodb"
dburi="VSAA"
perl -pi -e "s/mongodb_uri.*,/mongodb_uri : \"$dburi\",/" config.js
perl -pi -e "s/db_driver.*,/db_driver : \"$dbmodule\",/" config.js
mongo VSAA --eval "printjson(db.Applications.insert({\"Name\" : \"app_name\", \"ApiKey\" : \"your_key\", \"ApiSecret\" : \"your_secret\", \"ApiSalt\" : \"your_salt\" }))"
