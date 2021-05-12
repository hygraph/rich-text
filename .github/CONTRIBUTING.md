# Contribution guidelines

## Getting started

First off, we would like to thank you for taking the time to contribute and make this a better project!

Here we have a set of instructions and guidelines to reduce misunderstandings and make the process of contributing to the Rich Text project as smooth as possible. We hope this guide makes the contribution process clear and answers any questions you may have.

## Local Development

### Prerequisites

- [Node.js](http://nodejs.org/) >= v12 must be installed.
- [Yarn](https://yarnpkg.com/en/docs/install)

There are 2 packages:

- `@graphcms/rich-text-react-renderer` - Rich text React renderer
- `@graphcms/rich-text-types` - TypeScript definition for the Rich Text field

You can install all the dependencies in the root directory. Since the monorepo uses Lerna and Yarn Workspaces, npm CLI is not supported (only yarn).

```sh
yarn install
```

This will install all dependencies in each project, build them, and symlink them via Lerna.

## Development workflow

In one terminal, run tsdx watch in parallel:

```sh
yarn start
```

This builds each package to `<packages>/<package>/dist` and runs the project in watch mode so any edits you save inside `<packages>/<package>/src` cause a rebuild to `<packages>/<package>/dist`. The results will stream to to the terminal.

### Using the example/playground

You can play with local packages in the Parcel-powered example/playground.

```sh
yarn start:app
```

This will start the example/playground on `localhost:1234`. If you have lerna running watch in parallel mode in one terminal, and then you run parcel, your playground will hot reload when you make changes to any imported module whose source is inside of `packages/*/src/*`. Note that to accomplish this, each package's `start` command passes TDSX the `--noClean` flag. This prevents Parcel from exploding between rebuilds because of File Not Found errors.

Important Safety Tip: When adding/altering packages in the playground, use `alias` object in package.json. This will tell Parcel to resolve them to the filesystem instead of trying to install the package from NPM. It also fixes duplicate React errors you may run into.

## Why all these rules?

We try to enforce these rules for the following reasons:

- Automatically generating changelog;
- Communicating in a better way the nature of changes;
- Triggering build and publish processes;
- Automatically determining a semantic version bump (based on the types of commits);
- Making it easier for people to contribute, by allowing them to explore a more structured commit history.

## Pull Requests

When opening a pull request, please be sure to update any relevant documentation in the READMEs or write some additional tests to ensure functionality. Also include a high-level list of changes.

## Changesets

This repository uses [changesets][] to do versioning. What that means for contributors is that you need to add a changeset by running `yarn changeset` which contains what packages should be bumped, their associated semver bump types, and some markdown which will be inserted into changelogs.

### Publish canary version

To publish a canary version using `changesets`, you'll need to be in the GraphCMS npm organization. Otherwise, ask a maintainer to do it for you. To get started, enter prerelease mode. You can do that with the `pre enter <tag>`. The tag that you need to pass is used in versions(e.g. `1.0.0-canary.0`) and the npm dist tag.

A prerelease workflow might look something like this:

```sh
yarn changeset pre enter canary
yarn changeset
yarn changeset version
yarn build
git add .
git commit -m "chore(release): v1.0.0-canary.0"
yarn changeset publish
git push --follow-tags
```

For more information, [check this link](https://github.com/atlassian/changesets/blob/main/docs/prereleases.md).

[yarn workspaces]: https://yarnpkg.com/en/docs/workspaces
[changesets]: https://github.com/atlassian/changesets
