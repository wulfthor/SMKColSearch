#!/bin/bash
limit=$1
prefix=$2

curl -s http://172.20.1.61:8984/solr/colors/terms?terms.fl=color_text\&terms.sort=count\&terms.limit=$limit\&terms.prefix=$prefix
