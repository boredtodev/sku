from django.shortcuts import render
from django.http import HttpResponse 
from django.core import serializers

from service.models import SKU

def get_sku(request):
	data = serializers.serialize('json', SKU.objects.all())
	response = HttpResponse(data, mimetype='application/json')
	# wide open for now
	response['Access-Control-Allow-Origin'] = '*'
	return response

	
