# react-geetest

A Geetest component for React

## Installation

```
$ npm install react-geetest --save
```

## Usage

``` react
import Geetest from 'react-geetest';

const onSuccess = isSuccess => console.log(isSuccess);

<Geetest
  gt="your-gt"
  challenge="your-challenge"
  onSuccess={onSuccess}
/>
```

## Properties

``` javascript
  gt:           React.PropTypes.string.isRequired,
  challenge:    React.PropTypes.string.isRequired,
  offline:      React.PropTypes.bool,
  newCaptcha:   React.PropTypes.bool,
  product:      React.PropTypes.string,
  width:        React.PropTypes.string,
  lang:         React.PropTypes.string,
  https:        React.PropTypes.bool,
  timeout:      React.PropTypes.number,
  area:         React.PropTypes.string,
  nextWidth:    React.PropTypes.string,
  bgColor:      React.PropTypes.string,
  onReady:      React.PropTypes.func,
  onSuccess:    React.PropTypes.func,
  onError:      React.PropTypes.func,
  onClose:      React.PropTypes.func,
```

[Read More](https://docs.geetest.com/install/deploy/client/web)

# License

MIT
