module.exports = () => {
    return {
        files: ["src/**/*.ts", "!src/**/*.test.ts"],

        tests: ["src/**/*.test.ts"],

        testFramework: "mocha",

        setup: function() {
            console.log("global wallaby setup: " + process.pid);
            // global.expect = require('chai').expect;
        },

        teardown: function() {
            console.log("global wallaby teardown");
        },

        env: {
            type: "node",
            runner: "node"
        },

        filesWithNoCoverageCalculated: ["src/server.ts"]

        // workers: {
        //     regular: 1,
        //     initial: 1,
        //     recycle: true,
        // }

        // // you may remove the setting if you have a tsconfig.json file where the same is set
        // compilers: {
        //   '**/*.ts': w.compilers.typeScript({module: 'commonjs'})
        // }
    };
};
