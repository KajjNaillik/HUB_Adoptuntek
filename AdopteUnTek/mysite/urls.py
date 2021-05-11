from django.urls import path
from rest_framework_jwt.views import obtain_jwt_token
from .views import current_user, home, UserListCreate, UserList

urlpatterns = [
    path('', home),
    path('current_user/', current_user),
    path('register/', UserListCreate.as_view()),
    path('users/', UserList.as_view()),
]
