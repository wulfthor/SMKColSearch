#!/bin/bash 

sf=$1
st=$2
server="172.20.1.61"
port="8984"
curl -s http://$server:$port/solr/colors/select?q=$sf:*$sf*\&fl=id,tf\(color_text,"$st"\)\&wt=csv\&rows=1000
