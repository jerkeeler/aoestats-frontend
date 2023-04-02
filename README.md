# DEPRECATED REPO SEE https://github.com/jerkeeler/aoestats-redux-issues

aoestats.io is relaunched! Head over to the other repo to report any issues and see project planning.


# aoestats-frontend

This is the frontend for [aoestats.io](https://aoestats.io). The entire site is a single page app written using [React](https://reactjs.org/) and [GatsbyJS](https://www.gatsbyjs.org/). This allows for the ultimate flexibility in user performance and SEO. I've also opt'd to make this a client only application in order to reduce hosting cost and provide a better experience for overseas users by distributing all static files on a CDN. Right now host is done on [Netlify](https://www.netlify.com/), however I've thought about switching to [Vercel](https://vercel.com/) for unlimited bandwidth.

## Developing

In order to develop this application you will need a postgres database setup. View the [Database Schema](#database-schema) section for what the DB should like.

To set up your dev environment:

1. Ensure that you have [NodeJS](https://nodejs.org/en/) at least version 12
   - I would recommend using [nvm](https://github.com/nvm-sh/nvm) to manage your node versions
2. Clone this repo
3. Copy .env.example to .env and fill in the values appropriately for your DB
4. Run `npm i`
5. Run `npm run develop`
6. Visit [http://localhost:8001](http://localhost:8001) to view the

## Database Schema

Your postgres database must have the following tables:

- de_civilizationstats
- de_filter
- de_mapstats
- de_match
- de_matchplayer
- de_playerprofile

The schemas for these tables are still private, but will be released in due order, when I have APIs to expose this data directly.

## Deploying

To deploy this:

1. Install the [netlify cli](https://docs.netlify.com/cli/get-started/) and set it up
2. Link your local repo with your netlify project
3. Run `npm run deploy` to make a test deploy, verify everything looks good
4. Run `npm run deploy:prod` to deploy to production
