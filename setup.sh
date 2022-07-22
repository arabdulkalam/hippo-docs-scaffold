#!/bin/bash

read -p "Enter the project title: " TITLE
read -p "Enter a description for the project: " DESCRIPTION
read -p "Enter a copyright company: " COMPANY
read -p "Enter a copyright year: " YEAR
read -p "Enter a repository to import (optional): " REPOSITORY

if [ -z ${REPOSITORY} ]
then
  echo "No repository supplied skipping, import"
else
  rm -rf content/*.md
  rm -rf content/images

  git clone ${REPOSITORY} content

  rm -rf content/.git
  rm -rf content/.gitignore
  rm -rf content/README.md
  rm -rf content/LICENSE

  git add content/\*
  git commit -m "Adding content from ${REPOSITORY}"
fi


sed -i '' "s/{{project_title}}/${TITLE}/" gatsby-config.js
sed -i '' "s/{{project_description}}/${DESCRIPTION}/" gatsby-config.js
sed -i '' "s/{{project_company}}/${COMPANY}/" gatsby-config.js
sed -i '' "s/{{copyright_year}}/${YEAR}/" gatsby-config.js
