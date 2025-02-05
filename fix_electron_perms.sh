#!/usr/bin/env bash

set -u
set -e
set -o pipefail

USAGE="Usage: $(basename "$0") [vh]

ARGUMENTS
-v              : verbose mode

DEPENDENCIES
aws (cli)

EXAMPLES
./fix_electron_perms.sh
"
while getopts 'vh' OPTION; do
case $OPTION in
    v)  set -x;                     ;;
    [h?]) echo "$USAGE"; exit 0     ;;
esac
done
shift "$((OPTIND - 1))"

sudo chown root ./node_modules/electron/dist/chrome-sandbox && sudo chmod 4755 ./node_modules/electron/dist/chrome-sandbox
