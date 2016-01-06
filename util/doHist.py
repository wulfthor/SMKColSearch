#!/usr/bin/python

import matplotlib.pyplot as plt
import matplotlib.image as mpimg
import numpy as np
import sys
from PIL import Image
from pprint import pprint

#interactive(True)
x = [1,2,3]
y = [5,6,3]



inputFile=sys.argv[1]
img=mpimg.imread(inputFile)
#fig=plt.imshow(img)
fig = plt.figure()
#plt.imshow(img)
#plt.show()
#plt.plot(x,y)
#plt.show()
lum_img = img[:,:,0].set_cmap('hot')
#plt.imshow(lum_img).set_cmap('hot')
#plt.imshow(lum_img).set_cmap('hot')
#plt.imshow(lum_img)
#plt.hist(lum_img.ravel(), bins=256, range=(0.0, 1.0), fc='k', ec='k')
plt.hist(lum_img.ravel(), bins=256, range=(0.0, 1.0), fc='k', ec='k')
plt.show()
