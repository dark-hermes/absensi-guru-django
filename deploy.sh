#!/bin/bash
# deploy.sh uncontainerized ci/cd
# set working directory
cd /home/ubuntu/prod/absensi-guru-django/

# stashing repository
echo "git stashing repository..."
git stash
if [ $? -ne 0 ];
then
  echo "error when stashing repository..."
  exit 1
fi

# pull repository
echo "git pull..."
git pull
if [ $? -ne 0 ];
then
  echo "error when pulling repository..."
  exit 1
fi

# change env-dev to env-prod in absensi_guru/settings.py
echo "changing settings file"
sed -i 's/.env-dev/.env-prod/g' absensi_guru/settings.py
sed -i 's/localhost:8000/absen.smkn1cibinong.sch.id/g' static/js/vueApp.js
if [ $? -ne 0 ];
then
  echo "error when sed the text..."
  exit 1
fi

# collectstatic
source prod/bin/activate

echo "Install depedencies.."
pip install -r requirements.txt
if [ $? -ne 0 ];
then
  echo "Problem when installing depedencies, check requirements.txt.."
  exit 1
fi

python manage.py migrate --no-input
if [ $? -ne 0 ];
then
  echo "db connection failed, please check password and user correctly"
  exit 2
fi

python manage.py collectstatic --no-input
if [ $? -ne 0 ];
then
  echo "staticfile error please check path correctly"
  exit 2
fi

# restarting gunicorn and nginx
sudo gunicornrestart
if [ $? -ne 0 ];
then
  echo "gunicorn restart failed please check it out!"
fi

sudo nginxrestart
if [ $? -ne 0 ];
then
  echo "nginx restart failed please check it out!"
fi

# check server status
CODE=$(curl -s -w "%{http_code}\n" https://absen.smkn1cibinong.sch.id/ -o /dev/null)
GIT_SHA=$(git rev-parse HEAD | cut -c 1-7)
NODE=$(hostname)
NGINX=$(systemctl status nginx | awk '/Active/ {print $2" "$3}')
GUNI=$(systemctl status gunicorn | awk '/Active/ {print $2" "$3}')

echo "========================================="
echo "deploy success!"
echo "on node         -> $NODE"
echo "on commit       -> $GIT_SHA"
echo "curl status     -> $CODE"
echo "nginx status    -> $NGINX"
echo "gunicorn status -> $GUNI"
echo "========================================="


