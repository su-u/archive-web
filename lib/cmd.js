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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.launch = void 0;
const async = __importStar(require("async"));
const tmp = __importStar(require("tmp"));
const fs = __importStar(require("fs-extra"));
const path = __importStar(require("path"));
const events_1 = require("events");
const ewait_1 = require("ewait");
// @ts-ignore
const website_scraper_1 = __importDefault(require("website-scraper"));
// @ts-ignore
const moment_1 = __importDefault(require("moment"));
const launch = function (args) {
    var tmpDirPath = null;
    var parentPath = null;
    var emitter = new events_1.EventEmitter();
    async.waterfall([
        function (next) {
            var all = new ewait_1.WaitForAll({
                timeout: 2147483647,
                event: "done"
            });
            all.add([emitter]);
            all.wait();
            next();
        },
        function (next) {
            tmp.dir({
                keep: true
            }, function _tempDirCreated(_err, _path) {
                if (_err) {
                    next(_err);
                    return;
                }
                if (args["--verbose"]) {
                    console.log("Temp Dir: ", _path);
                }
                tmpDirPath = _path;
                next();
            });
        },
        function (next) {
            async.map(args.URL, (_item, _next) => {
                var plugins = [];
                if (args["--use-puppeteer"]) {
                    var PuppeteerPlugin = require("website-scraper-puppeteer");
                    plugins.push(new PuppeteerPlugin());
                }
                if (args["--use-phantom"]) {
                    var PhantomPlugin = require("website-scraper-phantom");
                    plugins.push(new PhantomPlugin());
                }
                const options = {
                    urls: _item,
                    directory: path.join(tmpDirPath, encodeURIComponent(_item)),
                    recursive: false,
                    maxDepth: 0,
                    plugins: plugins
                };
                (0, website_scraper_1.default)(options, _next);
            }, next);
        },
        function (res, next) {
            parentPath = path.join(args["--output-dir"] || process.cwd(), args["--no-timestamp"]
                ? ""
                : args["--utc"]
                    ? (0, moment_1.default)()
                        .utc()
                        .format(args["--timestamp-format"])
                    : (0, moment_1.default)()
                        .local()
                        .format(args["--timestamp-format"]));
            fs.copy(tmpDirPath, parentPath, { overwrite: true }, _err => {
                if (_err) {
                    next(_err);
                    return;
                }
                next();
            });
        }
    ], function (err, res) {
        if (err) {
            process.stderr.write("Encountered error: " + err);
            emitter.emit("done");
            process.exit(1);
        }
        console.log("Done! Output to " + path.resolve(parentPath));
        emitter.emit("done");
    });
};
exports.launch = launch;
