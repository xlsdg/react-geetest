import React from 'react';

const SCRIPT_ID = 'react-geetest';

const typeOf = type => object => Object.prototype.toString.call(object) === `[object ${type}]`;

// const isString = typeOf('String');
// const isObject = typeOf('Object');
const isFunction = typeOf('Function');

export default class NECaptcha extends React.Component {
  static defaultProps = {
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
      elem: null,
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
    const {
      className,
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

    const isUpdate =
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
    // console.log('init');
    const { elem } = that.state;

    if (window.initGeetest) {
      that.ready();
      return;
    }

    const script = document.getElementById(SCRIPT_ID);
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

    const ds = document.createElement('script');
    ds.id = SCRIPT_ID;
    ds.type = 'text/javascript';
    ds.async = true;
    ds.charset = 'utf-8';

    if (ds.readyState) {
      ds.onreadystatechange = () => {
        if (ds.readyState === 'loaded' || ds.readyState === 'complete') {
          ds.onreadystatechange = null;
          that.ready();
          that.triggerEvent('Im-ready');
        }
      };
    } else {
      ds.onload = () => {
        ds.onload = null;
        that.ready();
        that.triggerEvent('Im-ready');
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

  ready = event => {
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
    const { ins, elem } = that.state;

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

    if (elem) {
      elem.removeEventListener('Im-ready', that.ready.bind(that), false);
    }
  };

  load = ins => {
    const that = this;
    // console.log('load');

    if (!that.dom) {
      return;
    }

    const { onReady, onSuccess, onError, onClose } = that.props;

    ins.appendTo(that.dom);

    if (isFunction(ins.onReady)) {
      ins.onReady((...arg) => onReady(...arg, ins));
    }

    ins.onSuccess(() => onSuccess(ins.getValidate(), ins));

    if (isFunction(ins.onError)) {
      ins.onError((...arg) => onError(...arg, ins));
    }

    if (isFunction(ins.onClose)) {
      ins.onClose((...arg) => onClose(...arg, ins));
    }
  };

  destroy = () => {
    const that = this;
    // console.log('destroy');
    const { elem } = that.state;

    if (elem) {
      elem.removeEventListener('Im-ready', that.ready.bind(that), false);
    }

    // script.parentNode.removeChild(that.state.script);

    // that.setState({
    //   ins: null,
    //   script: null,
    //   elem: null,
    // });
  };

  triggerEvent = name => {
    const that = this;
    // console.log('triggerEvent');
    const { elem, script } = that.state;

    if (!elem && !script) {
      return;
    }

    const e = document.createEvent('Event');
    e.initEvent(name, true, true);

    const dom = elem || script;
    dom.dispatchEvent(e);
  };

  render() {
    const that = this;
    // console.log('render');
    const { className } = that.props;

    return (
      <div
        className={className}
        ref={e => {
          that.dom = e;
        }}
      />
    );
  }
}
