from django.db import models

# Create your models here.

class SKU(models.Model):
	sku = models.CharField(max_length=8)
	name = models.CharField(max_length=64)
	units = models.IntegerField(default=0)
	hours =  models.IntegerField(default=0)
	rate = models.FloatField(default=140.00)
	margin = models.FloatField(default=0.45)
	fixed_price = models.FloatField(default=0.00)
	price = models.FloatField(default=0.00)
	recomended = models.ManyToManyField('self', null=True, blank=True)
	# add type (services/product)
	# add lob (networking/security)
	# add margin incentives (sku extra x%)
	
	def __unicode__(self):
		return self.name
