#!/bin/bash

REPOSITORY=$1

rm -rf content/*.md
rm -rf content/images

git clone ${REPOSITORY} docs

rm -rf docs/.git

git add content/\*
git commit -m "Adding content from ${REPOSITORY}"
