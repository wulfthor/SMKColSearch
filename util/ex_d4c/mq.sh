#!/bin/bash

curl -s http://172.20.1.61:8983/solr/colors/select?q=d4c1b3\&fl=id,termfreq\('color_text','d4c1b3'\)\&wt=csv\&rows=20
