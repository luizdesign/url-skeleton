var modules = require("./../../config");

module.exports = {
    configModules: function(arguments) {
        var module = arguments.mod,
            moduleConfig = [];

        if (!module) {
            moduleConfig = modules;
        } else {
            moduleConfig = this.getModuleByMod(module.toLowerCase());
        }

        return moduleConfig;
    },
    getModuleByMod: function(mod) {
        var module = modules.filter(
            function(value) {
                return new RegExp("^test/test" + mod +".js$").test(value.tests.toLowerCase());
            }
        );

        if (module.length === 0) {
            throw "Cannot find this module: " + mod;
        }

        return module;
    }
};
