#!/usr/bin/python

import sys
import logging
import os
import re
import pdb

'''
{
 '000000': 1,
 '000002': 4,
 'fffffd': 2,
 'ffffff': 28
 }
-->
 "000000 000002 000002 000002 000002 fffffd fffffd
 ffffff ffffff .. ffffff"
'''
def doFile(inputFile):
  base=os.path.basename(inputFile)
  nameArr=os.path.splitext(base)
  outputFile=nameArr[0] + ".json"
  fh=open(outputFile, 'w')
  tmpLine='[{"id":"' + nameArr[0] + '.col", "color_text" : "\n'
  fh.write(tmpLine)

  for line in open(inputFile):
    tmpLine=''
    if "{" in line or "}" in line:
      logging.debug("bad " + line)
      continue
    hit=re.match(r'[\s]+"([a-z0-9]{6})": ([0-9]+)',line)
    try:
      tmpNum=hit.group(2)
      tmpCol=hit.group(1)
    except:
      logging.info("Err on line " + line)
      continue
    for i in range(0,int(tmpNum)):
      try:
        tmpLine += hit.group(1) + " "
      except:
        pass
    fh.write(tmpLine + "\n")
  tmpLine = tmpLine + '"}]'
  fh.write(tmpLine)
  fh.close()

def main():
  logging.basicConfig(filename='/home/thw/logs/thw.log',level=logging.INFO)
  inputFile=sys.argv[1]
  doFile(inputFile)

if __name__ == '__main__':
  main()
