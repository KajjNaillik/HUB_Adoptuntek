"""
    Project : Adoptuntek 2021
    Author : Killian Vallette
    Fonction to request and parse API from intra.epitech.eu
"""

import requests

INTRA_URL = "https://intra.epitech.eu/"

def is_link_valid(autologin):
    if "intra.epitech.eu" in autologin:
        response = requests.get(autologin)
        print(response)
        print(response.json())
    else:
        pass