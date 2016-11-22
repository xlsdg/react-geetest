import React from 'react';
import ReactDOM from 'react-dom';

class Geetest extends React.Component {
  constructor(props) {
    // console.log('constructor', props);
    super(props);
    this.state = {};
    this._init = this._init.bind(this);
  }
  _init() {
    // console.log('_init');
    let that = this;
    return window.initGeetest({
        gt: that.props.gt,
        challenge: that.props.challenge,
        https: that.props.https,
        product: that.props.product,
        lang: that.props.lang,
        sandbox: that.props.sandbox,
        width: that.props.width,
        offline: !that.props.success
    }, function(geetest) {
      geetest.appendTo(ReactDOM.findDOMNode(that));
      geetest.onReady(that.props.onReady);
      geetest.onRefresh(that.props.onRefresh);
      geetest.onSuccess(function() {
        let value = geetest.getValidate();
        that.props.onSuccess(value);
      });
      geetest.onFail(that.props.onFail);
      geetest.onError(that.props.onError);
    });
  }
  componentWillMount() {
    // console.log('componentWillMount');
  }
  componentDidMount() {
    // console.log('componentDidMount');
    if (this.props.challenge) {
      this._init();
    }
  }
  componentWillReceiveProps(nextProps) {
    // console.log('componentWillReceiveProps', nextProps);
  }
  shouldComponentUpdate(nextProps, nextState) {
    // console.log('shouldComponentUpdate', nextProps, nextState);
    return nextProps.challenge !== this.props.challenge;
  }
  componentWillUpdate(nextProps, nextState) {
    // console.log('componentWillUpdate', nextProps, nextState);
  }
  componentDidUpdate(prevProps, prevState) {
    // console.log('componentDidUpdate', prevProps, prevState);
    if (this.props.challenge) {
      this._init();
    }
  }
  componentWillUnmount() {
    // console.log('componentWillUnmount');
  }
  render() {
    // console.log('render');
    return (
      <div key="geetest-captcha"></div>
    );
  }
}

Geetest.propTypes = {
  gt: React.PropTypes.string.isRequired,
  challenge: React.PropTypes.string.isRequired,
  success: React.PropTypes.number.isRequired,
  https: React.PropTypes.bool,
  product: React.PropTypes.string,
  lang: React.PropTypes.string,
  sandbox: React.PropTypes.bool,
  width: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
  onReady: React.PropTypes.func,
  onRefresh: React.PropTypes.func,
  onSuccess: React.PropTypes.func,
  onFail: React.PropTypes.func,
  onError: React.PropTypes.func
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
