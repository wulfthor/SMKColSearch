#!/usr/bin/python

import sys
import os
import re
import pdb

'''
{'000000': 1,
 '000002': 4,
 'fffffd': 2,
 'ffffff': 28}
-->
 "000000 000002 000002 000002 000002 fffffd fffffd
 ffffff ffffff .. ffffff"
'''

inputFile=sys.argv[1]
base=os.path.basename(inputFile)
name=os.path.splitext(base)
outputFile=inputFile + "out"
tmpLine='[{"id":"' + name[0] + '.col", "color_text" : "\n'

for line in open(inputFile):
  tmpArr=line.split(' ')
  tmpNum=tmpArr.pop()

  tmpNum=tmpNum[:-1]
  tmpNum=tmpNum[:-1]
  hit=re.search(r'([a-z0-9]{6})',line)
  for i in range(0,int(tmpNum)):
    try:
      tmpLine += hit.group(1) + " "
    except:
      pass
  print tmpLine 
  tmpLine=''
tmpLine = tmpLine + '"}]'
print tmpLine 
