/* global exports, it, describe */

// module Test.Spec.Mocha

export const itAsync = function (only) {
    "use strict";
    return function (name) {
        return function (run) {
            return function () {
                var f = only ? it.only : it;
                f(name, function (done) {
                    return run(function () {
                        done();
                        return function () {};
                    })(function (err) {
                        done(err);
                        return function () {};
                    })();
                });
            };
        };
    };
};

export const itPending = function (name) {
    "use strict";
    return function () {
        it(name);
    };
};

export const describe = function (only) {
    "use strict";
    return function (name) {
        return function (nested) {
            return function () {
                var f = only ? describe.only : describe;
                f(name, function () {
                    nested();
                });
            };
        };
    };
};
