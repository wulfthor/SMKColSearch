#!/bin/bash

color=$1
core=$2
rows=$3

curl -s http://172.20.1.61:8983/solr/$core/select?q=$color\&fl=id,termfreq\('color_text',$color\)\&wt=csv\&indent=true\&rows=$rows\&sort=score%20desc
#curl -s http://172.20.1.61:8983/solr/$core/select?q='color_text'%3A%2A$color%2A\&fl=id\&wt=csv\&indent=true\&rows=$rows
