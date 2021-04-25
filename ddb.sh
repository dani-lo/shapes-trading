#!/bin/bash

# $dbs will contain db names and sizes mixed together
# Use --quiet to skip connection information
dbs=$(mongo --quiet <<EOF
show dbs
quit()
EOF
)
i=0
for db in ${dbs[*]}
do
    # Odd values are db names
    # Even values are sizes
    i=$(($i+1))
    # Show db name, ignore size
    if (($i % 2)); then
        echo "$db"
    fi
done