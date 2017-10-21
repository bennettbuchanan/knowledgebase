#!/bin/bash
set -e

API_PORT=3000
SERVER_START_TIMEOUT=40

wait_for_port() {
    count=0
    ret=1
    echo "Waiting for API port $API_PORT..."
    while [[ "$ret" -eq "1" && "$count" -lt "$SERVER_START_TIMEOUT" ]] ; do
        nc -z -w 1 localhost $API_PORT
        ret=$?
        if [ ! "$ret" -eq "0" ]; then
            sleep 1
            count=$(($count+1))
        fi
    done

    if [[ "$count" -eq "$SERVER_START_TIMEOUT" ]]; then
        echo "Server did not start. Exiting after timeout of" \
            "$SERVER_START_TIMEOUT seconds."
        exit 1
    fi
    echo "Server is ready, starting tests..."
}

export NODE_ENV=test

yarn lint && yarn start:test > $CIRCLE_ARTIFACTS/server_test.txt & wait_for_port && yarn test

kill $(lsof -t -i:$API_PORT)

sleep 2
