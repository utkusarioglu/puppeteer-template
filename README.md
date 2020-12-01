# Puppeteer silent

A puppeteer template for building crawlers

## Usage

### Starting up

`yarn start` will start the nodemon server.

### Puppeteer plugins

This template uses a bunch of plugins and certain settings for puppeteer. These
can be seen in the module `browser.ts`.

### Defining config values

`config.ts` is set as the single source of config for non-sensitive config
values. For the sensitive content such as passwords and usernames, an `.env`
file is advised. Types for the `.env` file values can be declared in the module
`global.d.ts`. Two example values for username and password have been defined in
the module to set examples for usage.

### Setting up automation

For single browser page operations, the workflow in `index.ts` should be enough
to get one started. As this is only a simple template repo, there isn't much
difference from the operation of vanilla puppeteer.
