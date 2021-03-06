
/**
 * Slider
 * Author: LWXYFER
 * TODO:
 *   add drag event
 */

(function(factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof exports !== 'undefined') {
    module.exports = factory(require('jquery'));
  } else {
    factory(jQuery);
  }
}(function($){
  'use strict';

  var Slider = function(element, options) {

    this.$element = $(element);
    this.content = this.$element.html();
    this.$element.html('<div class="slider-con">' + this.content + '</div>');

    this.$element.addClass('slider');
    this.$con = $('.slider-con');
    this.$child = this.$con.children();

    this.options = $.extend({}, Slider.DEFAULTS, options);

    this.status = true; // judging scroll status
    this.init();

    // return Slider
  };

  Slider.DEFAULTS = {
    width: '100%',
    height: '100%',
    speed: 200,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 1000,
    arrow: true,
    arrowPre: '<span class="slider-arrow-bf"><</span>',
    arrowNext: '<span class="slider-arrow-af">></span>',
    dots: true,
    dotClass: null,
    keyboard: true,
    resize: null,
    callback: null // after every move
  };

  Slider.prototype.init = function() {

    var $element = this.$element;
    var $child = this.$child;
    var $con = this.$con;
    var options = this.options;

    $element.css('width', options.width);
    this.width = $element.width(); // if use percentage, need get real width
    this.length = $child.length;

    console.log('width', this.width);

    this.$allWidth = this.width * $child.length;
    this.$fullWidth = this.width * ($child.length + 1);

    $child.css('width', this.width);
    $element.css('height', options.height);

    $con.css('width', this.$fullWidth);

    // infinitescroll
    $con.append($con.children().first().clone());
    $con.prepend($con.children().last().clone());

    $con.css('left', -this.width);

    this.index = this.getIndex();
    // simplify
    if (options.keyboard) {
      this.keyboard();
    }
    if (options.autoplay) {
      this.autoplay();
    }
    if (options.arrow) {
      this.arrow();
    }
    if (options.dots) {
      this.dots();
    }
    // if (options.resize) {
    //   this.resize();
    // }
  };

  // Slider.prototype.reinit = function() {
  //   var $element = this.$element;
  //   var $child = this.$child;
  //   var $con = this.$con;
  //   var options = this.options;
  //
  //   $element.css('width', options.width);
  //   this.width = $element.width(); // if use percentage, need get real width
  //   this.length = $child.length;
  //
  //   console.log('width', this.width);
  //
  //   this.$allWidth = this.width * $child.length;
  //   this.$fullWidth = this.width * ($child.length + 1);
  //
  //   $child.css('width', this.width);
  //   $element.css('height', options.height);
  //
  //   $con.css('width', (this.$fullWidth).toString());
  //
  //   // infinitescroll
  //   $con.append($con.children().eq(0).clone());
  //   $con.prepend($con.children().eq(this.length - 1).clone());
  //
  //   $con.css('left', -this.width);
  // }

  Slider.prototype.destroy = function() {
    $('body').off('keydown.slider');
    $('.slider-dots .slider-dot').off('click.slider');
    $('.slider-arrow-af, .slider-arrow-bf').off('click.slider');
    $(window).off('resize.slider');

    this.$element.removeClass('slider');
    this.$element.html(this.content);
  };

  Slider.prototype.move = function(distance) {
    var _this = this;

    // not infinite scroll
    if (!this.infinite) {
      if (this.getIndex === this.length) {
        return false;
      }
    }

    if (this.status) {
      (function() {

        _this.status = !_this.status;

        // TODO: use transform
        _this.$con.animate({
          left: '-=' + distance
        }, _this.options.speed, function() {

          _this.status = !_this.status;

          if (_this.getIndex() === _this.length) {
            _this.$con.css('left', -_this.width);
            console.log('infinite');
          }
          if (_this.getIndex() === -1) {
            _this.$con.css('left', -_this.$allWidth);
            console.log('infinite');
          }

          if (_this.options.dots) {
            _this.dotActive();
          }
          if (_this.options.callback) {
            _this.options.callback.call(_this);
          }
        });
      }());
    }
    return true;
  };

  Slider.prototype.next = function() {
    return this.move(this.width);
  };

  Slider.prototype.pre = function() {
    return this.move(-this.width);
  };

  Slider.prototype.keyboard = function() {
    var _this = this;

    $('body').on('keydown.slider', function(e) {
      var which = e.which;
      if (which === 37 || which === 38) {
        _this.pre();
      } else if (which === 39 || which === 40) {
        _this.next();
      }
    });
  };

  Slider.prototype.getIndex = function() {
    var ml = Number(this.$con.css('left').slice(0,-2));
    var w = this.width;
    var i = Math.abs(-ml / w) - 1; // clone the first slider, so minusing 1
    return i;
  };

  Slider.prototype.autoplay = function() {
    var _this = this;

    var timer = setInterval(function() {
      var x = _this.next();

      if (!x) {
        clearTimeout(timer);
      }
    }, _this.options.autoplaySpeed);
  };

  Slider.prototype.dots = function() {
    var dotsTem = '<div class="slider-dots">';
    var dotTem = '<span class="slider-dot"></span>';

    for (var i = 0; i < this.length; i++) {
      dotsTem += dotTem;
    }

    dotsTem += '</div>';

    this.$element.append(dotsTem);
    this.dotActive();
    this.dotMove();
  };

  Slider.prototype.dotActive = function() {
    var i = this.getIndex();
    console.log('current getIndex', i);

    $('.slider-dots .slider-dot').removeClass('active');
    $('.slider-dots .slider-dot ').eq(i).addClass('active');
  };

  Slider.prototype.dotMove = function(iIn) {
    var _this = this;

    // add custom index input
    if (iIn) {
      var i = _this.getIndex();
      _this.move((iIn - i) * _this.width);
      return true;
    }

    $('.slider-dots .slider-dot').on('click.slider', function() {
      var i = _this.getIndex();

      console.log('dot distance: %s', ($(this).getIndex() - i) * _this.width);

      _this.move(($(this).getIndex() - i) * _this.width);
    });

  };

  Slider.prototype.arrow = function() {
    var _this = this;

    this.$element.append(_this.options.arrowPre, _this.options.arrowNext);

    $('.slider-arrow-af').on('click.slider', function() {
      _this.next();
    });
    $('.slider-arrow-bf').on('click.slider', function() {
      _this.pre();
    });
  };

  // TODO: add debounce
  // Slider.prototype.resize = function() {
  //   var _this = this;
  //   var timer = null;
  //   $(window).on('resize.slider', function() {
  //     console.log('11');
  //     if (timer) clearTimeout(timer);
  //     timer = setTimeout(_this.init(), 500);
  //     // debounce(_this.init, 500);
  //   });
  // };

  $.fn.slider = function() {
    var _this = this;
    var opt = arguments[0];
    var args = Array.prototype.slice.call(arguments, 1);
    var l = _this.length;
    var i;
    var ret;

    for (i = 0; i < l; i++) {
      if (typeof opt == 'object' || typeof opt == 'undefined') {
        _this[i].slider = new Slider(_this[i], opt);
      } else {
        var type = typeof _this[i].slider[opt] === 'function';
        ret = type ? _this[i].slider[opt].apply(_this[i].slider, args) : _this[i].slider[opt];
      }
      if (typeof ret != 'undefined') {
        return ret;
      }
    }
    return _this;
  };

}));
