#!/bin/bash

# set working directory
cd /home/ubuntu/prod/absensi-guru-django/

# stashing repository
echo "git stashing repository..."
git stash

# pull repository
echo "git pull..."
git pull

# change env-dev to env-prod in absensi_guru/settings.py
echo "changing settings file"
sed -i 's/.env-dev/.env-prod/g' absensi_guru/settings.py
sed -i 's/localhost:8000/absen.smkn1cibinong.sch.id/g' static/js/vueApp.js

# collectstatic
source prod/bin/activate
python manage.py migrate --no-input
if [ $? -eq 1 ];
then
  echo "db connection failed, please check password and user correctly"
  exit 2
fi

python manage.py collectstatic --no-input
if [ $? -eq 1 ];
then
  echo "staticfile error please check path correctly"
  exit 2
fi

# restarting gunicorn and nginx
/home/ubuntu/.local/bin/gunicornrestart
if [ $? -eq 1 ];
then
  echo "gunicorn restart failed please check it out!"
fi

/home/ubuntu/.local/bin/nginxrestart
if [ $? -eq 1 ];
then
  echo "nginx restart failed please check it out!"
fi


