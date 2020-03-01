#!/bin/bash

# Extract highways from OSM data that are within the boundary of the
# city of Karlsruhe. The data is stored in `highways.osm`.
#
# Requires the `osmosis` tool.


#
# Download data if necessary
#

DIR=http://download.geofabrik.de/europe/germany
OUTPUT_DIR=output
BASE=sachsen-anhalt-latest.osm.pbf

if [ -f "${OUTPUT_DIR}/${BASE}" ]; then
    # Download MD5 file to see if file is up-to-date
    echo "${OUTPUT_DIR}/${BASE} exists, downloading MD5 to check whether it's up to date."
    wget -q -N ${DIR}/${BASE}.md5 -O ${OUTPUT_DIR}/${BASE}.md5
    LATEST_MD5=$(<${OUTPUT_DIR}/${BASE}.md5)
    FILE_MD5=`md5sum ${OUTPUT_DIR}/${BASE}`
    if [ "$LATEST_MD5" == "$FILE_MD5" ]; then
        echo "File is up to date."
    else
        echo "File is outdated, downloading latest version."
        wget ${DIR}/${BASE} -O ${OUTPUT_DIR}/${BASE}
    fi
else
    echo "${BASE} doesn't exist, downloading it."
    wget ${DIR}/${BASE} -O ${OUTPUT_DIR}/${BASE}
fi


#
# Extract coordinates for things
#

osmosis --read-pbf file=${OUTPUT_DIR}/${BASE} \
        --bounding-polygon file=magdeburg.poly \
        --write-xml ${OUTPUT_DIR}/highways-magdeburg.osm

