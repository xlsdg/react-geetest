import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class Geetest extends React.Component {
  constructor(props) {
    // console.log('constructor', props);
    super(props);
    this.state = {
      ins: null,
      script: null
    };
    this._init = this._init.bind(this);
    this._ready = this._ready.bind(this);
    this._load = this._load.bind(this);
    this._destroy = this._destroy.bind(this);
  }
  // componentWillMount() {
    // const that = this;
    // console.log('componentWillMount', that.props, that.state);
  // }
  componentDidMount() {
    const that = this;
    // console.log('componentDidMount', that.props, that.state);
    that._init();
  }
  // componentWillReceiveProps(nextProps) {
    // const that = this;
    // console.log('componentWillReceiveProps', that.props, nextProps);
  // }
  shouldComponentUpdate(nextProps, nextState) {
    const that = this;
    // console.log('shouldComponentUpdate', that.props, nextProps, that.state, nextState);
    return nextProps.challenge !== that.props.challenge;
  }
  // componentWillUpdate(nextProps, nextState) {
    // const that = this;
    // console.log('componentWillUpdate', that.props, nextProps, that.state, nextState);
  // }
  componentDidUpdate(prevProps, prevState) {
    const that = this;
    // console.log('componentDidUpdate', prevProps, that.props, prevState, that.state);
    that._init();
  }
  componentWillUnmount() {
    const that = this;
    // console.log('componentWillUnmount', that.props, that.state);
    that._destroy();
  }
  _init() {
    const that = this;
    // console.log('_init');

    if (window.initGeetest) {
      return that._ready();
    }

    const ds = document.createElement('script');
    ds.type = 'text/javascript';
    ds.async = true;
    ds.charset = 'utf-8';
    if (ds.readyState) {
      ds.onreadystatechange = function() {
        if (ds.readyState === 'loaded' || ds.readyState === 'complete') {
          ds.onreadystatechange = null;
          that._ready();
        }
      };
    } else {
      ds.onload = function() {
        ds.onload = null;
        that._ready();
      };
    }
    ds.src = `${document.location.protocol}//static.geetest.com/static/tools/gt.js?_t=${(new Date()).getTime()}`;
    const s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ds, s);

    that.setState({
      script: ds
    });
  }
  _ready() {
    const that = this;
    // console.log('_ready');
    const {
      gt, challenge, https, product, lang, sandbox, width, success
    } = that.props;
    const {
      ins
    } = that.state;

    if (!window.initGeetest) {
      return;
    }

    if (ins) {
      return that._load(ins);
    }

    return window.initGeetest({
      gt, challenge, https, product, lang, sandbox, width, offline: !success
    }, function(geetest) {
      that._load(geetest);

      that.setState({
        ins: geetest
      });
    });
  }
  _load(ins) {
    const that = this;
    // console.log('_load');
    const {
      onReady, onRefresh, onSuccess, onFail, onError
    } = that.props;

    ins.appendTo(ReactDOM.findDOMNode(that));
    ins.onReady(onReady);
    ins.onRefresh(onRefresh);
    ins.onSuccess(() => onSuccess(ins.getValidate()));
    ins.onFail(onFail);
    ins.onError(onError);
  }
  _destroy() {
    const that = this;
    // that.state.script.parentNode.removeChild(that.state.script);
    that.setState({
      ins: null,
      script: null
    });
  }
  render() {
    const that = this;
    // console.log('render');
    const {
      challenge
    } = that.props;

    return (
      <div
        className="i-geetest"
        key={challenge}
      />
    );
  }
}

Geetest.propTypes = {
  gt: PropTypes.string.isRequired,
  challenge: PropTypes.string.isRequired,
  success: PropTypes.number.isRequired,
  https: PropTypes.bool,
  product: PropTypes.string,
  lang: PropTypes.string,
  sandbox: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onReady: PropTypes.func,
  onRefresh: PropTypes.func,
  onSuccess: PropTypes.func,
  onFail: PropTypes.func,
  onError: PropTypes.func
};

Geetest.defaultProps = {
  https: false,
  product: 'float',
  lang: 'zh-cn',
  sandbox: false,
  onReady: function() {},
  onRefresh: function() {},
  onSuccess: function() {},
  onFail: function() {},
  onError: function() {}
};

export default Geetest;
