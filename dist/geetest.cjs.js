'use strict';

function _interopDefault(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex;
}

var React = _interopDefault(require('react'));

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

var Geetest =
  /*#__PURE__*/
  (function(_React$Component) {
    _inherits(Geetest, _React$Component);

    function Geetest(props) {
      var _this;

      _classCallCheck(this, Geetest);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Geetest).call(this, props));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), 'init', function() {
        var that = _assertThisInitialized(_assertThisInitialized(_this)); // console.log('_init');

        var id = 'react-geetest';

        if (window.initGeetest) {
          that.ready();
          return;
        }

        if (document.getElementById(id)) {
          that.wait();
          return;
        }

        var ds = document.createElement('script');
        ds.id = id;
        ds.type = 'text/javascript';
        ds.async = true;
        ds.charset = 'utf-8';

        if (ds.readyState) {
          ds.onreadystatechange = function() {
            if (ds.readyState === 'loaded' || ds.readyState === 'complete') {
              ds.onreadystatechange = null;
              that.ready();
            }
          };
        } else {
          ds.onload = function() {
            ds.onload = null;
            that.ready();
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

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), 'wait', function() {
        var that = _assertThisInitialized(_assertThisInitialized(_this));

        var _that$state = that.state,
          timer = _that$state.timer,
          count = _that$state.count;

        if (timer || count > 0) {
          return;
        }

        var newTimer = window.setInterval(function() {
          if (window.initGeetest) {
            window.clearInterval(newTimer);
            that.setState({
              timer: null,
              count: 0,
            });
            window.setTimeout(that.ready.bind(that));
            return;
          }

          var c = that.state.count;
          c -= 1;

          if (c < 1) {
            window.clearInterval(newTimer);
            that.setState({
              timer: null,
              count: 0,
            });
          } else {
            that.setState({
              count: c,
            });
          }
        }, 100);
        that.setState({
          timer: newTimer,
          count: 10,
        });
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), 'ready', function() {
        var that = _assertThisInitialized(_assertThisInitialized(_this)); // console.log('_ready');

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
        var ins = that.state.ins;

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
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), 'load', function(ins) {
        var that = _assertThisInitialized(_assertThisInitialized(_this)); // console.log('_load');

        if (!that.dom) {
          return;
        }

        var _that$props2 = that.props,
          onReady = _that$props2.onReady,
          onSuccess = _that$props2.onSuccess,
          onError = _that$props2.onError,
          onClose = _that$props2.onClose;
        ins.appendTo(that.dom);
        ins.onReady(onReady);
        ins.onSuccess(function() {
          return onSuccess(ins.getValidate(), ins);
        });
        ins.onError(onError);
        ins.onClose(onClose);
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), 'destroy', function() {
        var that = _assertThisInitialized(_assertThisInitialized(_this));

        var timer = that.state.timer;

        if (timer) {
          window.clearInterval(timer);
        } // that.state.script.parentNode.removeChild(that.state.script);
        // that.setState({
        //   ins: null,
        //   script: null,
        // });
      });

      _this.dom = null;
      _this.state = {
        ins: null,
        script: null,
        timer: null,
        count: 0,
      };
      return _this;
    } // componentWillMount() {
    //   const that = this;
    //   console.log('componentWillMount', that.props, that.state);
    // }

    _createClass(Geetest, [
      {
        key: 'componentDidMount',
        value: function componentDidMount() {
          var that = this; // console.log('componentDidMount', that.props, that.state);

          that.init();
        }, // componentWillReceiveProps(nextProps) {
        //   const that = this;
        //   console.log('componentWillReceiveProps', that.props, nextProps);
        // }
        // shouldComponentUpdate(nextProps, nextState) {
        //   const that = this;
        //   // console.log('shouldComponentUpdate', that.props, nextProps, that.state, nextState);
        //   return nextProps.challenge !== that.props.challenge;
        // }
        // componentWillUpdate(nextProps, nextState) {
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

    return Geetest;
  })(React.Component);

_defineProperty(Geetest, 'defaultProps', {
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

module.exports = Geetest;
