#!/bin/bash

echo "Apply database migrations ..."
python manage.py migrate

echo "Collect static files.."
python manage.py collectstatic --noinput

echo "Create crontab job.."
python manage.py crontab add

echo "Starting Server ..."
gunicorn absensi_guru.wsgi:application --bind 0.0.0.0:8000


