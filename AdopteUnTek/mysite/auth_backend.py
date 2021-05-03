"""
    Project : Adoptuntek 2021
    Author : Killian Vallette
    Backend engine for autologin login and register
"""

from django.contrib.auth.backends import BaseBackend


class AutologinBackend(BaseBackend):
    def authenticate(self, request, token=None):
        pass

    def get_user(self, user_id):
        pass
