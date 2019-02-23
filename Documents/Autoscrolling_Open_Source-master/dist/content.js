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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return onError; });
  
  
  
const onError = (err) => {
  console.error(`Error: ${err}`);
};
  
  
  
  
/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {
  
"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__index_css__);
  
  
  
  
var currentspeed = 0;
var count = 0;
  
const autoScrolling = {
    tid: -1,
    x: 0,
    y: 0,
    scrollingStep: 1,
    scrollingSpeed: 50,
    scrollingElement: document.documentElement,
    stopScrollingByClick: true,
    start: function() {
        this.y = this.y + this.scrollingStep;
        this.scrollingElement.scroll(this.x, this.y);
        this.tid = setTimeout(() => {
            this.start();
        }, 100 - this.scrollingSpeed);
    },
    stop: function() {
        clearTimeout(this.tid);
        this.tid = -1;
    },
};

const getScrollingElement = () => {
    return document.scrollingElement ?
        document.scrollingElement : document.documentElement;
};

const defaultStopScrollingByClick = true;
browser.storage.sync.get({
    stopScrollingByClick: defaultStopScrollingByClick
}).then((data) => {
    const {
        stopScrollingByClick
    } = data;
    autoScrolling.stopScrollingByClick = stopScrollingByClick;
}).catch(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* onError */ ]);

const defaultScrollingSpeed = 50;
browser.storage.sync.get({
    scrollingSpeed: defaultScrollingSpeed
}).then((data) => {
    const {
        scrollingSpeed
    } = data;
    autoScrolling.scrollingSpeed = scrollingSpeed;
}).catch(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* onError */ ]);


browser.runtime.onMessage.addListener((msg) => {
	console.log(count, msg.isScrolling);
    if (count == 1 || !msg.isScrolling && autoScrolling.tid !== -1) {
        autoScrolling.stop();
		count -= 1;
    } else if (msg.isScrolling) {
        new Promise((resolve, reject) => {
            autoScrolling.x = window.scrollX;
            autoScrolling.y = window.scrollY;
            autoScrolling.scrollingElement = getScrollingElement();
            return resolve();
        }).then(() => {
            autoScrolling.start();
			count += 1;
        });
    }

    if (msg.isOpenOverlay) {
        openOverlay();
    }
});

browser.storage.onChanged.addListener((changes) => {
    var changedItems = Object.keys(changes);
    for (var item of changedItems) {
        if (item == 'scrollingSpeed') {
            autoScrolling.scrollingSpeed = parseInt(changes[item]['newValue']);
        }
        if (item == 'stopScrollingByClick') {
            autoScrolling.stopScrollingByClick = changes[item]['newValue'];
        }
    }
});

// mouse click to stop autoscrolling
document.body.addEventListener('click', () => {
    if (autoScrolling.tid !== -1 &&
        autoScrolling.stopScrollingByClick == true) {
        browser.runtime.sendMessage({
            isScrolling: false
        }).then(() => {
            autoScrolling.stop();
			count -= 1;
        }).catch(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* onError */ ]);
    }
});

// added spacebar to autoscroll or stop
document.body.addEventListener('keydown', (e) => {
    if (e.keyCode == 32 && e.target == document.body) {
        e.preventDefault();
        if (autoScrolling.tid !== -1 &&
            autoScrolling.stopScrollingByClick == true) {
            browser.runtime.sendMessage({
                isScrolling: false
            }).then(() => {
                autoScrolling.stop();
				count -= 1;
            }).catch(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* onError */ ]);
        } else {
            new Promise((resolve, reject) => {
                autoScrolling.x = window.scrollX;
                autoScrolling.y = window.scrollY;
                autoScrolling.scrollingElement = getScrollingElement();
                return resolve();
            }).then(() => {
				browser.runtime.sendMessage({
					isScrolling: true
				})
                autoScrolling.start();
				count += 1;
            });
        }
    }
});

// addcodehere 
window.addEventListener("keydown", keysPressed, false);
window.addEventListener("keyup", keysReleased, false);
var keys = [];

