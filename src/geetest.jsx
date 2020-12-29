import React from 'react';

const SCRIPT_ID = 'react-geetest';

const typeOf = type => object => Object.prototype.toString.call(object) === `[object ${type}]`;

// const isString = typeOf('String');
// const isObject = typeOf('Object');
const isFunction = typeOf('Function');

function NewCustomEvent(type, params = { bubbles: false, cancelable: false, detail: null }) {
  const event = document.createEvent('CustomEvent');
  event.initCustomEvent(type, !!params.bubbles, !!params.cancelable, params.detail || {});
  return event;
}

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
    remUnit: 1,
    zoomEle: null,
    hideSuccess: false,
    hideClose: false,
    hideRefresh: false,
    area: null,
    nextWidth: null,
    bgColor: null,
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
    // const {  } = that.props;
    // const {  } = that.state;
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
  //     remUnit,
  //     zoomEle,
  //     hideSuccess,
  //     hideClose,
  //     hideRefresh,
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
  //     remUnit !== nextProps.remUnit ||
  //     zoomEle !== nextProps.zoomEle ||
  //     hideSuccess !== nextProps.hideSuccess ||
  //     hideClose !== nextProps.hideClose ||
  //     hideRefresh !== nextProps.hideRefresh ||
  //     area !== nextProps.area ||
  //     nextWidth !== nextProps.nextWidth ||
  //     bgColor !== nextProps.bgColor;

  //   return isUpdate;
  // }

  componentDidUpdate(prevProps, prevState) {
    const that = this;
    // console.log('componentDidUpdate', prevProps, that.props, prevState, that.state);
    // const {  } = that.props;
    // const {  } = that.state;
    that.create();
  }

  componentWillUnmount() {
    const that = this;
    // console.log('componentWillUnmount', that.props, that.state);
    // const {  } = that.props;
    // const {  } = that.state;
    that.destroy();
  }

  create = () => {
    const that = this;
    // console.log('create');
    // const {  } = that.props;
    // const {  } = that.state;

    if (window.initGeetest) {
      return that.ready();
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
          that.triggerEvent('Im-ready');
        }
      };
    } else {
      ds.onload = () => {
        ds.onload = null;
        that.triggerEvent('Im-ready');
      };
    }

    const protocol = window.location.protocol === 'http:' ? 'http:' : 'https:';
    ds.src = `${protocol}//static.geetest.com/static/tools/gt.js?_t=${new Date().getTime()}`;

    const s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ds, s);

    ds.addEventListener('Im-ready', that.ready, false);
    that.script = ds;
  };

  ready = event => {
    const that = this;
    // console.log('ready');
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
      remUnit,
      zoomEle,
      hideSuccess,
      hideClose,
      hideRefresh,
      area,
      nextWidth,
      bgColor,
    } = that.props;
    // const {  } = that.state;

    if (!window.initGeetest) {
      return;
    }

    if (that.instance) {
      return that.attach(that.instance);
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
        remUnit,
        zoomEle,
        hideSuccess,
        hideClose,
        hideRefresh,
        area,
        nextWidth,
        bgColor,
      },
      instance => {
        that.instance = instance;
        that.attach(instance);
      }
    );
  };

  attach = instance => {
    const that = this;
    // console.log('attach');
    const { onReady, onSuccess, onError, onClose } = that.props;
    // const {  } = that.state;

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
    // const {  } = that.props;
    // const {  } = that.state;

    if (that.script && isFunction(that.script.removeEventListener)) {
      that.script.removeEventListener('Im-ready', that.ready, false);
      // that.script.parentNode.removeChild(that.script);
      that.script = null;
    }

    if (that.instance && isFunction(that.instance.destroy)) {
      that.instance.destroy();
      that.instance = null;
    }
  };

  triggerEvent = type => {
    const that = this;
    // console.log('triggerEvent');
    // const {  } = that.props;
    // const {  } = that.state;

    if (!that.script || !isFunction(that.script.dispatchEvent)) {
      return;
    }

    const event = isFunction(window.CustomEvent)
      ? new window.CustomEvent(type, {
          detail: null,
          bubbles: false,
          cancelable: false,
          // composed: false,
        })
      : NewCustomEvent(type, {
          detail: null,
          bubbles: false,
          cancelable: false,
          // composed: false,
        });

    that.script.dispatchEvent(event);
  };

  render() {
    const that = this;
    // console.log('render');
    const { className, children } = that.props;
    // const {  } = that.state;

    return (
      <div ref={that.dom} className={className}>
        {children || null}
      </div>
    );
  }
}
