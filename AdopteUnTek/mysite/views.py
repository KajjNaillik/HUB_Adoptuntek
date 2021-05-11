from django.shortcuts import render

from .intra_API_request import *
from django.shortcuts import render
from django.http import HttpResponse, HttpRequest, JsonResponse
from rest_framework import generics, permissions, status
from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import *
from .serializer import *
import json
import re
import random


@api_view(['GET'])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


class UserList(APIView):
    """
    Create a new user. It's called 'UserList' because normally we'd have a get
    method here too, for retrieving a list of all User objects.
    """
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Create your views here.
def home(request):
    if (request.method == "POST"):
        is_link_valid(request.POST['your_name'])
        return render(request, "index.html", locals())
    if (request.method == "GET"):
        return render(request, "index.html", locals())


class UserListCreate(generics.ListCreateAPIView):
    User = get_user_model()
    queryset = User.objects.all()
    serializer_class = UserSerializer
