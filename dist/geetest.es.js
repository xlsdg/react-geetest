import React from 'react';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ('value' in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function');
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true,
    },
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === 'object' || typeof call === 'function')) {
    return call;
  }

  return _assertThisInitialized(self);
}

var SCRIPT_ID = 'react-geetest';

var typeOf = function typeOf(type) {
  return function(object) {
    return Object.prototype.toString.call(object) === '[object '.concat(type, ']');
  };
}; // const isString = typeOf('String');
// const isObject = typeOf('Object');

var isFunction = typeOf('Function');

var NECaptcha =
  /*#__PURE__*/
  (function(_React$Component) {
    _inherits(NECaptcha, _React$Component);

    function NECaptcha(props) {
      var _this;

      _classCallCheck(this, NECaptcha);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(NECaptcha).call(this, props));

      _defineProperty(_assertThisInitialized(_this), 'init', function() {
        var that = _assertThisInitialized(_this); // console.log('init');

        var elem = that.state.elem;

        if (window.initGeetest) {
          that.ready();
          return;
        }

        var script = document.getElementById(SCRIPT_ID);

        if (script) {
          if (elem) {
            return;
          }

          script.addEventListener('Im-ready', that.ready.bind(that), false);
          that.setState({
            elem: script,
          });
          return;
        }

        var ds = document.createElement('script');
        ds.id = SCRIPT_ID;
        ds.type = 'text/javascript';
        ds.async = true;
        ds.charset = 'utf-8';

        if (ds.readyState) {
          ds.onreadystatechange = function() {
            if (ds.readyState === 'loaded' || ds.readyState === 'complete') {
              ds.onreadystatechange = null;
              that.ready();
              that.triggerEvent('Im-ready');
            }
          };
        } else {
          ds.onload = function() {
            ds.onload = null;
            that.ready();
            that.triggerEvent('Im-ready');
          };
        }

        var protocol = window.location.protocol === 'http:' ? 'http:' : 'https:';
        ds.src = ''.concat(protocol, '//static.geetest.com/static/tools/gt.js?_t=').concat(new Date().getTime());
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(ds, s);
        that.setState({
          script: ds,
        });
      });

      _defineProperty(_assertThisInitialized(_this), 'ready', function(event) {
        var that = _assertThisInitialized(_this); // console.log('_ready');

        var _that$props = that.props,
          gt = _that$props.gt,
          challenge = _that$props.challenge,
          offline = _that$props.offline,
          newCaptcha = _that$props.newCaptcha,
          product = _that$props.product,
          width = _that$props.width,
          lang = _that$props.lang,
          https = _that$props.https,
          timeout = _that$props.timeout,
          area = _that$props.area,
          nextWidth = _that$props.nextWidth,
          bgColor = _that$props.bgColor;
        var _that$state = that.state,
          ins = _that$state.ins,
          elem = _that$state.elem;

        if (!window.initGeetest) {
          return;
        }

        if (ins) {
          that.load(ins);
          return;
        }

        window.initGeetest(
          {
            gt: gt,
            challenge: challenge,
            offline: offline,
            new_captcha: newCaptcha,
            product: product,
            width: width,
            lang: lang,
            https: https,
            timeout: timeout,
            area: area,
            next_width: nextWidth,
            bg_color: bgColor,
          },
          function(geetest) {
            that.load(geetest);
            that.setState({
              ins: geetest,
            });
          }
        );

        if (elem) {
          elem.removeEventListener('Im-ready', that.ready.bind(that), false);
        }
      });

      _defineProperty(_assertThisInitialized(_this), 'load', function(ins) {
        var that = _assertThisInitialized(_this); // console.log('load');

        if (!that.dom) {
          return;
        }

        var _that$props2 = that.props,
          onReady = _that$props2.onReady,
          onSuccess = _that$props2.onSuccess,
          onError = _that$props2.onError,
          onClose = _that$props2.onClose;
        ins.appendTo(that.dom);

        if (isFunction(ins.onReady)) {
          ins.onReady(onReady);
        }

        ins.onSuccess(function() {
          return onSuccess(ins.getValidate(), ins);
        });

        if (isFunction(ins.onError)) {
          ins.onError(onError);
        }

        if (isFunction(ins.onClose)) {
          ins.onClose(onClose);
        }
      });

      _defineProperty(_assertThisInitialized(_this), 'destroy', function() {
        var that = _assertThisInitialized(_this); // console.log('destroy');

        var elem = that.state.elem;

        if (elem) {
          elem.removeEventListener('Im-ready', that.ready.bind(that), false);
        } // script.parentNode.removeChild(that.state.script);
        // that.setState({
        //   ins: null,
        //   script: null,
        //   elem: null,
        // });
      });

      _defineProperty(_assertThisInitialized(_this), 'triggerEvent', function(name) {
        var that = _assertThisInitialized(_this); // console.log('triggerEvent');

        var _that$state2 = that.state,
          elem = _that$state2.elem,
          script = _that$state2.script;

        if (!elem && !script) {
          return;
        }

        var e = document.createEvent('Event');
        e.initEvent(name, true, true);
        var dom = elem || script;
        dom.dispatchEvent(e);
      });

      _this.dom = null;
      _this.state = {
        ins: null,
        script: null,
        elem: null,
      };
      return _this;
    } // componentWillMount() {
    //   const that = this;
    //   console.log('componentWillMount', that.props, that.state);
    // }

    _createClass(NECaptcha, [
      {
        key: 'componentDidMount',
        value: function componentDidMount() {
          var that = this; // console.log('componentDidMount', that.props, that.state);

          that.init();
        }, // componentWillReceiveProps(nextProps) {
        //   const that = this;
        //   console.log('componentWillReceiveProps', that.props, nextProps);
        // }
      },
      {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
          var that = this; // console.log('shouldComponentUpdate', that.props, nextProps, that.state, nextState);

          var _that$props3 = that.props,
            className = _that$props3.className,
            gt = _that$props3.gt,
            challenge = _that$props3.challenge,
            offline = _that$props3.offline,
            newCaptcha = _that$props3.newCaptcha,
            product = _that$props3.product,
            width = _that$props3.width,
            lang = _that$props3.lang,
            https = _that$props3.https,
            timeout = _that$props3.timeout,
            area = _that$props3.area,
            nextWidth = _that$props3.nextWidth,
            bgColor = _that$props3.bgColor;
          var isUpdate =
            className !== nextProps.className ||
            gt !== nextProps.gt ||
            challenge !== nextProps.challenge ||
            offline !== nextProps.offline ||
            newCaptcha !== nextProps.newCaptcha ||
            product !== nextProps.product ||
            width !== nextProps.width ||
            lang !== nextProps.lang ||
            https !== nextProps.https ||
            timeout !== nextProps.timeout ||
            area !== nextProps.area ||
            nextWidth !== nextProps.nextWidth ||
            bgColor !== nextProps.bgColor;
          return isUpdate;
        }, // componentWillUpdate(nextProps, nextState) {
        //   const that = this;
        //   console.log('componentWillUpdate', that.props, nextProps, that.state, nextState);
        // }
      },
      {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
          var that = this; // console.log('componentDidUpdate', prevProps, that.props, prevState, that.state);

          that.init();
        },
      },
      {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          var that = this; // console.log('componentWillUnmount', that.props, that.state);

          that.destroy();
        },
      },
      {
        key: 'render',
        value: function render() {
          var that = this; // console.log('render');

          var className = that.props.className;
          return React.createElement('div', {
            className: className,
            ref: function ref(e) {
              that.dom = e;
            },
          });
        },
      },
    ]);

    return NECaptcha;
  })(React.Component);

_defineProperty(NECaptcha, 'defaultProps', {
  className: 'i-geetest',
  // gt: '',
  // challenge: '',
  offline: false,
  newCaptcha: true,
  product: 'popup',
  width: '300px',
  lang: 'zh-cn',
  https: false,
  timeout: 30000,
  // area: '',
  nextWidth: '90%',
  bgColor: 'black',
  onReady: function onReady() {},
  onSuccess: function onSuccess() {},
  onError: function onError() {},
  onClose: function onClose() {},
});

export default NECaptcha;
