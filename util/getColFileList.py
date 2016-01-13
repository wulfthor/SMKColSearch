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

logging.basicConfig(filename='logs/thw2.log',level=logging.DEBUG)

f = open( sys.argv[1], 'rU' )
lines=f.readlines()

for line in lines:
  lineSplit=line.split(',')
  idTag=lineSplit[0]
  outname = "newtry/" + idTag + ".txt"
  testoutname = "/home/thw/git/colorsearch/colsearch/newcolfiles/trash/" + idTag + ".*"

  if os.path.exists(testoutname):
    logging.debug("Continue: " + line)
    continue

  url=lineSplit[1]
  filePost=url.split("/")
  tmpfileLine='/'.join(filePost[3:])
  fileLine = '/mnt/cifs/Globus/' + tmpfileLine.rstrip()

  try:
    logging.debug("OKopen: " + fileLine)
    image = Image.open(fileLine)
  except:
    logging.debug("Err: " + fileLine)
    continue

  w,h=image.size
  colors=image.getcolors(w*h)


  if len(colors) > 256:
    logging.info("C: " + line)
    hist={}
    testdcit = {"hello": "world"}

    for i,c in enumerate(colors):
        hex='%02x%02x%02x' % (c[1][0],c[1][1],c[1][2])
        hist[hex]=c[0]

    #pprint(hist)
    try:
      with open(outname, 'w') as outfile:
        logging.debug("OK: " + outname)
        json.dump(hist, outfile, sort_keys=True, indent=4, separators=(',', ': '))
    except:
      logging.debug("Err: " + outname)
      continue

  else:
    logging.info("B: " + line)
    continue

