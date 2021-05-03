FROM python:3

WORKDIR /code/
COPY requirement.txt /code/
ENTRYPOINT ["./docker-entrypoint.sh"]
RUN python3 -m pip install -r requirement.txt
COPY . /code/