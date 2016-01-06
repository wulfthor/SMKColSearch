#!/usr/bin/python

import sys
import json
import re
import pdb
import PIL
from PIL import Image
from pprint import pprint

width = 400
height = 300
storedict = {}
coldict = {}
first = 1

def toR(val):
  m=re.match('([0-9a-z]{2})([0-9a-z]{2})([0-9a-z]{2})',val)
  if (m):
    print "mmm:"
    print m.group(1)
    print m.group(2)
    print m.group(3)

  retval = (int(m.group(1),16),int(m.group(2),16),int(m.group(3),16))
  return retval


fh1=open(sys.argv[1],'r')
searchlines = fh1.readlines()


for line in searchlines:
  if re.search("NEW", line):
    name=line.split(":")
    filename=name[1]
    print filename
    storedict[filename]=coldict
    coldict = {} 
    #im=Image.new('RGBA', (width, height))
  else:
    match=re.match('.*([0-9]+) ([0-9a-z]+)',line)
    if (match):
      print match.group(1) + " " + match.group(2)
      coldict[match.group(2)] = match.group(1)

flatPixels = []

for k,v in storedict.iteritems():
  print "K: " + k
  for a,b in v.iteritems():
    print a + " => " + b
    retVal=toR(a)
    print "R: " + b + " " + str(retVal)
    limit=int(b)
    for i in range(0, limit):
      flatPixels.append(retVal)

  print k,v
