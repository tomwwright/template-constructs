# Template-as-Code with Constructs library

## Running

Install dependencies

```sh
$ yarn install
```

Run generator script

```sh
$ yarn app:run
```

Inspect template output in `out/base` and `out/typescript`

## Code

Core library code for the "framework" exists in `lib/constructs` -- code APIs for directories, JSON files, etc.

Project definitions in `lib/projects` -- currently an example `base` project and then an incomplete example of a `typescript` project built on top of it

Script for synthing the projects into local filesystem in `bin/index.ts` -- this is the analogue for a `.projenrc.js` file or the entrypoint of a CDK app