#!/usr/bin/python

import urllib2
import shutil
import sys
import os
import StringIO
import PIL
import tempfile
from PIL import Image
from pprint import pprint
from httplib2 import Http
from StringIO import StringIO



inputFileUrl=sys.argv[2]
inputFileID=sys.argv[1]
localfilename="xtestmig.jpg"

remote_file = urllib2.urlopen(inputFileUrl)

with open(localfilename, 'wb') as local_file:
    #shutil.copyfileobj(remote_file, local_file)
    shutil.copyfileobj(remote_file, local_file)

os.chmod(localfilename,0775)
image = Image.open(localfilename)
try:
    image.verify()
    print "image verified"
except Exception, e:
    # The image is not valid
    print "not valid"

w,h=image.size
colors=image.getcolors(w*h)

hist={}

for i,c in enumerate(colors):
    hex='%02x%02x%02x' % (c[1][0],c[1][1],c[1][2])
    hist[hex]=c[0]

pprint(hist)
