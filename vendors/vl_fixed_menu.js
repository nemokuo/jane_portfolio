(function($) {
	"use strict"

	function e(e) {
		this.options = $.extend({
			slickyClass: "fixed",
			extraOffset: ".js-offset",
			fakeBlock: !0,
			fakeBlockClass: "fake-block",
			scrollClasses: !1,
			scrollTopClass: "scroll-up",
			scrollBottomClass: "scroll-down",
			offset: 0
		}, e), this.init()
	}
	var i = $(window)
	e.prototype = {
		init: function() {
			this.options.panel && (this.initStructure(), this.attachEvents())
		},
		initStructure: function() {
			this.panel = $(this.options.panel), this.height = this.panel.outerHeight(), this.offset = this.getTargetOffset(this.options.extraOffset), this.fake = $('<div class="' + this.options.fakeBlockClass + '"></div>'), this.resizeFlag = !1, this.isActive = !1, this.scrollPosition = 0, this.scrollPositionPrev = 0, this.options.fakeBlock && this.fake.insertBefore(this.panel).css({
				display: "none",
				height: this.height
			})
		},
		attachEvents: function() {
			var $ = this
			this.onScrollHandler = function() {
				$.scrollHandler()
			}, this.onResizeWindow = function() {
				$.resizeFlag || $.windowResize()
			}, i.on("scroll", this.onScrollHandler), i.on("resize orientationchange", this.onResizeWindow)
		},
		getTargetOffset: function(e) {
			return "number" == typeof this.options.extraOffset ? e = this.options.extraOffset : "string" == typeof this.options.extraOffset && (e = $(this.options.extraOffset).offset().top + $(this.options.extraOffset).outerHeight()), e
		},
		scrollHandler: function() {
			var $ = i.scrollTop()
			$ > this.offset ? this.isActive || (this.panel.addClass(this.options.slickyClass), this.options.fakeBlock && this.fake.show(), this.isActive = !0) : this.isActive && (this.panel.removeClass(this.options.slickyClass), this.options.fakeBlock && this.fake.hide(), this.isActive = !1), this.options.scrollClasses && (this.scrollPosition = $, this.scrollPosition > this.scrollPositionPrev ? (this.panel.addClass(this.options.scrollBottomClass), this.panel.removeClass(this.options.scrollTopClass)) : (this.panel.addClass(this.options.scrollTopClass), this.panel.removeClass(this.options.scrollBottomClass)), this.scrollPositionPrev = this.scrollPosition)
		},
		windowResize: function() {
			this.options.fakeBlock ? (this.height = this.panel.outerHeight(), this.offset = this.getTargetOffset(this.options.extraOffset), this.fake.css({
				height: this.height
			})) : this.offset = this.getTargetOffset(this.options.extraOffset), this.scrollHandler()
		},
		destroy: function() {
			console.log(1), this.options.fakeBlock && this.fake.remove(), this.resizeFlag = !0, this.panel.removeClass(this.options.slickyClass).removeClass(this.options.scrollTopClass).removeClass(this.options.scrollBottomClass), i.off("scroll", this.onScrollHandler), i.off("resize", this.onResizeWindow)
		}
	}, $.fn.stickyPanel = function(i) {
		return this.each(function() {
			jQuery(this).data("StickyPanel", new e($.extend(i, {
				panel: this
			})))
		})
	}
})(jQuery);