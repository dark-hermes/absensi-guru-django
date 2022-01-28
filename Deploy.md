
[![Deployment](https://github.com/dark-hermes/absensi-guru-django/actions/workflows/deploy.yml/badge.svg?branch=master)](https://github.com/dark-hermes/absensi-guru-django/actions/workflows/deploy.yml)

## Deployment Documentation
### Preparing virtualenv

very recommended to you virtualenv, you can install virtualenv with this command
```bash
pip install virtualenv
```

create virtualenv 
```bash
virtualenv prod
```

activate it
```bash
source prod/bin/activate
```

### WSGI
WSGI Deployment depending on `gunicorn>=20.1.0`, you install it 
together with one command. 

```bash
pip install -r requirements
```

if the installation complete you should preparing database

```bash
docker-compose -f docker-compose.db.yml up -d
```

migrating database with

```bash
python manage.py makemigrations
python manage.py migrate
```

collect static file 
```bash
python manage.py collectstatic
```

#### Preparing gunicorn service
Gunicorn by default run in inline mode you should to create service file 
in order to run in booting time. create file in `/etc/systemd/system/gunicorn.service`

```bash
[Unit]
Description=gunicorn daemon
After=network.target

[Service]
User=youruser
Group=yourgroup
WorkingDirectory=/path/to/absensi-guru-django
ExecStart=/path/to/virtual/env/bin/gunicorn --access-logfile - --workers 3 --bind unix:/home/nevtik/absensi-guru-django/absensi-guru-django.sock app.wsgi:application

[Install]
WantedBy=multi-user.target
```

start and enabling service file
```bash
sudo systemctl start gunicorn.service
sudo systemctl enable gunicorn.service
```

if you not found the error, you can find `*.sock` file on you project folder.
If the systemctl status command indicated that an error occurred or if you do not find the myproject.sock file in the directory, it’s an indication that Gunicorn was not able to start correctly. Check the Gunicorn process logs by typing:
```bash
sudo journalctl -u gunicorn
```

#### Nginx Configuration

```
server {
    server_name domainorip.com;
	access_log /var/log/nginx/access.log;
 	error_log /var/log/nginx/error.log;


location /static/ {
	alias /path/to/absensi-guru-django/static/;
        }

location / {
        include proxy_params;
        proxy_pass http://unix:/path/to/absensi-guru-django/absensi-guru-django.sock;
        }
}
```

enable configuration
```bash
sudo ln -s /etc/nginx/sites-available/django.conf /etc/nginx/sites-enabled/django.conf
```

start nginx
```bash
sudo systemctl start nginx
sudo systemctl enable nginx
```