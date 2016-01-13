#!/usr/bin/python

import logging
import sys
import os.path
import json
import re
import PIL
from PIL import Image
from pprint import pprint

#KMS4498,http://cspic.smk.dk/globus/40412247/img0083.jpg

logging.basicConfig(filename='logs/thw.log',level=logging.DEBUG)

f = open( sys.argv[1], 'rU' )
lines=f.readlines()

for line in lines:
  lineSplit=line.split(',')
  url=lineSplit[1]
  filePost=url.split("/")
  tmpfileLine='/'.join(filePost[3:])
  fileLine = '/mnt/cifs/Globus/' + tmpfileLine.rstrip()

  try:
    image = Image.open(fileLine)
  except:
    logging.info("Err: " + line)
    continue

  w,h=image.size
  colors=image.getcolors(w*h)


  if len(colors) > 256:
    logging.info("C: " + line)
  else:
    logging.info("B: " + line)

