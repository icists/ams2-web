FROM node:6.12.3
MAINTAINER (Junwoo Park) <junwoopark0130@gmail.com>

RUN mkdir /code/
WORKDIR /code/
COPY package.json /code/

RUN npm install
