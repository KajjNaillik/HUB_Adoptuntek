"""
    Project : Adoptuntek 2021
    Author : Killian Vallette
    Database schema
"""

from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core import validators


class Room(models.Model):
    _room_name = models.CharField(max_length=200, default="", null=True, blank=True)
    _token = models.CharField(max_length=200, default="", null=False, blank=False)


class Interest(models.Model):
    _name = models.CharField(max_length=200, default="", null=False, blank=False)


class Match(models.Model):
    _room = models.ForeignKey(Room, on_delete=models.CASCADE)


class User(models.Model):
    _email = models.EmailField(verbose_name="Email", validators=[validators.validate_email], unique=True)
    _likes = models.ManyToManyField("self", verbose_name="likes")
    _match = models.ManyToManyField(Match, verbose_name="match")
    _interest = models.ManyToManyField(Interest, verbose_name="interest")


class Message(models.Model):
    _author = models.ForeignKey(User, on_delete=models.CASCADE)
    _content = models.TextField()
    _room = models.ForeignKey(Room, on_delete=models.CASCADE)
    _timestamp = models.DateTimeField(auto_now_add=True)
