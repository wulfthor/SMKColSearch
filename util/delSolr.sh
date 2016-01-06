#!/bin/bash
id=$1

curl -s http://172.20.1.61:8983/solr/colors/update/json?commit=true -X POST -H 'Content-type:application/json' -d '{ "delete": { "id":'$id'}}'
