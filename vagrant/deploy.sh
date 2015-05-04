#/bin/bash

sudo ufw disable
sudo apt-get update
sudo apt-get upgrade
echo mysql-server mysql-server/root_password password Passw0rd | sudo debconf-set-selections
echo mysql-server mysql-server/root_password_again password Passw0rd | sudo debconf-set-selections
sudo apt-get -q -y install mysql-server
sudo apt-get -q -y install mysql-client
sudo sed -i 's/^bind-address/#bind-address/' /etc/mysql/my.cnf
sudo /etc/init.d/mysql restart
sudo apt-get -y -q install nodejs
sudo apt-get -y -q install npm
sudo apt-get -y -q install git
wget https://bootstrap.pypa.io/get-pip.py
sudo python get-pip.py
pip install requests
git clone https://github.com/eimink/vsaa-server-nodejs.git
cd vsaa-server-nodejs
npm install restify-oauth2
npm install mysql underscore
sudo npm install sharedmemory

echo "SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0; SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0; SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';"> run.sql
echo "CREATE SCHEMA IF NOT EXISTS VSAA DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ; USE VSAA ;">> run.sql
echo "DROP TABLE IF EXISTS VSAA.Applications ;">> run.sql
echo "CREATE TABLE IF NOT EXISTS VSAA.Applications ( Id INT UNSIGNED NOT NULL AUTO_INCREMENT , Name VARCHAR(64) NOT NULL , ApiKey VARCHAR(64) NOT NULL , ApiSecret VARCHAR(128) NOT NULL , ApiSalt VARCHAR(64) NOT NULL , PRIMARY KEY (Id) ) ENGINE = InnoDB;">> run.sql
echo "DROP TABLE IF EXISTS VSAA.Events ;" >> run.sql
echo "CREATE TABLE IF NOT EXISTS VSAA.Events ( Id INT UNSIGNED NOT NULL AUTO_INCREMENT , DeviceIdentifier VARCHAR(128) NOT NULL , Description VARCHAR(255) NOT NULL , Logged TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() , Applications_Id INT UNSIGNED NOT NULL , PRIMARY KEY (Id) , FULLTEXT INDEX Description (Description ASC) , INDEX Logtime (Logged ASC) , INDEX fk_Events_Applications_idx (Applications_Id ASC) , CONSTRAINT fk_Events_Applications FOREIGN KEY (Applications_Id ) REFERENCES VSAA.Applications (Id ) ON DELETE NO ACTION ON UPDATE NO ACTION) ENGINE = InnoDB;" >> run.sql
echo "SET SQL_MODE=@OLD_SQL_MODE; SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS; SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;" >> run.sql
echo "INSERT INTO Applications (Name,APIKEY,APISECRET,APISALT) VALUES('test','6ad','96ce135c4030ac5809ce403','DERP');">> run.sql

mysql -u root --password="Passw0rd" < run.sql
echo "Change config.js to have your mysql configuration."
echo "nodejs server.js"
