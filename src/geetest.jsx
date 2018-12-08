import React from 'react';

export default class Geetest extends React.Component {
  static defaultProps = {
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
    onReady: () => {},
    onSuccess: () => {},
    onError: () => {},
    onClose: () => {},
  };

  constructor(props) {
    super(props);
    this.dom = null;
    this.state = {
      ins: null,
      script: null,
    };
  }

  // componentWillMount() {
  //   const that = this;
  //   console.log('componentWillMount', that.props, that.state);
  // }

  componentDidMount() {
    const that = this;
    // console.log('componentDidMount', that.props, that.state);
    that.init();
  }

  // componentWillReceiveProps(nextProps) {
  //   const that = this;
  //   console.log('componentWillReceiveProps', that.props, nextProps);
  // }

  shouldComponentUpdate(nextProps, nextState) {
    const that = this;
    // console.log('shouldComponentUpdate', that.props, nextProps, that.state, nextState);
    return nextProps.challenge !== that.props.challenge;
  }

  // componentWillUpdate(nextProps, nextState) {
  //   const that = this;
  //   console.log('componentWillUpdate', that.props, nextProps, that.state, nextState);
  // }

  componentDidUpdate(prevProps, prevState) {
    const that = this;
    // console.log('componentDidUpdate', prevProps, that.props, prevState, that.state);
    that.init();
  }

  componentWillUnmount() {
    const that = this;
    // console.log('componentWillUnmount', that.props, that.state);
    that.destroy();
  }

  init = () => {
    const that = this;
    // console.log('_init');

    if (window.initGeetest) {
      that.ready();
      return;
    }

    const ds = document.createElement('script');
    ds.type = 'text/javascript';
    ds.async = true;
    ds.charset = 'utf-8';

    if (ds.readyState) {
      ds.onreadystatechange = () => {
        if (ds.readyState === 'loaded' || ds.readyState === 'complete') {
          ds.onreadystatechange = null;
          that.ready();
        }
      };
    } else {
      ds.onload = () => {
        ds.onload = null;
        that.ready();
      };
    }

    const protocol = window.location.protocol === 'http:' ? 'http:' : 'https:';
    ds.src = `${protocol}//static.geetest.com/static/tools/gt.js?_t=${new Date().getTime()}`;
    const s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ds, s);

    that.setState({
      script: ds,
    });
  };

  ready = () => {
    const that = this;
    // console.log('_ready');
    const {
      gt,
      challenge,
      offline,
      newCaptcha,
      product,
      width,
      lang,
      https,
      timeout,
      area,
      nextWidth,
      bgColor,
    } = that.props;
    const { ins } = that.state;

    if (!window.initGeetest) {
      return;
    }

    if (ins) {
      that.load(ins);
      return;
    }

    window.initGeetest(
      {
        gt,
        challenge,
        offline,
        new_captcha: newCaptcha,
        product,
        width,
        lang,
        https,
        timeout,
        area,
        next_width: nextWidth,
        bg_color: bgColor,
      },
      geetest => {
        that.load(geetest);

        that.setState({
          ins: geetest,
        });
      }
    );
  };

  load = ins => {
    const that = this;
    // console.log('_load');

    if (!that.dom) {
      return;
    }

    const { onReady, onSuccess, onError, onClose } = that.props;

    ins.appendTo(that.dom);

    ins.onReady(onReady);
    ins.onSuccess(() => onSuccess(ins.getValidate(), ins));
    ins.onError(onError);
    ins.onClose(onClose);
  };

  destroy = () => {
    const that = this;
    // that.state.script.parentNode.removeChild(that.state.script);
    that.setState({
      ins: null,
      script: null,
    });
  };

  render() {
    const that = this;
    // console.log('render');
    const { challenge } = that.props;

    return (
      <div
        className="i-geetest"
        key={challenge}
        ref={e => {
          that.dom = e;
        }}
      />
    );
  }
}
