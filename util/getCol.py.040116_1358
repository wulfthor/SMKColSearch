#!/usr/bin/python

import sys
import PIL
from PIL import Image
from pprint import pprint


inputFile=sys.argv[1]

image = Image.open(inputFile)
w,h=image.size
colors=image.getcolors(w*h)

hist={}

for i,c in enumerate(colors):
    hex='%02x%02x%02x' % (c[1][0],c[1][1],c[1][2])
    hist[hex]=c[0]

pprint(hist)
