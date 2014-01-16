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

upstart service 
======

```
description "Jivepi upstart service"

start on filesystem and net-device-up IFACE=eth0
stop on runlevel [016]

respawn

post-stop script
  echo "`date` : stop jivepi" >> /home/pi/jivepi.log
end script

script
  export HOME="/home/pi"
  echo "`date` : start jivepi" >> /home/pi/jivepi.log
  cd /home/pi
  exec /home/pi/launchJivePi.sh >> /home/pi/jivepi.log 2>&1
end script
```
