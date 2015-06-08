#/bin/bash

sudo ufw disable
sudo apt-get update
sudo apt-get upgrade
sudo apt-get -y install ant build-essential ant-optional default-jdk python \
    valgrind ntp ccache git-arch git-completion git-core git-svn git-doc \
    git-email python-httplib2 python-setuptools python-dev apt-show-versions
sudo apt-get -y -q install nodejs
sudo apt-get -y -q install npm
sudo apt-get -y -q install git
wget https://bootstrap.pypa.io/get-pip.py
sudo python get-pip.py
pip install requests
git clone https://github.com/VoltDB/voltdb.git
cd voltdb && ant
sudo mkdir /opt/voltdb
sudo chown vagrant /opt/voltdb
sudo cp voltdb/bin /opt/voltdb -rf
sudo cp voltdb/doc /opt/voltdb -rf
cp voltdb/examples /opt/voltdb -rf
cp voltdb/lib /opt/voltdb -rf
cp voltdb/tools /opt/voltdb -rf
cp voltdb/voltdb /opt/voltdb -rf
cp voltdb/version.txt /opt/voltdb
PATH=$PATH:/opt/voltdb/bin
echo 'PATH=$PATH:/opt/voltdb/bin' > .bashrc
git clone https://github.com/eimink/vsaa-server-nodejs.git
cd vsaa-server-nodejs
npm install restify-oauth2
npm install voltjs underscore
npm install node-uuid
sudo npm install sharedmemory
voltdb create -B

dbdriver="voltdb"
dbmodule="voltdb"
perl -pi -e "s/db_driver.*,/db_driver : \"$dbmodule\",/" config.js
perl -pi -e "s/listen.*,/listen : 8000,/" config.js
echo "Volt NodeJS uses 8000 port"
echo "Change config.js to have your voltdb configuration."
echo "nodejs server.js"
