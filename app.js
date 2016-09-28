"use strict";
var heapdump = require("heapdump");
var Cli = require("matrix-appservice-bridge").Cli;
var log = require("./lib/logging").get("CLI");
var main = require("./lib/main");

const REG_PATH = "appservice-registration-irc.yaml";

new Cli({
    registrationPath: REG_PATH,
    enableRegistration: true,
    enableLocalpart: true,
    bridgeConfig: {
        affectsRegistration: true,
        schema: "./lib/config/schema.yml",
        defaults: main.defaultConfig()
    },
    generateRegistration: function(reg, callback) {
        main.generateRegistration(reg, this.getConfig()).done(function(completeRegistration) {
            callback(completeRegistration);
        });
    },
    run: function(port, config, reg) {
        main.runBridge(port, config, reg).catch(function(err) {
            log.error("Failed to run bridge.");
            throw err;
        });
    }
}).run();
