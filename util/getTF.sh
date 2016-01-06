#!/bin/bash
limit=$1

curl -s http://172.20.1.61:8983/solr/colors/terms?terms.fl=color_text\&terms.sort=count\&terms.limit=$limit\&wt=csv
