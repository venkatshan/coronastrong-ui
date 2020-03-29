#!/bin/bash


curl --header "Content-Type: application/json" --request POST  --data "{ \"cluster_name\" : \"$1\", \"infected_count\" : \"$2\", \"death_count\" : \"$3\" }"  https://bgctw6g195.execute-api.us-east-1.amazonaws.com/PROD/clusters

