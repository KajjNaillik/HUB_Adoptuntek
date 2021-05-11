#!/bin/bash

echo "Collect static"
python3 manage.py collectstatic --noinput
# Start server
echo "Starting server"
python3 manage.py runserver 0.0.0.0:8000
