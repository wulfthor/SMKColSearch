#!/bin/bash

curl -s http://172.20.1.61:8983/solr/colors/tvrh?q=color_text:$1\&fl=id\&tv=true\&tv.all=true\&indent=on\&wt=csv\&rows=$2
