FROM python:3.9-slim-buster

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

RUN apt update 

RUN apt install cron ffmpeg libsm6 libxext6 -y

RUN pip install -U pip

WORKDIR /code

COPY . /code

RUN pip install -r requirements.txt

RUN chmod +x /code/docker-entrypoint.sh

ENTRYPOINT [ "/code/docker-entrypoint.sh" ]

