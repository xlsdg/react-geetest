(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? (module.exports = factory(require('react')))
    : typeof define === 'function' && define.amd
    ? define(['react'], factory)
    : (global.Geetest = factory(global.React));
})(this, function(React) {
  'use strict';

  React = React && React.hasOwnProperty('default') ? React['default'] : React;

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

      // static propTypes = {
      //   gt: PropTypes.string.isRequired,
      //   challenge: PropTypes.string.isRequired,
      //   success: PropTypes.number.isRequired,
      //   https: PropTypes.bool,
      //   product: PropTypes.string,
      //   lang: PropTypes.string,
      //   sandbox: PropTypes.bool,
      //   width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      //   onReady: PropTypes.func,
      //   onSuccess: PropTypes.func,
      //   onError: PropTypes.func,
      //   onClose: PropTypes.func
      // }
      function Geetest(props) {
        var _this;

        _classCallCheck(this, Geetest);

        _this = _possibleConstructorReturn(this, _getPrototypeOf(Geetest).call(this, props));

        _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), 'init', function() {
          var that = _assertThisInitialized(_assertThisInitialized(_this)); // console.log('_init');

          if (window.initGeetest) {
            that.ready();
            return;
          }

          var ds = document.createElement('script');
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

          ds.src = ''
            .concat(document.location.protocol, '//static.geetest.com/static/tools/gt.js?_t=')
            .concat(new Date().getTime());
          var s = document.getElementsByTagName('script')[0];
          s.parentNode.insertBefore(ds, s);
          that.setState({
            script: ds,
          });
        });

        _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), 'ready', function() {
          var that = _assertThisInitialized(_assertThisInitialized(_this)); // console.log('_ready');

          var _that$props = that.props,
            gt = _that$props.gt,
            challenge = _that$props.challenge,
            https = _that$props.https,
            product = _that$props.product,
            lang = _that$props.lang,
            sandbox = _that$props.sandbox,
            width = _that$props.width,
            success = _that$props.success;
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
              https: https,
              product: product,
              lang: lang,
              sandbox: sandbox,
              width: width,
              offline: !success,
              new_captcha: true,
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
            return onSuccess(ins.getValidate());
          });
          ins.onError(onError);
          ins.onClose(onClose);
        });

        _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), 'destroy', function() {
          var that = _assertThisInitialized(_assertThisInitialized(_this)); // that.state.script.parentNode.removeChild(that.state.script);

          that.setState({
            ins: null,
            script: null,
          });
        });

        _this.dom = null;
        _this.state = {
          ins: null,
          script: null,
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
        },
        {
          key: 'shouldComponentUpdate',
          value: function shouldComponentUpdate(nextProps, nextState) {
            var that = this; // console.log('shouldComponentUpdate', that.props, nextProps, that.state, nextState);

            return nextProps.challenge !== that.props.challenge;
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

            var challenge = that.props.challenge;
            return React.createElement('div', {
              className: 'i-geetest',
              key: challenge,
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
    https: false,
    product: 'popup',
    lang: 'zh-cn',
    sandbox: false,
    width: '300px',
    onReady: function onReady() {},
    onSuccess: function onSuccess() {},
    onError: function onError() {},
    onClose: function onClose() {},
  });

  return Geetest;
});
