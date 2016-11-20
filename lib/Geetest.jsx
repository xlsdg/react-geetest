import React from 'react';
import ReactDOM from 'react-dom';

class Geetest extends React.Component {
  static propTypes = {
    gt: React.PropTypes.string.isRequired,
    challenge: React.PropTypes.string.isRequired,
    success: React.PropTypes.number.isRequired,
    https: React.PropTypes.bool,
    product: React.PropTypes.string,
    lang: React.PropTypes.string,
    sandbox: React.PropTypes.bool,
    width: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    handler: React.PropTypes.func
  }
  static defaultProps = {
    https: false,
    product: 'float',
    lang: 'zh-cn',
    sandbox: false,
    handler: function() {}
  }
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value || {}
    };
  }
  _initGreetest() {
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
      geetest.onReady(function() {
        that.props.handler(geetest);
      });
    });
  }
  _freshDOM() {
    let that = this;
    try {
      that._initGreetest();
    } catch (e) {
      that._initGreetest();
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.gt !== this.props.gt;
  }
  componentDidMount() {
    this._freshDOM();
  }
  componentDidUpdate() {
    this._freshDOM();
  }
  render() {
    return (
      <div className="geetest-captcha"></div>
    );
  }
}

export default Geetest;
