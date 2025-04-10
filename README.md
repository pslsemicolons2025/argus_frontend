## Steps to run locally:
```sh
REACT_APP_API_HOST={hostname}

REACT_APP_API_PORT={port}

npm install  
npm start
```

## Steps to run on ec2:

Connect to ec2 instance:

```sh
chmod 400 codemedics_keypair.pem

ssh -i "codemedics_keypair.pem" ec2-user@{hostname}
```

If first time, then run

```sh
git clone <repourl>

sudo apt-get update -y

sudo apt install npm -y

curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

sudo apt install -y nodejs

sudo apt install nginx -

sudo mkdir /var/www/html/argus_frontend

sudo vi /etc/nginx/conf.d/react.conf

server {

    listen 80;

    listen [::]:80;

    root /var/www/html/argus_frontend/build;

    #react app

    location / {

        try_files $uri /index.html;

    }

}
```
Otherwise,

```sh
cd argus_frontend/

git pull origin main

Create .env file with below and update port and host of API endpoint

REACT_APP_API_HOST=<hostname>
REACT_APP_API_PORT=<port>

npm run build

sudo cp -R build/ /var/www/html/argus_frontend/

sudo nginx -t && sudo systemctl reload nginx
```
Note: 

```sh
To check status of nginx
sudo systemctl status nginx

if nginx is inactive then
sudo systemctl stop nginx
sudo systemctl start nginx
```