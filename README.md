# react-geetest

> A Geetest component for React

## Installation

```bash
$ npm install react-geetest --save
```

## Usage

``` react
import Geetest from 'react-geetest';

export default () => {
  const onSuccess = isSuccess => console.log(isSuccess);

  return (
    <Geetest
      gt="your-gt"
      challenge="your-challenge"
      onSuccess={onSuccess}
    />
  );
};
```

## Properties

``` javascript
  className:    PropTypes.string,
  gt:           PropTypes.string.isRequired,
  challenge:    PropTypes.string.isRequired,
  offline:      PropTypes.bool,
  newCaptcha:   PropTypes.bool,
  product:      PropTypes.string,
  width:        PropTypes.string,
  lang:         PropTypes.string,
  https:        PropTypes.bool,
  timeout:      PropTypes.number,
  area:         PropTypes.string,
  nextWidth:    PropTypes.string,
  bgColor:      PropTypes.string,
  onReady:      PropTypes.func,
  onSuccess:    PropTypes.func,
  onError:      PropTypes.func,
  onClose:      PropTypes.func,
```

[Read More](https://docs.geetest.com/install/deploy/client/web)

## License

MIT
