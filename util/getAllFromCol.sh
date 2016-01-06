#!/bin/bash

color=$1
core=$2
rows=$3
#KMS7240,246

/home/thw/git/colorsearch/util/getCol.sh $color $core $rows | cut -d\, -f1 | while read x; do getSolr.sh -h solr-02.smk.dk -p 8080 -c prod_SAFO -q id -a $x -f medium_image_url -r 1 | grep medium ; done | grep cspic | cut -d\" -f4  | while read x; do curl -O $x; done
