'use strict';

// https://developer.chrome.com/extensions/omnibox

var omnibox = {
  setDefaultSuggestion: jest.fn(),
  onInputStarted: {
    addListener: jest.fn()
  },
  onInputChanged: {
    addListener: jest.fn()
  },
  onInputEntered: {
    addListener: jest.fn()
  },
  onInputCancelled: {
    addListener: jest.fn()
  }
};

// https://developer.chrome.com/extensions/tabs

var tabs = {
  get: jest.fn(function () {
    var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
    return cb({});
  }),
  getCurrent: jest.fn(function (cb) {
    return cb({});
  }),
  connect: jest.fn(function () {
    var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var info = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    // returns a Port
    return {
      name: info.name,
      disconnect: jest.fn(),
      onDisconnect: {
        addListener: jest.fn()
      },
      onMessage: {
        addListener: jest.fn()
      },
      postMessage: jest.fn()
    };
  }),
  create: jest.fn(function () {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
    return cb(props);
  }),
  duplicate: jest.fn(function () {
    var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
    return cb(Object.assign({}, { id: id }));
  }),
  query: jest.fn(function () {
    var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
    return cb([{}]);
  }),
  highlight: jest.fn(function () {
    var info = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
    return cb();
  }),
  update: jest.fn(function () {
    var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var cb = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
    return cb(Object.assign({}, props, { id: id }));
  }),
  move: jest.fn(function () {
    var ids = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var cb = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
    return cb(ids.map(function (id) {
      return Object.assign({}, props, { id: id });
    }));
  })
};

var runtime = {
  connect: jest.fn(function (_ref) {
    var name = _ref.name;

    var connection = {
      name: name,
      postMessage: jest.fn(),
      onDisconnect: {
        addListener: jest.fn()
      }
    };
    return connection;
  }),
  sendMessage: jest.fn(function (message, cb) {
    if (cb !== undefined) {
      return cb();
    }
    return Promise.resolve();
  }),
  onMessage: {
    addListener: jest.fn()
  },
  onConnect: {
    addListener: jest.fn()
  }
};

var storage = {
  sync: {
    get: jest.fn(function (id, cb) {
      if (cb !== undefined) {
        return cb({ id: id });
      }
      return Promise.resolve({ id: id });
    }),
    getBytesInUse: jest.fn(function (id, cb) {
      if (cb !== undefined) {
        return cb({ id: id });
      }
      return Promise.resolve({ id: id });
    }),
    set: jest.fn(function (id, cb) {
      if (cb !== undefined) {
        return cb({ id: id });
      }
      return Promise.resolve({ id: id });
    }),
    remove: jest.fn(function (id, cb) {
      if (cb !== undefined) {
        return cb({ id: id });
      }
      return Promise.resolve({ id: id });
    }),
    clear: jest.fn(function (cb) {
      if (cb !== undefined) {
        return cb();
      }
      return Promise.resolve();
    })
  },
  local: {
    get: jest.fn(function (id, cb) {
      if (cb !== undefined) {
        return cb({ id: id });
      }
      return Promise.resolve({ id: id });
    }),
    getBytesInUse: jest.fn(function (id, cb) {
      if (cb !== undefined) {
        return cb({ id: id });
      }
      return Promise.resolve({ id: id });
    }),
    set: jest.fn(function (id, cb) {
      if (cb !== undefined) {
        return cb({ id: id });
      }
      return Promise.resolve({ id: id });
    }),
    remove: jest.fn(function (id, cb) {
      if (cb !== undefined) {
        return cb({ id: id });
      }
      return Promise.resolve({ id: id });
    }),
    clear: jest.fn(function (cb) {
      if (cb !== undefined) {
        return cb();
      }
      return Promise.resolve();
    })
  },
  managed: {
    get: jest.fn(function (id, cb) {
      if (cb !== undefined) {
        return cb({ id: id });
      }
      return Promise.resolve({ id: id });
    }),
    getBytesInUse: jest.fn(function (id, cb) {
      if (cb !== undefined) {
        return cb({ id: id });
      }
      return Promise.resolve({ id: id });
    }),
    set: jest.fn(function (id, cb) {
      if (cb !== undefined) {
        return cb({ id: id });
      }
      return Promise.resolve({ id: id });
    }),
    remove: jest.fn(function (id, cb) {
      if (cb !== undefined) {
        return cb({ id: id });
      }
      return Promise.resolve({ id: id });
    }),
    clear: jest.fn(function (cb) {
      if (cb !== undefined) {
        return cb();
      }
      return Promise.resolve();
    })
  },
  onChanged: {
    addListener: jest.fn()
  }
};

var getDetails = function getDetails(details, cb) {
  if (cb !== undefined) {
    return cb();
  }
  return Promise.resolve();
};
var browserAction = {
  setTitle: jest.fn(),
  getTitle: jest.fn(getDetails),
  setIcon: jest.fn(getDetails),
  setPopup: jest.fn(),
  getPopup: jest.fn(getDetails),
  setBadgeText: jest.fn(),
  getBadgeText: jest.fn(getDetails),
  setBadgeBackgroundColor: jest.fn(),
  getBadgeBackgroundColor: jest.fn(getDetails),
  enable: jest.fn(),
  disable: jest.fn(),
  onClicked: {
    addListener: jest.fn()
  }
};

// https://developer.chrome.com/extensions/commands

var commands = {
  getAll: jest.fn(function (cb) {
    if (cb !== undefined) {
      return cb();
    }
    return Promise.resolve();
  }),
  onCommand: {
    addListener: jest.fn()
  }
};

var geckoProfiler = {
  stop: jest.fn(function () {
    return Promise.resolve();
  }),
  start: jest.fn(function () {
    return Promise.resolve();
  }),
  pause: jest.fn(function () {
    return Promise.resolve();
  }),
  resume: jest.fn(function () {
    return Promise.resolve();
  }),
  getProfile: jest.fn(function () {
    return Promise.resolve();
  }),
  getProfileAsArrayBuffer: jest.fn(function () {
    return Promise.resolve();
  }),
  getSymbols: jest.fn(function (debugName, breakpadId) {
    return Promise.resolve();
  }),
  onRunning: {
    addListener: jest.fn()
  }
};

var chrome = {
  omnibox: omnibox,
  tabs: tabs,
  runtime: runtime,
  storage: storage,
  browserAction: browserAction,
  commands: commands,
  geckoProfiler: geckoProfiler
};

 // Firefox uses 'browser' but aliases it to chrome

/**
 * This is a setup file we specify as our 'main' entry point
 * from the package.json file.  This allows developers to
 * directly call the module in their `setupFiles` property.
 */
global.chrome = chrome;
global.browser = chrome;

// Firefox specific globals
// if (navigator.userAgent.indexOf('Firefox') !== -1) {
// https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Content_scripts#exportFunction
global.exportFunction = jest.fn(function (func) {
  return func;
});
// https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Content_scripts#cloneInto
global.cloneInto = jest.fn(function (obj) {
  return obj;
});
// }
