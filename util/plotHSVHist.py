#!/usr/bin/python

import cv2
import sys
import pprint as pp
import numpy as np
import matplotlib
matplotlib.use('Agg')
from matplotlib import pyplot as plt

#img = cv2.imread(sys.argv[1],0)
img = cv2.imread(sys.argv[1])
pr = int(sys.argv[2])
b,g,r = cv2.split(img)

if pr == 1:
	print " --- "
	for num in img:
		print num
		print "\n"
	print " --- "

rgb_img = cv2.merge([r,g,b])

if pr == 1:
	print " -II-- "
	for num in rgb_img:
		print num
		print "\n"
	print " --- "

#plt.imshow(rgb_img)
plt.imshow(img)
#plt.show

plt.hist(img.ravel(),256,[0,256]); plt.show()
hsv_image = cv2.cvtColor(rgb_img,cv2.COLOR_BGR2HSV)

hue, sat, val = hsv_image[:,:,0], hsv_image[:,:,1], hsv_image[:,:,2]
percHue = np.percentile(hue, 90)
pp.pprint(percHue)
maxHue = int(np.ndarray.max(hue))
nHue = int(np.ndarray.mean(hue))
dHue = int(np.ndarray.std(hue))
vHue = int(np.ndarray.var(hue))
nSat = int(np.ndarray.mean(sat))
dSat = int(np.ndarray.std(sat))
vSat = int(np.ndarray.var(sat))
nVal = int(np.ndarray.mean(val))
dVal = int(np.ndarray.std(val))
vVal = int(np.ndarray.var(val))
print " -Hue- "
print "Max " + str(maxHue)
print "M " + str(nHue)
print "D " + str(dHue)
print "V " + str(vHue)
print " -Sat- "
print "M " + str(nSat)
print "D " + str(dSat)
print "V " + str(vSat)
print " -Val- "
print "M " + str(nVal)
print "D " + str(dVal)
print "V " + str(vVal)
print " --- "
if pr == 1:
	for elem in hue:
		print elem


