/**
 *	Negative Scroll Blur
 *	Make stuff blurry when there's negative top scroll.
 *
 *	https://github.com/davidcalhoun/negative-scroll-blur
 */
;(function(element, options) {
	"use strict";

	if(!Array.prototype.map) return;  // <IE9

	var touchstartY, originalStyle, styleReset;

	//	Helper methods
	var $   = document.querySelector.bind(document),
		evt = function(name, callback, scope){return (document || scope).addEventListener(name, callback, false)},
		cssPrefixes = ["", "-webkit-"];

	/**
	 *	init
	 *	
	 *	@todo setTimeouts for events
	 */
	var init = function() {
		/**
		  *	If the element is a string, assume it's a jQuery-like DOM selector,
		  *	else assume it's a DOM Node.
		  */
		element = (typeof element == "string") ? $(element) : element;

		evt("scroll", scrollDebounce, window);

		/**
		 *	Add listeners for mobile.
		 *	This is necessary because iOS7 has no "negative scroll", nor
		 *	a scroll event that fires while actually scrolling (only at
		 *	the end of scrolling).
		 */
		if("ontouchstart" in document) {
			evt("touchstart", touchstart);
			evt("touchmove", touchmove);
			evt("touchend", touchend);		
		}

		//	HW-accelerate on init
		originalStyle = element.getAttribute("style") || "";
		element.setAttribute("style", originalStyle + ";-webkit-transform:translate3d(0,0,0);");
	}

	/**
	 *	touchstart
	 *
	 *	@param {Object} e Touch event
	 */
	var touchstart = function(e) {
		if(window.scrollY == 0) {
			touchstartY = e.touches[0].screenY;
		}
	}

	/**
	 *	touchend
	 *
	 *	@param {Object} e Touch event
	 */
	var touchend = function(e) {
		touchstartY = null;
	}	

	/**
	 *	touchmove
	 *
	 *	@param {Object} e Touch event
	 */
	var touchmove = function(e) {
		if(!touchstartY || (touchstartY - e.touches[0].screenY > 0)) {
			return;
		}

		blurElement(element, ((Math.abs(touchstartY - e.touches[0].screenY) / 3) - 3));
	}

	/**
	 *	onScroll
	 *	CSS blur a specified element
	 *
	 *	@param {DOM Node} element
	 *	@param {Integer} px Number of pixels to blur
	 */
	var onScroll = function() {
		if(window.scrollY > 0) return;

		styleReset = false;

		transformElement(element, window.scrollY);
	}

	var timeout;

	var scrollDebounce = function() {
		window.requestAnimationFrame(onScroll);
	}

	/**
	 *	transformElement
	 *	CSS blur a specified element
	 *
	 *	@param {DOM Node} element
	 *	@param {Integer} px Number of pixels to blur
	 */
	var transformElement = function(element, scrollPx) {
		var px = Math.abs(scrollPx);
		px = px / 2;

		var style, scale;

		style = originalStyle + ";-webkit-transition: -webkit-transform 0.1s linear;-webkit-transform-origin-y: 100%;transform-origin-y: 100%;";

		if(scrollPx < -1) {
			style += cssPrefixes.map(function(key){return key + "filter:blur(" + Math.floor(px) + "px);"}).join("");

			if(options.zoom) {
				scale = 1 + (px / 10);
				style += "-webkit-transform: scale3d(" + scale + ", " + scale + ", 1)";
			}			
		}

		element.setAttribute("style", style);
	}

	//	Fire off init when the DOM is interactive
	document.addEventListener("DOMContentLoaded", init);
})("#blurMe", {
	//	Options
	zoom: true
});