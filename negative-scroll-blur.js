/**
 *	Negative Scroll Blur
 *	Make stuff blurry when there's negative top scroll.
 *
 *	https://github.com/davidcalhoun/negative-scroll-blur
 */
;(function(element) {
	"use strict";

	var touchstartY;

	//	Helper methods
	var $   = document.querySelector.bind(document),
		evt = function(name, callback, scope){return (document || scope).addEventListener(name, callback, false)};

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

		evt("scroll", blurOnScrollUp, window);

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
	 *	blurElement
	 *	CSS blur a specified element
	 *
	 *	@param {DOM Node} element
	 *	@param {Integer} px Number of pixels to blur
	 */
	var blurOnScrollUp = function() {
		if(window.scrollY > 0) return;

		blurElement(element, Math.abs(window.scrollY / 2));
	}

	/**
	 *	blurElement
	 *	CSS blur a specified element
	 *
	 *	@param {DOM Node} element
	 *	@param {Integer} px Number of pixels to blur
	 *
	 *	@todo Cross-browser support
	 */
	var blurElement = function(element, px) {
		element.setAttribute("style", "-webkit-filter: blur(" + px + "px);");
	}

	//	Fire off init when the DOM is interactive
	document.addEventListener("DOMContentLoaded", init);
})("#blurMe");