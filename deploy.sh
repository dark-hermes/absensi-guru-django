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
sed -i sed -i 's/.env-dev/.env-prod/g' absensi_guru/settings.py

# restarting gunicorn and nginx

