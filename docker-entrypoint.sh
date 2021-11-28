#!/bin/bash

echo "Collect static files.."
python manage.py collectstatic --noinput


echo "Apply database migrations ..."
python manage.py migrate

echo "Starting Server ..."
gunicorn absensi_guru.wsgi:application --bind 0.0.0.0:8000
#python manage.py runserver 0.0.0.0:8000

