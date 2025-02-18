import { getExtensions, register, RegisterOptions, Service } from './index';
import {
  parse as parseUrl,
  format as formatUrl,
  UrlWithStringQuery,
  fileURLToPath,
  pathToFileURL,
} from 'url';
import { extname } from 'path';
import * as assert from 'assert';
import { normalizeSlashes } from './util';
const {
  createResolve,
} = require('../dist-raw/node-esm-resolve-implementation');

// Note: On Windows, URLs look like this: file:///D:/dev/@TypeStrong/ts-node-examples/foo.ts

/** @internal */
export function registerAndCreateEsmHooks(opts?: RegisterOptions) {
  // Automatically performs registration just like `-r ts-node/register`
  const tsNodeInstance = register(opts);

  return createEsmHooks(tsNodeInstance);
}

export function createEsmHooks(tsNodeService: Service) {
  tsNodeService.enableExperimentalEsmLoaderInterop();

  // Custom implementation that considers additional file extensions and automatically adds file extensions
  const nodeResolveImplementation = createResolve({
    ...getExtensions(tsNodeService.config),
    preferTsExts: tsNodeService.options.preferTsExts,
  });

  return { resolve, getFormat, transformSource };

  function isFileUrlOrNodeStyleSpecifier(parsed: UrlWithStringQuery) {
    // We only understand file:// URLs, but in node, the specifier can be a node-style `./foo` or `foo`
    const { protocol } = parsed;
    return protocol === null || protocol === 'file:';
  }

  async function resolve(
    specifier: string,
    context: { parentURL: string },
    defaultResolve: typeof resolve
  ): Promise<{ url: string }> {
    const defer = async () => {
      const r = await defaultResolve(specifier, context, defaultResolve);
      return r;
    };

    const parsed = parseUrl(specifier);
    const { pathname, protocol, hostname } = parsed;

    if (!isFileUrlOrNodeStyleSpecifier(parsed)) {
      return defer();
    }

    if (protocol !== null && protocol !== 'file:') {
      return defer();
    }

    // Malformed file:// URL?  We should always see `null` or `''`
    if (hostname) {
      // TODO file://./foo sets `hostname` to `'.'`.  Perhaps we should special-case this.
      return defer();
    }

    // pathname is the path to be resolved

    return nodeResolveImplementation.defaultResolve(
      specifier,
      context,
      defaultResolve
    );
  }

  type Format = 'builtin' | 'commonjs' | 'dynamic' | 'json' | 'module' | 'wasm';
  async function getFormat(
    url: string,
    context: {},
    defaultGetFormat: typeof getFormat
  ): Promise<{ format: Format }> {
    const defer = (overrideUrl: string = url) =>
      defaultGetFormat(overrideUrl, context, defaultGetFormat);

    const parsed = parseUrl(url);

    if (!isFileUrlOrNodeStyleSpecifier(parsed)) {
      return defer();
    }

    const { pathname } = parsed;
    assert(
      pathname !== null,
      'ESM getFormat() hook: URL should never have null pathname'
    );

    const nativePath = fileURLToPath(url);

    // If file has .ts, .tsx, or .jsx extension, then ask node how it would treat this file if it were .js
    const ext = extname(nativePath);
    let nodeSays: { format: Format };
    if (ext !== '.js' && !tsNodeService.ignored(nativePath)) {
      nodeSays = await defer(formatUrl(pathToFileURL(nativePath + '.js')));
    } else {
      nodeSays = await defer();
    }
    // For files compiled by ts-node that node believes are either CJS or ESM, check if we should override that classification
    if (
      !tsNodeService.ignored(nativePath) &&
      (nodeSays.format === 'commonjs' || nodeSays.format === 'module')
    ) {
      const { moduleType } = tsNodeService.moduleTypeClassifier.classifyModule(
        normalizeSlashes(nativePath)
      );
      if (moduleType === 'cjs') {
        return { format: 'commonjs' };
      } else if (moduleType === 'esm') {
        return { format: 'module' };
      }
    }
    return nodeSays;
  }

  async function transformSource(
    source: string | Buffer,
    context: { url: string; format: Format },
    defaultTransformSource: typeof transformSource
  ): Promise<{ source: string | Buffer }> {
    const defer = () =>
      defaultTransformSource(source, context, defaultTransformSource);

    const sourceAsString =
      typeof source === 'string' ? source : source.toString('utf8');

    const { url } = context;
    const parsed = parseUrl(url);

    if (!isFileUrlOrNodeStyleSpecifier(parsed)) {
      return defer();
    }
    const nativePath = fileURLToPath(url);

    if (tsNodeService.ignored(nativePath)) {
      return defer();
    }

    const emittedJs = tsNodeService.compile(sourceAsString, nativePath);

    return { source: emittedJs };
  }
}
