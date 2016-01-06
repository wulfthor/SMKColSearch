#!/bin/bash

curl -X POST -H 'Content-type:application/json' --data-binary '{ "replace-field":{ "name":"color_text", "type":"colors", "stored":true, "indexed":true, "termPositions":true, "termVectors":true } }' http://localhost:8983/solr/colors/schema
