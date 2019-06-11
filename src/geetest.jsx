import React from 'react';

const SCRIPT_ID = 'react-geetest';

const typeOf = type => object => Object.prototype.toString.call(object) === `[object ${type}]`;

// const isString = typeOf('String');
// const isObject = typeOf('Object');
const isFunction = typeOf('Function');

export default class Geetest extends React.PureComponent {
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

  constructor() {
    super(...arguments);

    const that = this;

    that.dom = React.createRef();
    that.instance = null;
    that.script = null;

    // that.state = {};
  }

  componentDidMount() {
    const that = this;
    // console.log('componentDidMount', that.props, that.state);
    that.create();
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   const that = this;
  //   // console.log('shouldComponentUpdate', that.props, nextProps, that.state, nextState);
  //   const {
  //     className,
  //     gt,
  //     challenge,
  //     offline,
  //     newCaptcha,
  //     product,
  //     width,
  //     lang,
  //     https,
  //     timeout,
  //     area,
  //     nextWidth,
  //     bgColor,
  //   } = that.props;

  //   const isUpdate =
  //     className !== nextProps.className ||
  //     gt !== nextProps.gt ||
  //     challenge !== nextProps.challenge ||
  //     offline !== nextProps.offline ||
  //     newCaptcha !== nextProps.newCaptcha ||
  //     product !== nextProps.product ||
  //     width !== nextProps.width ||
  //     lang !== nextProps.lang ||
  //     https !== nextProps.https ||
  //     timeout !== nextProps.timeout ||
  //     area !== nextProps.area ||
  //     nextWidth !== nextProps.nextWidth ||
  //     bgColor !== nextProps.bgColor;

  //   return isUpdate;
  // }

  componentDidUpdate(prevProps, prevState) {
    const that = this;
    // console.log('componentDidUpdate', prevProps, that.props, prevState, that.state);
    that.create();
  }

  componentWillUnmount() {
    const that = this;
    // console.log('componentWillUnmount', that.props, that.state);
    that.destroy();
  }

  create = () => {
    const that = this;
    // console.log('create');
    // const {  } = that.state;

    if (window.initGeetest) {
      that.ready();
      return;
    }

    const script = document.getElementById(SCRIPT_ID);
    if (script) {
      if (that.script) {
        return;
      }

      script.addEventListener('Im-ready', that.ready, false);
      that.script = script;
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
    that.script = ds;
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
    // const {  } = that.state;

    if (!window.initGeetest) {
      return;
    }

    if (that.instance) {
      that.attach(that.instance);
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
      instance => {
        that.instance = instance;
        that.attach(instance);
      }
    );

    if (that.script && isFunction(that.script.removeEventListener)) {
      that.script.removeEventListener('Im-ready', that.ready, false);
    }
  };

  attach = instance => {
    const that = this;
    // console.log('attach');
    const { onReady, onSuccess, onError, onClose } = that.props;

    if (!that.dom || !that.dom.current) {
      return;
    }

    instance.appendTo(that.dom.current);

    if (isFunction(instance.onReady)) {
      instance.onReady((...arg) => onReady(...arg, instance));
    }

    instance.onSuccess(() => onSuccess(instance.getValidate(), instance));

    if (isFunction(instance.onError)) {
      instance.onError((...arg) => onError(...arg, instance));
    }

    if (isFunction(instance.onClose)) {
      instance.onClose((...arg) => onClose(...arg, instance));
    }
  };

  destroy = () => {
    const that = this;
    // console.log('destroy');
    // const {  } = that.state;

    if (that.script && isFunction(that.script.removeEventListener)) {
      that.script.removeEventListener('Im-ready', that.ready, false);
      // that.script.parentNode.removeChild(that.script);
    }

    if (that.instance && isFunction(that.instance.destroy)) {
      that.instance.destroy();
    }

    that.instance = null;
    that.script = null;
  };

  triggerEvent = name => {
    const that = this;
    // console.log('triggerEvent');
    // const {  } = that.state;

    if (!that.script || !isFunction(that.script.dispatchEvent)) {
      return;
    }

    const e = document.createEvent('Event');
    e.initEvent(name, true, true);
    that.script.dispatchEvent(e);
  };

  render() {
    const that = this;
    // console.log('render');
    const { className, children } = that.props;

    return (
      <div ref={that.dom} className={className}>
        {children || null}
      </div>
    );
  }
}
