# Hippo documentation scaffold

## Introduction

This is repository serves as a lightweight CMS platform. It is based around markdown and has a simple HTML layout that can be overridden by adding custom css classes [see styling](/#styling). Content is added in the form of [markdown](https://www.markdownguide.org/) files using a varient called [github flavoured markdown](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)

For more information and how to use this repository [read the docs](/docs/Index.md)

## Developers

### Build and run locally

#### Prerequisites

* Git client - [install guide](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
* NPM - [install guide](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

optionally also install a node version manager as some packages will not work on the latest version. 

* **MAC OSX / Linux** - nvm - [install guide](https://github.com/nvm-sh/nvm#installing-and-updating)
* **Windows** - nvm-windows - [install guide](https://github.com/coreybutler/nvm-windows#installation--upgrades)

#### Build and run

Clone the repository

    git clone https://github.com/hippo-digital/hippo-docs-scaffold.git

Once the repository is cloned run

    npm install

and then 

    npm run start 

this will start the development web server running on port 8000. So you can open a browser and navigate to [http://localhost:8000](http://localhost:8000)