function keysPressed(e) {
    // store an entry for every key pressed
    keys[e.keyCode] = true;

    // Shift+ up key
    if (keys[16] && keys[38]) {
  	    e.preventDefault();
	    currentspeed = autoScrolling.scrollingStep;
	    currentspeed = parseInt(currentspeed, 10);
	    currentspeed += 1;
	  
	    if (currentspeed > 5)
		    currentspeed = 5;
	  
        autoScrolling.scrollingStep = currentspeed;
		//console.log(autoScrolling.scrollingStep);
    }
	  
	//Shift+ down key  
    if (keys[16] && keys[40]) {
	    e.preventDefault();
	    currentspeed = autoScrolling.scrollingStep;
	    currentspeed = parseInt(currentspeed, 10);
	    currentspeed -= 1;
	  
	    if (currentspeed < 1)
		    currentspeed = 1;
	  
        autoScrolling.scrollingStep = currentspeed;
		//console.log(autoScrolling.scrollingStep);
    }
}
    
  function keysReleased(e) {
    // mark keys that were released
    keys[e.keyCode] = false;
}


const openOverlay = () => {
    let overlayEle = document.getElementById('auto-scrolling-overlay');
    overlayEle.classList = ['auto-scrolling-overlay is-open'];
};

const closeOverlay = () => {
    let overlayEle = document.getElementById('auto-scrolling-overlay');
    overlayEle.classList = ['auto-scrolling-overlay'];
};

const insertOverlayEle = () => {
    let overlayEle = document.createElement('div');
    overlayEle.id = 'auto-scrolling-overlay';
    overlayEle.classList = ['auto-scrolling-overlay'];
    overlayEle.innerHTML = __webpack_require__(4);
    overlayEle.addEventListener('click', (ev) => {
        browser.runtime.sendMessage({
            isOpenOverlay: false
        }).then((response) => {
            closeOverlay();
        });
    });
    document.body.appendChild(overlayEle);

    let overlayWrapperEle =
        document.getElementById('auto-scrolling-overlay-wrapper');
    overlayWrapperEle.addEventListener('click', (ev) => {
        ev.stopPropagation();
    });
};

insertOverlayEle();

const setupOverlayWindow = () => {
    const scrollingSpeedEl = document.getElementById(
        'auto-scrolling-overlay-scrolling-speed');
    const stopScrollingByClickEl = document.getElementById(
        'auto-scrolling-overlay-stop-scrolling-by-click');

    scrollingSpeedEl.addEventListener('change',
        setScrollingSpeed);
    stopScrollingByClickEl.addEventListener('change',
        setStopScrollingByClick);

    browser.storage.sync.get({
        scrollingSpeed: 50,
        stopScrollingByClick: true
    }).then((options) => {
        scrollingSpeedEl.value = parseInt(options.scrollingSpeed);
        stopScrollingByClickEl.checked = options.stopScrollingByClick;
    });
};

const setScrollingSpeed = (ev) => {
    let scrollingSpeed = ev.target.value;
    if (scrollingSpeed > 100) {
        scrollingSpeed = 99;
    } else if (scrollingSpeed < 0) {
        scrollingSpeed = 1;
    }
    browser.storage.sync.set({
        scrollingSpeed: scrollingSpeed
    });
};

const setStopScrollingByClick = (ev) => {
    let stopScrollingByClick = ev.target.checked;
    browser.storage.sync.set({
        stopScrollingByClick: stopScrollingByClick
    });
};

setupOverlayWindow();
  
  
/***/ }),
/* 3 */
/***/ (function(module, exports) {
  
// removed by extract-text-webpack-plugin
  
/***/ }),
/* 4 */
/***/ (function(module, exports) {
  
module.exports = "<div id=\"auto-scrolling-overlay-wrapper\" class=\"wrapper\">\n  <div>\n    <h2>Scrolling speed</h2>\n    <p>The value is scrolling speed. Max is 99, and min is 1.</p>\n    <p><strong>Scrolling speed:</strong>\n      <input type=\"text\" name=\"scrolling-speed\" value=50\n        id=\"auto-scrolling-overlay-scrolling-speed\" />\n    </p>\n  </div>\n  <div>\n    <h2>To stop scrolling by click</h2>\n    <p>The value decides the weather stoppling the scrolling when you click the scrolling window.</p>\n    <p><strong>Scrolling stop by click:</strong>\n      <input type=\"checkbox\" name='stop-scrolling-by-click' value=true\n       id='auto-scrolling-overlay-stop-scrolling-by-click' checked=true />\n    </p>\n  </div>\n</div>\n";
  
/***/ })
/******/ ]);