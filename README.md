jivepi
======

nodejs project to control a raspberry pi for turn on led with jive activities


config
======

example of jive config file

```javascript
var config = {}

config.username  = '';
config.password = '';
config.jiveUrl = '';

config.mockLed = false;

config.led = {
    redpin: 16,
    greenpin : 18,
    bluepin :22
};

module.exports = config;
```