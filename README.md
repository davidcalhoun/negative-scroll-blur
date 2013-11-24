Negative Scroll Blur
====================

Make stuff blurry when there's negative top scroll.  Completely superfluous yet fun.  Intended for page heading graphics.

Inspired by UI seen on the Foursquare app.

[Demo](http://davidbcalhoun.com/a/negative-scroll-blur.html)

Video
====================
[![ScreenShot](video-screenshot.jpg)](http://www.youtube.com/watch?v=wfuVM1P_qgg)

Dependencies
====================
0 dependencies.  Works in pure JavaScript.

Usage
====================
You have two options:
* Add the id "blurMe" on the element you want blurred
* Scroll to the end of the JavaScript and change "#blurMe" to the jQuery-like selector you'd like to use (note: querySelector is used under the hood, NOT jQuery)

Support
====================
Tested to work in:

* Chrome 31+
* Safari 7.0+
* iOS 7 (tested on iPad 2)

(should theoretically work wherever [CSS filters are supported](http://caniuse.com/css-filters))

TODO
====================
* cross-browser prefix hell support
* optimizations using setTimeout for debouncing/throttling
* add transform3d HW-acceleration hack within JS itself