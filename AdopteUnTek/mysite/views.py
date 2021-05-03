from django.shortcuts import render

from intra_API_request import *

# Create your views here.
def home(request):
    if (request.method == "POST"):
        print(request.body)
        return render(request, "index.html", locals())
    if (request.method == "GET"):
        return render(request, "index.html", locals())
