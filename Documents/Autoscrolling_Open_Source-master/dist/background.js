/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return onError; });



const onError = (err) => {
  console.error(`Error: ${err}`);
};




/***/ }),

/***/ 5:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);





//////////////////////////////////////////////////////////////////////////////
// Constant / Variables

let autoScrollingStates = [];
const initAutoScrollingState = {
  tabId: -1,
  windowId: -1,
  isScrolling: false,
  isWaitingDoubleClick: false,
  isOpenOverlay: false
};

browser.windows.getAll().then((windowArray) => {
  windowArray.map((window) => {
    const windowId = window.id;
    createAutoScrollingState(windowId);
  });
}).catch(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* onError */]);

// Unit of both of 'intervalDoubleClick' and 'defaultIntervalDoubleClick' is
// second. defaultIntervalDoubleClick is 1.00 second.
const defaultIntervalDoubleClick = Number(0.50);
const backgroundOptions = {
  intervalDoubleClick: defaultIntervalDoubleClick
};
browser.storage.sync.get({
  intervalDoubleClick: defaultIntervalDoubleClick
}).then((data) => {
  const { intervalDoubleClick } = data;
  backgroundOptions.intervalDoubleClick = intervalDoubleClick;
}).catch(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* onError */]);


//////////////////////////////////////////////////////////////////////////////
// AutoScrolling functions
function createAutoScrollingState (windowId) {
  // Constructor. This function is called when new window is opened.
  if (autoScrollingStates[ windowId ] != undefined) {
    return;
  }
  autoScrollingStates[ windowId ] = Object.assign(
    {}, initAutoScrollingState, { windowId: windowId });
}

function removeAutoScrollingState (window) {
  // Deconstructor. This function is called when a window is exited.
  const windowId = window.id;
  autoScrollingStates[ windowId ] = undefined;
}

function toggleAutoScrolling (tab) {
  // Toggling the auto scrolling state. This function is called when browser
  // icon is clicked with single click. If double click is detected, this
  // function is not called.
  const tabId = tab.id;
  const windowId = tab.windowId;
  const willIsScrolling = ! autoScrollingStates[ windowId ].isScrolling;
  browser.tabs.sendMessage(tabId, {
    isScrolling: willIsScrolling
  }).then((response) => {
    autoScrollingStates[ windowId ].tabId = tabId;
    autoScrollingStates[ windowId ].isScrolling = willIsScrolling;
  }).catch(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* onError */]);
}

function receiveAutoScrollingStatus (msg, sender, sendResponse) {
  const windowId = sender.tab.windowId;
  autoScrollingStates[ windowId ].isScrolling = msg.isScrolling;
}

function stopAutoScrolling (activeInfo) {
  const tabId = activeInfo.tabId;
  const windowId = activeInfo.windowId;
  browser.tabs.sendMessage(tabId, {
    isScrolling: false
  }).then((response) => {
    autoScrollingStates[ windowId ].isScrolling = false;
  }).catch(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* onError */]);
}

//////////////////////////////////////////////////////////////////////////////
// Overlay functions

// function disableBrowserActionPopup (msg, sender, sendResponse) {
//   const tabId = sender.tab.id;
//   const windowId = sender.tab.windowId;
//   browser.browserAction.setPopup({
//     tabId: tabId,
//     popup: ''
//   }).then((results) => {
//     autoScrollingStates[ windowId ].isOpenPopup = false;
//   }) .catch(onError);
// }

function resetIsWaitingDoubleClick (windowId) {
  autoScrollingStates[ windowId ].isWaitingDoubleClick = false;
}


//////////////////////////////////////////////////////////////////////////////
// Event listeners / event functions

browser.windows.onCreated.addListener((window) => {
  const windowId = window.id;
  createAutoScrollingState(windowId);
});

browser.windows.onRemoved.addListener((window) => {
  removeAutoScrollingState(window);
});

browser.browserAction.onClicked.addListener((tab) => {
  // This function is fired when browser icon is clicked.
  const windowId = tab.windowId;
  if (autoScrollingStates[ windowId ].isWaitingDoubleClick) {
    browser.tabs.sendMessage(tab.id, {
      isOpenOverlay: true
    }).then((response) => {
      autoScrollingStates[ windowId ].isOpenOverlay = true;
    });
  }
  setTimeout(() => {
    resetIsWaitingDoubleClick(tab.windowId);
    if (!autoScrollingStates[ windowId ].isOpenOverlay) {
      toggleAutoScrolling(tab);
    }
  }, backgroundOptions.intervalDoubleClick * 1000 );
  autoScrollingStates[ windowId ].isWaitingDoubleClick = true;
});

browser.tabs.onActivated.addListener((activeInfo) => {
  const windowId = activeInfo.windowId;
  const tabId = activeInfo.tabId;
  if (autoScrollingStates[ windowId ] == undefined) {
    createAutoScrollingState(windowId);
  }
  if (autoScrollingStates[ windowId ].isScrolling &&
      autoScrollingStates[ windowId ].tabId != tabId ) {
    stopAutoScrolling(activeInfo);
  }
});

browser.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  // This event is fired when content scripts sent message.
  if (msg.isScrolling != undefined) {
    receiveAutoScrollingStatus(msg, sender, sendResponse);
  }
  if (msg.isOpenOverlay == false) {
    autoScrollingStates[ sender.tab.windowId ].isOpenOverlay = false;
  }
});



/***/ })

/******/ });