#!/bin/bash

# “a” and “arga” have optional arguments with default values.
# “b” and “argb” have no arguments, acting as sort of a flag.
# “c” and “argc” have required arguments.
# getSolr.sh -h <host> -p <port> -c <core> -t <output-type> -q <query-field> -a <argument>

# set an initial value for the flag
PORT="8983"
CORE="fotostation"
OTYPE="json"
QUERY='*'
ARG='*'

# read the options
#TEMP=`getopt -o h::p:c:t:q:a: -n 'getSolr.sh' -- "$@"`
#eval set -- "$TEMP"
#echo $TEMP

#: extract options and their arguments into variables.
options=$(getopt -o h:p:c:t:q:a:r: -- "$@")
echo $options
eval set -- "$options"
while true;do
    case "$1" in
        -h) HOST=$2 ; shift 2;;
        -p) PORT=$2 ; shift 2;;
        -c) CORE=$2 ; shift 2;;
        -t) OTYPE=$2 ; shift 2;;
        -q) QUERY=$2 ; shift 2;;
        -a) ARG=$2 ; shift 2;;
        -r) ROWS=$2 ; shift 2 ;;
        --) shift ; break ;;
    esac
done

cmd="curl http://$HOST:$PORT/solr/$CORE/select?q=$QUERY:$ARG\&wt=$OTYPE\&indent=true\&rows=$ROWS -s"
echo $cmd
curl http://$HOST:$PORT/solr/$CORE/select?q=$QUERY:$ARG\&wt=$OTYPE\&indent=true\&rows=$ROWS -s
#curl http://$HOST:$PORT/solr/$CORE/select?q=*:*\&wt=$OTYPE\&indent=true -s
