<!--
BEFORE EDITING THIS README
Our README.md is auto-generated by combining pages in website/docs and website/readme-sources

If you are sending a pull request to improve documentation, submit your changes
in the source markdown files and we will generate the README from there.

You can build the readme with this command:

    cd website && yarn build-readme
-->

# ![TypeScript Node](logo.svg?sanitize=true)

[![NPM version](https://img.shields.io/npm/v/ts-node.svg?style=flat)](https://npmjs.org/package/ts-node)
[![NPM downloads](https://img.shields.io/npm/dm/ts-node.svg?style=flat)](https://npmjs.org/package/ts-node)
[![Build status](https://img.shields.io/github/workflow/status/TypeStrong/ts-node/Continuous%20Integration)](https://github.com/TypeStrong/ts-node/actions?query=workflow%3A%22Continuous+Integration%22)
[![Test coverage](https://codecov.io/gh/TypeStrong/ts-node/branch/main/graph/badge.svg)](https://codecov.io/gh/TypeStrong/ts-node)

> TypeScript execution and REPL for node.js, with source map support. **Works with `typescript@>=2.7`**.

The latest documentation can also be found on our website: <https://typestrong.org/ts-node>

### *Experimental ESM support*

Native ESM support is currently experimental. For usage, limitations, and to provide feedback, see [#1007](https://github.com/TypeStrong/ts-node/issues/1007).

# Table of Contents

*   [Overview](#overview)
    *   [Features](#features)
*   [Installation](#installation)
*   [Usage](#usage)
    *   [Shell](#shell)
    *   [Shebang](#shebang)
    *   [Programmatic](#programmatic)
        *   [Developers](#developers)
*   [Configuration](#configuration)
    *   [CLI flags](#cli-flags)
    *   [Via tsconfig.json (recommended)](#via-tsconfigjson-recommended)
        *   [@tsconfig/bases](#tsconfigbases)
        *   [Default config](#default-config)
    *   [`node` flags](#node-flags)
*   [Options](#options)
    *   [Shell](#shell-1)
    *   [TSConfig](#tsconfig)
    *   [Typechecking](#typechecking)
    *   [Transpilation](#transpilation)
    *   [Diagnostics](#diagnostics)
    *   [Advanced](#advanced)
    *   [API](#api)
*   [CommonJS vs native ECMAScript modules](#commonjs-vs-native-ecmascript-modules)
    *   [CommonJS](#commonjs)
    *   [Native ECMAScript modules](#native-ecmascript-modules)
*   [Troubleshooting](#troubleshooting)
    *   [Understanding configuration](#understanding-configuration)
    *   [Understanding Errors](#understanding-errors)
        *   [`TSError`](#tserror)
        *   [`SyntaxError`](#syntaxerror)
            *   [Unsupported JavaScript syntax](#unsupported-javascript-syntax)
*   [Make it fast](#make-it-fast)
    *   [Skip typechecking](#skip-typechecking)
    *   [With typechecking](#with-typechecking)
*   [Advanced](#advanced-1)
    *   [How It Works](#how-it-works)
        *   [Skipping `node_modules`](#skipping-node_modules)
    *   [paths and baseUrl
        ](#paths-and-baseurl)
        *   [Why is this not built-in to `ts-node`?](#why-is-this-not-built-in-to-ts-node)
    *   [Help! My Types Are Missing!](#help-my-types-are-missing)
    *   [Third-party compilers](#third-party-compilers)
    *   [Third-party transpilers](#third-party-transpilers)
        *   [Bundled `swc` integration](#bundled-swc-integration)
        *   [Writing your own integration](#writing-your-own-integration)
    *   [Module type overrides](#module-type-overrides)
        *   [Caveats](#caveats)
*   [Recipes](#recipes)
    *   [Watching and Restarting](#watching-and-restarting)
    *   [AVA](#ava)
        *   [CommonJS](#commonjs-1)
        *   [Native ECMAScript modules](#native-ecmascript-modules-1)
    *   [Gulp](#gulp)
    *   [IntelliJ and Webstorm](#intellij-and-webstorm)
    *   [Mocha](#mocha)
        *   [Mocha 7 and newer](#mocha-7-and-newer)
        *   [Mocha <=6](#mocha-6)
    *   [Tape](#tape)
    *   [Visual Studio Code](#visual-studio-code)
    *   [Other](#other)
*   [License](#license)

# Overview

`ts-node` is a TypeScript execution engine and REPL for Node.js.

It JIT transforms TypeScript into JavaScript, enabling you to directly execute TypeScript on Node.js without precompiling.
This is accomplished by hooking node's module loading APIs, enabling it to be used seamlessly alongside other Node.js
tools and libraries.

## Features

*   Automatic sourcemaps in stack traces
*   Automatic `tsconfig.json` parsing
*   Automatic defaults to match your node version
*   Typechecking (optional)
*   REPL
*   Write standalone scripts
*   Native ESM loader
*   Use third-party transpilers
*   Use custom transformers
*   Integrate with test runners, debuggers, and CLI tools
*   Compatible with pre-compilation for production

![TypeScript REPL](website/static/img/screenshot.png)

# Installation

```shell
# Locally in your project.
npm install -D typescript
npm install -D ts-node

# Or globally with TypeScript.
npm install -g typescript
npm install -g ts-node

# Depending on configuration, you may also need these
npm install -D tslib @types/node
```

**Tip:** Installing modules locally allows you to control and share the versions through `package.json`. TS Node will always resolve the compiler from `cwd` before checking relative to its own installation.

# Usage

## Shell

```shell
# Execute a script as `node` + `tsc`.
ts-node script.ts

# Starts a TypeScript REPL.
ts-node

# Execute code with TypeScript.
ts-node -e 'console.log("Hello, world!")'

# Execute, and print, code with TypeScript.
ts-node -p -e '"Hello, world!"'

# Pipe scripts to execute with TypeScript.
echo 'console.log("Hello, world!")' | ts-node

# Equivalent to ts-node --transpile-only
ts-node-transpile-only script.ts

# Equivalent to ts-node --cwd-mode
ts-node-cwd script.ts
```

## Shebang

```typescript
#!/usr/bin/env ts-node

console.log("Hello, world!")
```

Passing CLI arguments via shebang is allowed on Mac but not Linux.  For example, the following will fail on Linux:

    #!/usr/bin/env ts-node --files
    // This shebang is not portable.  It only works on Mac

Instead, specify all `ts-node` options in your `tsconfig.json`.

## Programmatic

You can require `ts-node` and register the loader for future requires by using `require('ts-node').register({ /* options */ })`. You can also use file shortcuts - `node -r ts-node/register` or `node -r ts-node/register/transpile-only` - depending on your preferences.

**Note:** If you need to use advanced node.js CLI arguments (e.g. `--inspect`), use them with `node -r ts-node/register` instead of the `ts-node` CLI.

### Developers

`ts-node` exports a `create()` function that can be used to initialize a TypeScript compiler that isn't registered to `require.extensions`, and it uses the same code as `register`.

# Configuration

`ts-node` supports a variety of options which can be specified via `tsconfig.json`, as CLI flags, as environment variables, or programmatically.

For a complete list, see [Options](#options).

## CLI flags

`ts-node` CLI flags must come *before* the entrypoint script. For example:

```shell
$ ts-node --project tsconfig-dev.json say-hello.ts Ronald
Hello, Ronald!
```

## Via tsconfig.json (recommended)

`ts-node` automatically finds and loads `tsconfig.json`.  Most `ts-node` options can be specified in a `"ts-node"` object using their programmatic, camelCase names. We recommend this because it works even when you cannot pass CLI flags, such as `node --require ts-node/register` and when using shebangs.

Use `--skip-project` to skip loading the `tsconfig.json`.  Use `--project` to explicitly specify the path to a `tsconfig.json`.

When searching, it is resolved using [the same search behavior as `tsc`](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html). By default, this search is performed relative to the entrypoint script. In `--cwd-mode` or if no entrypoint is specified -- for example when using the REPL -- the search is performed relative to `--cwd` / `process.cwd()`.

You can use this sample configuration as a starting point:

```jsonc title="tsconfig.json"
{
  // This is an alias to @tsconfig/node12: https://github.com/tsconfig/bases
  "extends": "ts-node/node12/tsconfig.json",

  // Most ts-node options can be specified here using their programmatic names.
  "ts-node": {
    // It is faster to skip typechecking.
    // Remove if you want ts-node to do typechecking.
    "transpileOnly": true,

    "files": true,

    "compilerOptions": {
      // compilerOptions specified here will override those declared below,
      // but *only* in ts-node.  Useful if you want ts-node and tsc to use
      // different options with a single tsconfig.json.
    }
  },
  "compilerOptions": {
    // typescript options here
  }
}
```

Our bundled [JSON schema](https://unpkg.com/browse/ts-node@latest/tsconfig.schema.json) lists all compatible options.

### @tsconfig/bases

[@tsconfig/bases](https://github.com/tsconfig/bases) maintains recommended configurations for several node versions.
As a convenience, these are bundled with `ts-node`.

```jsonc title="tsconfig.json"
{
  "extends": "ts-node/node16/tsconfig.json",

  // Or install directly with `npm i -D @tsconfig/node16`
  "extends": "@tsconfig/node16/tsconfig.json",
}
```

### Default config

If no `tsconfig.json` is loaded from disk, `ts-node` will use the newest recommended defaults from
[@tsconfig/bases](https://github.com/tsconfig/bases/) compatible with your `node` and `typescript` versions.
With the latest `node` and `typescript`, this is [`@tsconfig/node16`](https://github.com/tsconfig/bases/blob/master/bases/node16.json).

Older versions of `typescript` are incompatible with `@tsconfig/node16`.  In those cases we will use an older default configuration.

When in doubt, `ts-node --show-config` will log the configuration being used, and `ts-node -vv` will log `node` and `typescript` versions.

## `node` flags

[`node` flags](https://nodejs.org/api/cli.html) must be passed directly to `node`; they cannot be passed to the `ts-node` binary nor can they be specified in `tsconfig.json`

We recommend using the [`NODE_OPTIONS`](https://nodejs.org/api/cli.html#cli_node_options_options) environment variable to pass options to `node`.

```shell
NODE_OPTIONS='--trace-deprecation --abort-on-uncaught-exception' ts-node ./index.ts
```

Alternatively, you can invoke `node` directly and install `ts-node` via `--require`/`-r`

```shell
node --trace-deprecation --abort-on-uncaught-exception -r ts-node/register ./index.ts
```

# Options

`ts-node` supports `--print` (`-p`), `--eval` (`-e`), `--require` (`-r`) and `--interactive` (`-i`) similar to the [node.js CLI options](https://nodejs.org/api/cli.html).

*Environment variables, where available, are in `ALL_CAPS`*

## Shell

*   `-h, --help`   Prints the help text
*   `-v, --version`   Prints the version. `-vv` prints node and typescript compiler versions, too
*   `-e, --eval`   Evaluate code
*   `-p, --print`   Print result of `--eval`
*   `-i, --interactive`   Opens the REPL even if stdin does not appear to be a terminal

## TSConfig

*   `-P, --project [path]`   Path to TypeScript JSON project file <br/>*Environment:* `TS_NODE_PROJECT`
*   `--skip-project`   Skip project config resolution and loading <br/>*Default:* `false` <br/>*Environment:* `TS_NODE_SKIP_PROJECT`
*   `-c, --cwd-mode`   Resolve config relative to the current directory instead of the directory of the entrypoint script
*   `-O, --compiler-options [opts]`   JSON object to merge with compiler options <br/>*Environment:* `TS_NODE_COMPILER_OPTIONS`
*   `--show-config`   Print resolved `tsconfig.json`, including `ts-node` options, and exit

## Typechecking

*   `-T, --transpile-only`   Use TypeScript's faster `transpileModule` <br/>*Default:* `false` <br/>*Environment:* `TS_NODE_TRANSPILE_ONLY`
*   `--type-check`   Opposite of `--transpile-only` <br/>*Default:* `true`<br/>*Environment:* `TS_NODE_TYPE_CHECK`
*   `-H, --compiler-host`   Use TypeScript's compiler host API <br/>*Default:* `false` <br/>*Environment:* `TS_NODE_COMPILER_HOST`
*   `--files`   Load `files`, `include` and `exclude` from `tsconfig.json` on startup <br/>*Default:* `false` <br/>*Environment:* `TS_NODE_FILES`
*   `-D, --ignore-diagnostics [code]`   Ignore TypeScript warnings by diagnostic code <br/>*Environment:* `TS_NODE_IGNORE_DIAGNOSTICS`

## Transpilation

*   `-I, --ignore [pattern]`   Override the path patterns to skip compilation <br/>*Default:* `/node_modules/` <br/>*Environment:* `TS_NODE_IGNORE`
*   `--skip-ignore`   Skip ignore checks <br/>*Default:* `false` <br/>*Environment:* `TS_NODE_SKIP_IGNORE`
*   `-C, --compiler [name]`   Specify a custom TypeScript compiler <br/>*Default:* `typescript` <br/>*Environment:* `TS_NODE_COMPILER`
*   `--transpiler [name]`   Specify a third-party, non-typechecking transpiler
*   `--prefer-ts-exts`   Re-order file extensions so that TypeScript imports are preferred <br/>*Default:* `false` <br/>*Environment:* `TS_NODE_PREFER_TS_EXTS`

## Diagnostics

*   `--log-error`   Logs TypeScript errors to stderr instead of throwing exceptions <br/>*Default:* `false` <br/>*Environment:* `TS_NODE_LOG_ERROR`
*   `--pretty`   Use pretty diagnostic formatter <br/>*Default:* `false` <br/>*Environment:* `TS_NODE_PRETTY`
*   `TS_NODE_DEBUG` Enable debug logging<br/>

## Advanced

*   `-r, --require [path]`   Require a node module before execution
*   `--cwd`   Behave as if invoked in this working directory <br/>*Default:* `process.cwd()`<br/>*Environment:* `TS_NODE_CWD`
*   `--emit`   Emit output files into `.ts-node` directory <br/>*Default:* `false` <br/>*Environment:* `TS_NODE_EMIT`
*   `--scope`  Scope compiler to files within `scopeDir`.  Anything outside this directory is ignored. <br/>\*Default: `false` <br/>*Environment:* `TS_NODE_SCOPE`
*   `--scopeDir` Directory within which compiler is limited when `scope` is enabled. <br/>*Default:* First of: `tsconfig.json` "rootDir" if specified, directory containing `tsconfig.json`, or cwd if no `tsconfig.json` is loaded.<br/>*Environment:* `TS_NODE_SCOPE_DIR`
*   `moduleType`  Override the module type of certain files, ignoring the `package.json` `"type"` field.  See [Module type overrides](#module-type-overrides) for details.<br/>*Default:* obeys `package.json` `"type"` and `tsconfig.json` `"module"` <br/>*Can only be specified via `tsconfig.json` or API.*
*   `TS_NODE_HISTORY` Path to history file for REPL <br/>*Default:* `~/.ts_node_repl_history`<br/>
*   `--no-experimental-repl-await` Disable top-level await in REPL.  Equivalent to node's [`--no-experimental-repl-await`](https://nodejs.org/api/cli.html#cli_no_experimental_repl_await)<br/>*Default:* Enabled if TypeScript version is 3.8 or higher and target is ES2018 or higher.<br/>*Environment:* `TS_NODE_EXPERIMENTAL_REPL_AWAIT` set `false` to disable

## API

The API includes [additional options](https://typestrong.org/ts-node/api/interfaces/RegisterOptions.html) not shown here.

# CommonJS vs native ECMAScript modules

TypeScript is almost always written using modern `import` syntax, but you can choose to either transform to CommonJS or use node's native ESM support.  Configuration is different for each.

Here is a brief comparison of the two.

| CommonJS | Native ECMAScript modules |
|---|---|
| Write native `import` syntax | Write native `import` syntax |
| Transforms `import` into `require()` | Does not transform `import` |
| Node executes scripts using the classic [CommonJS loader](https://nodejs.org/dist/latest-v16.x/docs/api/modules.html) | Node executes scripts using the new [ESM loader](https://nodejs.org/dist/latest-v16.x/docs/api/esm.html) |
| Use any of:<br/>`ts-node` CLI<br/>`node -r ts-node/register`<br/>`NODE_OPTIONS="ts-node/register" node`<br/>`require('ts-node').register({/* options */})` | Must use the ESM loader via:<br/>`node --loader ts-node/esm`<br/>`NODE_OPTIONS="--loader ts-node/esm" node` |

## CommonJS

Transforming to CommonJS is typically simpler and more widely supported because it is older.  You must remove [`"type": "module"`](https://nodejs.org/api/packages.html#packages_type) from `package.json` and set [`"module": "CommonJS"`](https://www.typescriptlang.org/tsconfig/#module) in `tsconfig.json`.

```jsonc title="package.json"
{
  // This can be omitted; commonjs is the default
  "type": "commonjs"
}
```

```jsonc title="tsconfig.json"
{
  "compilerOptions": {
    "module": "CommonJS"
  }
}
```

If you must keep `"module": "ESNext"` for `tsc`, webpack, or another build tool, you can set an override for `ts-node`.

```jsonc title="tsconfig.json"
{
  "compilerOptions": {
    "module": "ESNext"
  },
  "ts-node": {
    "compilerOptions": {
      "module": "CommonJS"
    }
  }
}
```

## Native ECMAScript modules

[Node's ESM loader hooks](https://nodejs.org/api/esm.html#esm_experimental_loaders) are [**experimental**](https://nodejs.org/api/documentation.html#documentation_stability_index) and subject to change. `ts-node`'s ESM support is also experimental. They may have
breaking changes in minor and patch releases and are not recommended for production.

For complete usage, limitations, and to provide feedback, see [#1007](https://github.com/TypeStrong/ts-node/issues/1007).

You must set [`"type": "module"`](https://nodejs.org/api/packages.html#packages_type) in `package.json` and [`"module": "ESNext"`](https://www.typescriptlang.org/tsconfig/#module) in `tsconfig.json`.

```jsonc title="package.json"
{
  "type": "module"
}
```

```jsonc title="tsconfig.json"
{
  "compilerOptions": {
    "module": "ESNext" // or ES2015, ES2020
  }
}
```

# Troubleshooting

## Understanding configuration

`ts-node` uses sensible default configurations to reduce boilerplate while still respecting `tsconfig.json` if you
have one.  If you are unsure which configuration is used, you can log it with `ts-node --show-config`.  This is similar to
`tsc --showConfig` but includes `"ts-node"` options as well.

`ts-node` also respects your locally-installed `typescript` version, but global installations fallback to the globally-installed
`typescript`.  If you are unsure which versions are used, `ts-node -vv` will log them.

```shell
$ ts-node -vv
ts-node v10.0.0
node v16.1.0
compiler v4.2.2

$ ts-node --show-config
{
  "compilerOptions": {
    "target": "es6",
    "lib": [
      "es6",
      "dom"
    ],
    "rootDir": "./src",
    "outDir": "./.ts-node",
    "module": "commonjs",
    "moduleResolution": "node",
    "strict": true,
    "declaration": false,
    "sourceMap": true,
    "inlineSources": true,
    "types": [
      "node"
    ],
    "stripInternal": true,
    "incremental": true,
    "skipLibCheck": true,
    "importsNotUsedAsValues": "error",
    "inlineSourceMap": false,
    "noEmit": false
  },
  "ts-node": {
    "cwd": "/d/project",
    "projectSearchDir": "/d/project",
    "require": [],
    "project": "/d/project/tsconfig.json"
  }
}
```

## Understanding Errors

It is important to differentiate between errors from `ts-node`, errors from the TypeScript compiler, and errors from `node`.  It is also important to understand when errors are caused by a type error in your code, a bug in your code, or a flaw in your configuration.

### `TSError`

Type errors from the compiler are thrown as a `TSError`.  These are the same as errors you get from `tsc`.

### `SyntaxError`

Any error that is not a `TSError` is from node.js (e.g. `SyntaxError`), and cannot be fixed by TypeScript or `ts-node`. These are bugs in your code or configuration.

#### Unsupported JavaScript syntax

Your version of `node` may not support all JavaScript syntax supported by TypeScript.  The compiler must transform this syntax via "downleveling," which is controlled by
the [tsconfig `"target"` option](https://www.typescriptlang.org/tsconfig#target).  Otherwise your code will compile fine, but node will throw a `SyntaxError`.

For example, `node` 12 does not understand the `?.` optional chaining operator.  If you use `"target": "esnext"`, then the following TypeScript syntax:

```typescript
const bar: string | undefined = foo?.bar;
```

will compile into this JavaScript:

```javascript
const a = foo?.bar;
```

When you try to run this code, node 12 will throw a `SyntaxError`.  To fix this, you must switch to `"target": "es2019"` or lower so TypeScript transforms `?.` into something `node` can understand.

# Make it fast

These tricks will make `ts-node` faster.

## Skip typechecking

It is often better to use `tsc --noEmit` to typecheck once before your tests run or as a lint step. In these cases, `ts-node` can skip typechecking.

*   Enable [`transpileOnly`](#options) to skip typechecking
*   Use our [`swc` integration](#bundled-swc-integration)
    *   This is by far the fastest option

## With typechecking

*   Avoid dynamic `require()` which may trigger repeated typechecking; prefer `import`
*   Try with and without `--files`; one may be faster depending on your project
*   Check `tsc --showConfig`; make sure all executed files are included
*   Enable [`skipLibCheck`](https://www.typescriptlang.org/tsconfig#skipLibCheck)
*   Set a [`types`](https://www.typescriptlang.org/tsconfig#types) array to avoid loading unnecessary `@types`

# Advanced

## How It Works

`ts-node` works by registering hooks for `.ts`, `.tsx`, `.js`, and/or `.jsx` extensions.

Vanilla `node` loads `.js` by reading code from disk and executing it.  Our hook runs in the middle, transforming code from TypeScript to JavaScript and passing the result to `node` for execution.  This transformation will respect your `tsconfig.json` as if you had compiled via `tsc`.

`.js` and `.jsx` are only transformed when [`allowJs`](https://www.typescriptlang.org/docs/handbook/compiler-options.html#compiler-options) is enabled.

`.tsx` and `.jsx` are only transformed when [`jsx`](https://www.typescriptlang.org/docs/handbook/jsx.html) is enabled.

> **Warning:** if a file is ignored or its file extension is not registered, node will either fail to resolve the file or will attempt to execute it as JavaScript without any transformation.  This may cause syntax errors or other failures, because node does not understand TypeScript type syntax nor bleeding-edge ECMAScript features.

> **Warning:** When `ts-node` is used with `allowJs`, all non-ignored JavaScript files are transformed using the TypeScript compiler.

### Skipping `node_modules`

By default, **TypeScript Node** avoids compiling files in `/node_modules/` for three reasons:

1.  Modules should always be published in a format node.js can consume
2.  Transpiling the entire dependency tree will make your project slower
3.  Differing behaviours between TypeScript and node.js (e.g. ES2015 modules) can result in a project that works until you decide to support a feature natively from node.js

## paths and baseUrl&#xA;

You can use `ts-node` together with [tsconfig-paths](https://www.npmjs.com/package/tsconfig-paths) to load modules according to the `paths` section in `tsconfig.json`.

```jsonc title="tsconfig.json"
{
  "ts-node": {
    // Do not forget to `npm i -D tsconfig-paths`
    "require": ["tsconfig-paths/register"]
  }
}
```

### Why is this not built-in to `ts-node`?

The official TypeScript Handbook explains the intended purpose for `"paths"` in ["Additional module resolution flags"](https://www.typescriptlang.org/docs/handbook/module-resolution.html#additional-module-resolution-flags).

> The TypeScript compiler has a set of additional flags to *inform* the compiler of transformations that are expected to happen to the sources to generate the final output.
>
> It is important to note that the compiler will not perform any of these transformations; it just uses these pieces of information to guide the process of resolving a module import to its definition file.

This means `"paths"` are intended to describe mappings that the build tool or runtime *already* performs, not to tell the build tool or
runtime how to resolve modules.  In other words, they intend us to write our imports in a way `node` already understands.  For this reason, `ts-node` does not modify `node`'s module resolution behavior to implement `"paths"` mappings.

## Help! My Types Are Missing!

**TypeScript Node** does *not* use `files`, `include` or `exclude`, by default. This is because a large majority projects do not use all of the files in a project directory (e.g. `Gulpfile.ts`, runtime vs tests) and parsing every file for types slows startup time. Instead, `ts-node` starts with the script file (e.g. `ts-node index.ts`) and TypeScript resolves dependencies based on imports and references.

For global definitions, you can use the `typeRoots` compiler option.  This requires that your type definitions be structured as type packages (not loose TypeScript definition files). More details on how this works can be found in the [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html#types-typeroots-and-types).

Example `tsconfig.json`:

```jsonc
{
  "compilerOptions": {
    "typeRoots" : ["./node_modules/@types", "./typings"]
  }
}
```

Example project structure:

```text
<project_root>/
-- tsconfig.json
-- typings/
  -- <module_name>/
    -- index.d.ts
```

Example module declaration file:

```typescript
declare module '<module_name>' {
    // module definitions go here
}
```

For module definitions, you can use [`paths`](https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping):

```jsonc
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "custom-module-type": ["types/custom-module-type"]
    }
  }
}
```

An alternative approach for definitions of third-party libraries are [triple-slash directives](https://www.typescriptlang.org/docs/handbook/triple-slash-directives.html). This may be helpful if you prefer not to change your TypeScript `compilerOptions` or structure your custom type definitions when using `typeRoots`. Below is an example of the triple-slash directive as a relative path within your project:

```typescript
/// <reference types="./types/untyped_js_lib" />
import UntypedJsLib from "untyped_js_lib"
```

**Tip:** If you *must* use `files`, `include`, or `exclude`, enable `--files` flags or set `TS_NODE_FILES=true`.

## Third-party compilers

Some projects require a patched typescript compiler which adds additional features.  For example, [`ttypescript`](https://github.com/cevek/ttypescript/tree/master/packages/ttypescript) and [`ts-patch`](https://github.com/nonara/ts-patch#readme)
add the ability to configure custom transformers.  These are drop-in replacements for the vanilla `typescript` module and
implement the same API.

For example, to use `ttypescript` and `ts-transformer-keys`, add this to your `tsconfig.json`:

```jsonc title="tsconfig.json"
{
  "ts-node": {
    // This can be omitted when using ts-patch
    "compiler": "ttypescript"
  },
  "compilerOptions": {
    // plugin configuration is the same for both ts-patch and ttypescript
    "plugins": [
      { "transform": "ts-transformer-keys/transformer" }
    ]
  }
}
```

## Third-party transpilers

In transpile-only mode, we skip typechecking to speed up execution time.  You can go a step further and use a
third-party transpiler to transform TypeScript into JavaScript even faster.  You will still benefit from
`ts-node`'s automatic `tsconfig.json` discovery, sourcemap support, and global `ts-node` CLI.  Integrations
can automatically derive an appropriate configuration from your existing `tsconfig.json` which simplifies project
boilerplate.

> **What is the difference between a compiler and a transpiler?**
>
> For our purposes, a compiler implements TypeScript's API and can perform typechecking.
> A third-party transpiler does not.  Both transform TypeScript into JavaScript.

### Bundled `swc` integration

We have bundled an experimental `swc` integration.

[`swc`](https://swc.rs) is a TypeScript-compatible transpiler implemented in Rust.  This makes it an order of magnitude faster
than `transpileModule`.

To use it, first install `@swc/core` or `@swc/wasm`.  If using `importHelpers`, also install `@swc/helpers`.

```shell
npm i -D @swc/core @swc/helpers
```

Then add the following to your `tsconfig.json`.

```jsonc title="tsconfig.json"
{
  "ts-node": {
    "transpileOnly": true,
    "transpiler": "ts-node/transpilers/swc-experimental"
  }
}
```

> `swc` uses `@swc/helpers` instead of `tslib`.  If you have enabled `importHelpers`, you must also install `@swc/helpers`.

### Writing your own integration

To write your own transpiler integration, check our [API docs](https://typestrong.org/ts-node/api/interfaces/TranspilerModule.html).

Integrations are `require()`d, so they can be published to npm.  The module must export a `create` function matching the
[`TranspilerModule`](https://typestrong.org/ts-node/api/interfaces/TranspilerModule.html) interface.

## Module type overrides

When deciding between CommonJS and native ECMAScript modules, `ts-node` defaults to matching vanilla `node` and `tsc`
behavior.  This means TypeScript files are transformed according to your `tsconfig.json` `"module"` option and executed
according to node's rules for the `package.json` `"type"` field.

In some projects you may need to override this behavior for some files.  For example, in a webpack
project, you may have `package.json` configured with `"type": "module"` and `tsconfig.json` with
`"module": "esnext"`.  However, webpack uses our CommonJS hook to execute your `webpack.config.ts`,
so you need to force your webpack config and any supporting scripts to execute as CommonJS.

In these situations, our `moduleTypes` option lets you override certain files, forcing execution as
CommonJS or ESM.  Node supports similar overriding via `.cjs` and `.mjs` file extensions, but `.ts` files cannot use them.
`moduleTypes` achieves the same effect, and *also* overrides your `tsconfig.json` `"module"` config appropriately.

The following example tells `ts-node` to execute a webpack config as CommonJS:

```jsonc title=tsconfig.json
{
  "ts-node": {
    "transpileOnly": true,
    "moduleTypes": {
      "webpack.config.ts": "cjs",
      // Globs are also supported with the same behavior as tsconfig "include"
      "webpack-config-scripts/**/*": "cjs"
    }
  },
  "compilerOptions": {
    "module": "es2020",
    "target": "es2020"
  }
}
```

Each key is a glob pattern with the same syntax as tsconfig's `"include"` array.
When multiple patterns match the same file, the last pattern takes precedence.

*   `cjs` overrides matches files to compile and execute as CommonJS.
*   `esm` overrides matches files to compile and execute as native ECMAScript modules.
*   `package` resets either of the above to default behavior, which obeys `package.json` `"type"` and `tsconfig.json` `"module"` options.

### Caveats

Files with an overridden module type are transformed with the same limitations as [`isolatedModules`](https://www.typescriptlang.org/tsconfig#isolatedModules).  This will only affect rare cases such as using `const enum`s with [`preserveConstEnums`](https://www.typescriptlang.org/tsconfig#preserveConstEnums) disabled.

This feature is meant to facilitate scenarios where normal `compilerOptions` and `package.json` configuration is not possible.  For example, a `webpack.config.ts` cannot be given its own `package.json` to override `"type"`.  Wherever possible you should favor using traditional `package.json` and `tsconfig.json` configurations.

# Recipes

## Watching and Restarting

**TypeScript Node** compiles source code via `require()`, watching files and code reloads are out of scope for the project. If you want to restart the `ts-node` process on file change, existing node.js tools such as [nodemon](https://github.com/remy/nodemon), [onchange](https://github.com/Qard/onchange) and [node-dev](https://github.com/fgnass/node-dev) work.

There's also [`ts-node-dev`](https://github.com/whitecolor/ts-node-dev), a modified version of [`node-dev`](https://github.com/fgnass/node-dev) using `ts-node` for compilation that will restart the process on file change.

## AVA

Assuming you are configuring AVA via your `package.json`, add one of the following configurations.

### CommonJS

Use this configuration if your `package.json` does not have `"type": "module"`.

```jsonc title"package.json"
{
  "ava": {
    "extensions": [
      "ts"
    ],
    "require": [
      "ts-node/register"
    ]
  }
}
```

### Native ECMAScript modules

This configuration is necessary if your `package.json` has `"type": "module"`.

```jsonc title"package.json"
{
  "ava": {
    "extensions": {
      "ts": "module"
    },
    "nonSemVerExperiments": {
      "configurableModuleFormat": true
    },
    "nodeArguments": [
      "--loader=ts-node/esm"
    ]
  }
}
```

## Gulp

ts-node support is built-in to gulp.

```sh
# Create a `gulpfile.ts` and run `gulp`.
gulp
```

See also: https://gulpjs.com/docs/en/getting-started/javascript-and-gulpfiles#transpilation

## IntelliJ and Webstorm

Create a new Node.js configuration and add `-r ts-node/register` to "Node parameters."

**Note:** If you are using the `--project <tsconfig.json>` command line argument as per the [Configuration Options](#configuration), and want to apply this same behavior when launching in IntelliJ, specify under "Environment Variables": `TS_NODE_PROJECT=<tsconfig.json>`.

## Mocha

### Mocha 7 and newer

```shell
mocha --require ts-node/register --extensions ts,tsx --watch --watch-files src 'tests/**/*.{ts,tsx}' [...args]
```

Or specify options via your mocha config file.

```jsonc title=".mocharc.json"
{
  // Specify "require" for CommonJS
  "require": "ts-node/register",
  // Specify "loader" for native ESM
  "loader": "ts-node/esm",
  "extensions": ["ts", "tsx"],
  "spec": [
    "tests/**/*.spec.*"
  ],
  "watch-files": [
    "src"
  ]
}
```

See also: https://mochajs.org/#configuring-mocha-nodejs

### Mocha <=6

```shell
mocha --require ts-node/register --watch-extensions ts,tsx "test/**/*.{ts,tsx}" [...args]
```

**Note:** `--watch-extensions` is only used in `--watch` mode.

## Tape

```shell
ts-node node_modules/tape/bin/tape [...args]
```

## Visual Studio Code

Create a new node.js configuration, add `-r ts-node/register` to node args and move the `program` to the `args` list (so VS Code doesn't look for `outFiles`).

```jsonc
{
    "type": "node",
    "request": "launch",
    "name": "Launch Program",
    "runtimeArgs": [
        "-r",
        "ts-node/register"
    ],
    "args": [
        "${workspaceFolder}/index.ts"
    ]
}
```

**Note:** If you are using the `--project <tsconfig.json>` command line argument as per the [Configuration Options](#configuration), and want to apply this same behavior when launching in VS Code, add an "env" key into the launch configuration: `"env": { "TS_NODE_PROJECT": "<tsconfig.json>" }`.

## Other

In many cases, setting [`NODE_OPTIONS`](https://nodejs.org/api/cli.html#cli_node_options_options) will enable `ts-node` within other node tools, child processes, and worker threads.

```shell
NODE_OPTIONS="-r ts-node/register"
```

Or, if you require native ESM support:

```shell
NODE_OPTIONS="--loader ts-node/esm"
```

This tells any node processes which receive this environment variable to install `ts-node`'s hooks before executing other code.

# License

ts-node is licensed under the MIT license.  [MIT](https://github.com/TypeStrong/ts-node/blob/main/LICENSE)

ts-node includes source code from Node.js which is licensed under the MIT license.  [Node.js license information](https://raw.githubusercontent.com/nodejs/node/master/LICENSE)

ts-node includes source code from the TypeScript compiler which is licensed under the Apache License 2.0.  [TypeScript license information](https://github.com/microsoft/TypeScript/blob/master/LICENSE.txt)
