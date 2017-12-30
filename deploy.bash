#!/bin/bash

function show_help() {
    echo "Usage: $0 <type-of-deployment> <heroku-dyno-name>"
}

if [[ -z "$1" || "$1" == "help" ]]; then
    show_help
    exit 1
fi

if [[ "$1" != "api" && "$1" != "web" ]]; then
    echo "ERROR: First argument to $0 must be 'api' or 'web'"
    echo ""
    show_help
    exit 1
fi

if [[ -z "$2" ]]; then
    echo "ERROR: Second argument to $0 must be heroku server name"
    echo ""
    show_help
    exit 1
fi

if [[ $(git branch | sed -e '/^[^*]/d' -e "s/* \(.*\)/\1/") != "master" ]]; then
    echo "ERROR: Must be on git master branch"
    echo ""
    show_help
    exit 1
fi

heroku git:remote -a "$2"

if [[ "$1" = "api" ]]; then
    # Before pushing to Heroku we need to commit the Procfile.
    echo "web: yarn start_api:prod" > Procfile
    git add Procfile
    git commit -m "Add Procfile"
    git push -f heroku master
    # Remove the commit that added the Procfile for the deployment.
    git reset --hard HEAD^
fi

if [[ "$1" = "web" ]]; then
    git push -f heroku master
fi
