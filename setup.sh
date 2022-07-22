#!/bin/bash

TITLE=$1
DESCRIPTION=$2
REPOSITORY=$3

rm -rf content/*.md
rm -rf content/images

git clone ${REPOSITORY} content

rm -rf content/.git
rm -rf content/.gitignore
rm -rf content/README.md
rm -rf content/LICENSE

git add content/\*
git commit -m "Adding content from ${REPOSITORY}"
