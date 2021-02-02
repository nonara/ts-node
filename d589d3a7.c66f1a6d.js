(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{126:function(e,t,n){"use strict";n.r(t),t.default=n.p+"assets/images/screenshot-73aaaea232c2c691916fe51409986ec1.png"},80:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return s})),n.d(t,"toc",(function(){return c})),n.d(t,"default",(function(){return l}));var r=n(3),a=n(7),o=(n(0),n(86)),i={title:"Getting Started",slug:"/"},s={unversionedId:"getting-started",id:"getting-started",isDocsHomePage:!1,title:"Getting Started",description:"Installation",source:"@site/docs/getting-started.md",slug:"/",permalink:"/ts-node/docs/",editUrl:"https://github.com/TypeStrong/ts-node/edit/master/website/docs/getting-started.md",version:"current",sidebar:"primarySidebar",next:{title:"How It Works",permalink:"/ts-node/docs/how-it-works"}},c=[{value:"Installation",id:"installation",children:[]},{value:"Usage",id:"usage",children:[{value:"Shell",id:"shell",children:[]},{value:"Shebang",id:"shebang",children:[]},{value:"Programmatic",id:"programmatic",children:[]}]},{value:"Help! My Types Are Missing!",id:"help-my-types-are-missing",children:[]},{value:"Watching and Restarting",id:"watching-and-restarting",children:[]},{value:"License",id:"license",children:[]}],p={toc:c};function l(e){var t=e.components,i=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(r.a)({},p,i,{components:t,mdxType:"MDXLayout"}),Object(o.b)("h2",{id:"installation"},"Installation"),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-sh"}),"# Locally in your project.\nnpm install -D typescript\nnpm install -D ts-node\n\n# Or globally with TypeScript.\nnpm install -g typescript\nnpm install -g ts-node\n")),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Tip:")," Installing modules locally allows you to control and share the versions through ",Object(o.b)("inlineCode",{parentName:"p"},"package.json"),". TS Node will always resolve the compiler from ",Object(o.b)("inlineCode",{parentName:"p"},"cwd")," before checking relative to its own installation."),Object(o.b)("h2",{id:"usage"},"Usage"),Object(o.b)("h3",{id:"shell"},"Shell"),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-sh"}),"# Execute a script as `node` + `tsc`.\nts-node script.ts\n\n# Starts a TypeScript REPL.\nts-node\n\n# Execute code with TypeScript.\nts-node -e 'console.log(\"Hello, world!\")'\n\n# Execute, and print, code with TypeScript.\nts-node -p -e '\"Hello, world!\"'\n\n# Pipe scripts to execute with TypeScript.\necho 'console.log(\"Hello, world!\")' | ts-node\n\n# Equivalent to ts-node --script-mode\nts-node-script scripts.ts\n\n# Equivalent to ts-node --transpile-only\nts-node-transpile-only scripts.ts\n")),Object(o.b)("p",null,Object(o.b)("img",{alt:"TypeScript REPL",src:n(126).default})),Object(o.b)("h3",{id:"shebang"},"Shebang"),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-typescript"}),'#!/usr/bin/env ts-node-script\n\nconsole.log("Hello, world!")\n')),Object(o.b)("p",null,Object(o.b)("inlineCode",{parentName:"p"},"ts-node-script")," is recommended because it enables ",Object(o.b)("inlineCode",{parentName:"p"},"--script-mode"),", discovering ",Object(o.b)("inlineCode",{parentName:"p"},"tsconfig.json")," relative to the script's location instead of ",Object(o.b)("inlineCode",{parentName:"p"},"process.cwd()"),".  This makes scripts more portable."),Object(o.b)("p",null,"Passing CLI arguments via shebang is allowed on Mac but not Linux.  For example, the following will fail on Linux:"),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{}),"#!/usr/bin/env ts-node --script-mode --transpile-only --files\n// This shebang is not portable.  It only works on Mac\n")),Object(o.b)("h3",{id:"programmatic"},"Programmatic"),Object(o.b)("p",null,"You can require ",Object(o.b)("inlineCode",{parentName:"p"},"ts-node")," and register the loader for future requires by using ",Object(o.b)("inlineCode",{parentName:"p"},"require('ts-node').register({ /* options */ })"),". You can also use file shortcuts - ",Object(o.b)("inlineCode",{parentName:"p"},"node -r ts-node/register")," or ",Object(o.b)("inlineCode",{parentName:"p"},"node -r ts-node/register/transpile-only")," - depending on your preferences."),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Note:")," If you need to use advanced node.js CLI arguments (e.g. ",Object(o.b)("inlineCode",{parentName:"p"},"--inspect"),"), use them with ",Object(o.b)("inlineCode",{parentName:"p"},"node -r ts-node/register")," instead of the ",Object(o.b)("inlineCode",{parentName:"p"},"ts-node")," CLI."),Object(o.b)("h4",{id:"developers"},"Developers"),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"TS Node")," exports a ",Object(o.b)("inlineCode",{parentName:"p"},"create()")," function that can be used to initialize a TypeScript compiler that isn't registered to ",Object(o.b)("inlineCode",{parentName:"p"},"require.extensions"),", and it uses the same code as ",Object(o.b)("inlineCode",{parentName:"p"},"register"),"."),Object(o.b)("h2",{id:"help-my-types-are-missing"},"Help! My Types Are Missing!"),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"TypeScript Node")," does ",Object(o.b)("em",{parentName:"p"},"not")," use ",Object(o.b)("inlineCode",{parentName:"p"},"files"),", ",Object(o.b)("inlineCode",{parentName:"p"},"include")," or ",Object(o.b)("inlineCode",{parentName:"p"},"exclude"),", by default. This is because a large majority projects do not use all of the files in a project directory (e.g. ",Object(o.b)("inlineCode",{parentName:"p"},"Gulpfile.ts"),", runtime vs tests) and parsing every file for types slows startup time. Instead, ",Object(o.b)("inlineCode",{parentName:"p"},"ts-node")," starts with the script file (e.g. ",Object(o.b)("inlineCode",{parentName:"p"},"ts-node index.ts"),") and TypeScript resolves dependencies based on imports and references."),Object(o.b)("p",null,"For global definitions, you can use the ",Object(o.b)("inlineCode",{parentName:"p"},"typeRoots")," compiler option.  This requires that your type definitions be structured as type packages (not loose TypeScript definition files). More details on how this works can be found in the ",Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"https://www.typescriptlang.org/docs/handbook/tsconfig-json.html#types-typeroots-and-types"}),"TypeScript Handbook"),"."),Object(o.b)("p",null,"Example ",Object(o.b)("inlineCode",{parentName:"p"},"tsconfig.json"),":"),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-json"}),'{\n  "compilerOptions": {\n    "typeRoots" : ["./node_modules/@types", "./typings"]\n  }\n}\n')),Object(o.b)("p",null,"Example project structure:"),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-text"}),"<project_root>/\n-- tsconfig.json\n-- typings/\n  -- <module_name>/\n    -- index.d.ts\n")),Object(o.b)("p",null,"Example module declaration file:"),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-typescript"}),"declare module '<module_name>' {\n    // module definitions go here\n}\n")),Object(o.b)("p",null,"For module definitions, you can use ",Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping"}),Object(o.b)("inlineCode",{parentName:"a"},"paths")),":"),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-json"}),'{\n  "compilerOptions": {\n    "baseUrl": ".",\n    "paths": {\n      "custom-module-type": ["types/custom-module-type"]\n    }\n  }\n}\n')),Object(o.b)("p",null,"An alternative approach for definitions of third-party libraries are ",Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"https://www.typescriptlang.org/docs/handbook/triple-slash-directives.html"}),"triple-slash directives"),". This may be helpful if you prefer not to change your TypeScript ",Object(o.b)("inlineCode",{parentName:"p"},"compilerOptions")," or structure your custom type definitions when using ",Object(o.b)("inlineCode",{parentName:"p"},"typeRoots"),". Below is an example of the triple-slash directive as a relative path within your project:"),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-typescript"}),'/// <reference types="./types/untyped_js_lib" />\nimport UntypedJsLib from "untyped_js_lib"\n')),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Tip:")," If you ",Object(o.b)("em",{parentName:"p"},"must")," use ",Object(o.b)("inlineCode",{parentName:"p"},"files"),", ",Object(o.b)("inlineCode",{parentName:"p"},"include"),", or ",Object(o.b)("inlineCode",{parentName:"p"},"exclude"),", enable ",Object(o.b)("inlineCode",{parentName:"p"},"--files")," flags or set ",Object(o.b)("inlineCode",{parentName:"p"},"TS_NODE_FILES=true"),"."),Object(o.b)("h2",{id:"watching-and-restarting"},"Watching and Restarting"),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"TypeScript Node")," compiles source code via ",Object(o.b)("inlineCode",{parentName:"p"},"require()"),", watching files and code reloads are out of scope for the project. If you want to restart the ",Object(o.b)("inlineCode",{parentName:"p"},"ts-node")," process on file change, existing node.js tools such as ",Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/remy/nodemon"}),"nodemon"),", ",Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/Qard/onchange"}),"onchange")," and ",Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/fgnass/node-dev"}),"node-dev")," work."),Object(o.b)("p",null,"There's also ",Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/whitecolor/ts-node-dev"}),Object(o.b)("inlineCode",{parentName:"a"},"ts-node-dev")),", a modified version of ",Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/fgnass/node-dev"}),Object(o.b)("inlineCode",{parentName:"a"},"node-dev"))," using ",Object(o.b)("inlineCode",{parentName:"p"},"ts-node")," for compilation that will restart the process on file change."),Object(o.b)("h2",{id:"license"},"License"),Object(o.b)("p",null,"MIT"))}l.isMDXComponent=!0},86:function(e,t,n){"use strict";n.d(t,"a",(function(){return b})),n.d(t,"b",(function(){return m}));var r=n(0),a=n.n(r);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=a.a.createContext({}),l=function(e){var t=a.a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},b=function(e){var t=l(e.components);return a.a.createElement(p.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},u=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,i=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),b=l(n),u=r,m=b["".concat(i,".").concat(u)]||b[u]||d[u]||o;return n?a.a.createElement(m,s(s({ref:t},p),{},{components:n})):a.a.createElement(m,s({ref:t},p))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=u;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:r,i[1]=s;for(var p=2;p<o;p++)i[p]=n[p];return a.a.createElement.apply(null,i)}return a.a.createElement.apply(null,n)}u.displayName="MDXCreateElement"}}]);