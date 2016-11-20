# react-geetest
A Geetest component for React

## Installation

```
$ npm install react-geetest --save
```


## Usage

In `index.html` :

``` html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>Demo</title>
  <link rel="stylesheet" href="index.css" />
  <script src="//static.geetest.com/static/tools/gt.js"></script>
</head>
<body>
  <div id="root"></div>
  <script src="common.js"></script>
  <script src="index.js"></script>
</body>
</html>
```

Then:

``` javascript
import Geetest from 'react-geetest';

if (!geetest.gt) {
    return null;
}

const handlerGeetest = function(captcha) {
    captcha.onSuccess(function() {
        console.log(captcha.getValidate());
    });
};

return (
    <Geetest gt={geetest.gt}
             challenge={geetest.challenge}
             success={geetest.success}
             handler={handlerGeetest}
             https={true}/>
);
```

## Properties

``` javascript
gt:         React.PropTypes.string.isRequired,
challenge:  React.PropTypes.string.isRequired,
success:    React.PropTypes.number.isRequired,
https:      React.PropTypes.bool,
product:    React.PropTypes.string,
lang:       React.PropTypes.string,
sandbox:    React.PropTypes.bool,
width:      React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
handler:    React.PropTypes.func
```

[Read More](http://www.geetest.com/install/sections/idx-client-sdk.html)

# License

MIT
