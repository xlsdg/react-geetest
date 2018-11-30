# react-geetest
A Geetest component for React

## Installation

```
$ npm install react-geetest --save
```


## Usage

``` react
import Geetest from 'react-geetest';

const handlerGeetest = function(result) {
  console.log(result);
};

<Geetest
  gt="your-gt"
  challenge="your-challenge"
  success="your-success"
  onSuccess={handlerGeetest}
/>
```

## Properties

``` javascript
  gt:           React.PropTypes.string.isRequired,
  challenge:    React.PropTypes.string.isRequired,
  success:      React.PropTypes.number.isRequired,
  https:        React.PropTypes.bool,
  product:      React.PropTypes.string,
  lang:         React.PropTypes.string,
  sandbox:      React.PropTypes.bool,
  width:        React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
  onReady:      React.PropTypes.func,
  onRefresh:    React.PropTypes.func,
  onSuccess:    React.PropTypes.func,
  onFail:       React.PropTypes.func,
  onError:      React.PropTypes.func
```

[Read More](http://www.geetest.com/install/sections/idx-client-sdk.html)

# License

MIT
