#!/bin/bash
id=$1
server="172.20.1.88"
port="8983"

curl -s http://$server:$port/solr/colors/update/json?commit=true -X POST -H 'Content-type:application/json' -d '{ "delete": { "id":'$id'}}'
