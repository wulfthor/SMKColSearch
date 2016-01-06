#!/bin/bash 

sf=$1
st=$2
curl -s http://172.20.1.61:8983/solr/colors/select?q=$sf:*$sf*\&fl=id,tf\(color_text,"$st"\)\&wt=csv\&rows=1000
