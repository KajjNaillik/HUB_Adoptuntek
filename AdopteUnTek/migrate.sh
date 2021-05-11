#!/bin/bash

container_name_key="back_1"

container_name=`docker ps | grep $container_name_key | awk '{print $NF}'`

if [ -z "$container_name" ]
then
    echo "Can't retreive container name, is docker-compose up ?"
    exit 1
fi

docker exec -it $container_name python3 manage.py makemigrations mysite
if [ $? == "0" ]
then
    docker exec -it $container_name python3 manage.py migrate
fi
docker exec -it $container_name python3 manage.py showmigrations