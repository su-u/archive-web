#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var doc = "\n\
Download webpages to a local folder for archiving purpose\n\
\n\
Usage: archive-web [--output-dir <dir>]\n\
               [--use-puppeteer | --use-phantom]\n\
               [--no-timestamp]\n\ [--timestamp-format <tf>]\n\
               [--utc]\n\
               [-v --verbose]\n\
               [--debug]\n\
               URL...\n\
\n\
       archive-web --version\n\
\n\
Download one or more URL to a folder named by current local timestamp with default format YYYYMMDDHHmmss.\n\
Can disable timestamp-based folder.\n\
Can change timestamp format.\n\
\n\
Arguments:\n\
  URL        You can specify one or more URL for processing.\n\
\n\
General Options:\n\
  -h, --help                        Show this help message and exit\n\
  --version                         Print version information\n\
  -v, --verbose                     Show verbose information\n\
  --debug......                     Show debug information [default: false].\n\
\n\
Output Options:\n\
  -o, --output-dir <dir>            Name of the parent folder. Default to current folder\n\
  --use-puppeteer                   Use headless browser Chromium\n\
  --use-phantom                     Use headless browser Phantom\n\
  --no-timestamp                    Disable the timestamp folder\n\
  -t, --timestamp-format <tf>       Specify timestamp format supported by `moment` [default: YYYYMMDDHHmmss].\n\
  --utc                             Use UTC time. [default: false].\n\
\n\
Examples:\n\
\n\
  archive-web --no-timestamp <url>\n\
        Download url(s) to current folder without timestamp\n\
\n\
  archive-web -o another_folder <url>\n\
        Download url(s) to another folder instead of the current folder\n\
\n\
  dl-page --utc --timestamp-format YYYYMMDDHHmmssSSS <url>\n\
        Use UTC time. Timestamp extended to milliseconds, so e.g.: 20191021153025478\n\
\n ";
const docopt = __importStar(require("docopt"));
const cmd_1 = require("./cmd");
var kwargs = {
    name: "archive-web",
    version: "archive-web 0.1.0"
};
function main(args) {
    (0, cmd_1.launch)(args);
}
function error(err) {
    process.stderr.write(err);
}
if (require.main === module) {
    var args = docopt.docopt(doc, kwargs);
    if (args["--debug"]) {
        console.log(JSON.stringify(args));
    }
    main(args);
}
