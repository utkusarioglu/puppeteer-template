# Puppeteer silent

A puppeteer template for building crawlers

## Usage

### Starting up

`yarn start` will start nodemon server.

### Puppeteer plugins

This template uses a bunch of plugins and certain settings for puppeteer. You
can see these in `browser.ts`.

### Defining config values

You can use `config.ts` for setting the config variables. Of which are sensitive
are parsed from the `.env` file. You can define the types of the `.env` values
from `global.types.d.ts` file.

### Setting up automation

If you are interested in setting up a single page operation, the workflow in
`index.ts` should be exemplary enough to get you started. As this is only a
simple template repo, there isn't much difference from the operation of vanilla
puppeteer.
