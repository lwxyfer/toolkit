'use strict';

/**
 * Slider
 * Author: LWXYFER
 * TODO:
 *  add drag
 *  use css class
 */

(function($){

  var Slider = function(element, options) {

    this.$element = $(element);

    // simplify html structure
    this.$element.html('<div class="slider-con">' + this.$element.html() + '</div>');

    // users has other names
    this.$element.addClass('slider');
    this.$con = $('.slider-con');
    this.$child = this.$con.children();

    this.options = $.extend({}, Slider.DEFAULTS, options);

    this.status = true;
    this.init();
  };

  Slider.DEFAULTS = {
    width: '100%',
    height: 'auto',
    speed: 200,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 1000,
    arrow: true,
    arrowPre: null,
    arrowNext: null,
    dots: true,
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

    // cant use percentage
    $child.css('width', this.width);
    $element.css('height', options.height);

    $con.css('width', (this.$fullWidth).toString());

    // infinitescroll
    $con.append($con.children().eq(0).clone());
    $con.prepend($con.children().eq(this.length - 1).clone());

    $con.css('left', -this.width);

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

  Slider.prototype.reinit = function() {
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

    // cant use percentage
    $child.css('width', this.width);
    $element.css('height', options.height);

    $con.css('width', (this.$fullWidth).toString());

    // infinitescroll
    $con.append($con.children().eq(0).clone());
    $con.prepend($con.children().eq(this.length - 1).clone());

    $con.css('left', -this.width);
  }

  Slider.prototype.destory = function() {
    // clear css
    // clear event
  };

  Slider.prototype.move = function(distance) {
    var _this = this;

    // not infinite scroll
    if (!this.infinite) {
      if(this.index === this.length) {
        return false;
      }
    }

    if (this.status) {
      (function() {

        _this.status = !_this.status;

        _this.$con.animate({
          left: '-=' + distance
        }, _this.options.speed, function() {

          _this.status = !_this.status;

          if (_this.index() === _this.length) {
            _this.$con.css('left', -_this.width);
            console.log('change');
          }
          if (_this.index() === -1) {
            _this.$con.css('left', -_this.$allWidth);
            console.log('change');
          }

          _this.dotActive();
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
    $('body').on('keydown', function(e) {
      var which = e.which;
      if (which === 37 || which === 38) {
        _this.pre();
      } else if (which === 39 || which === 40) {
        _this.next();
      }
    });
  };

  Slider.prototype.index = function() {
    var ml = Number(this.$con.css('left').slice(0,-2));
    var w = this.width;
    var i = Math.abs(-ml / w) - 1; // clone the first slider, so minusing 1
    return i;
  }

  Slider.prototype.autoplay = function() {
    var _this = this;
    var timer = setInterval(function() {
      var x = _this.next();

      if (!x) {
        clearTimeout(timer);
      }
    }, _this.options.autoplaySpeed);
  };

  Slider.prototype.hoverStop = function() {
    if(this.options.autoplay) {

    }
  }

  Slider.prototype.dots = function() {
    var dotsTem = '<div class="dots">';
    var dotTem = '<span class="dot"></span>';

    for (var i = 0; i < this.length; i++) {
      dotsTem += dotTem;
    }

    dotsTem += '</div>';

    this.$element.append(dotsTem);
    this.dotActive();
    this.dotMove();
  };

  Slider.prototype.dotActive = function() {
    var i = this.index();
    console.log('current index', i);

    $('.dots .dot').removeClass('active');
    $('.dots .dot ').eq(i).addClass('active');
  };

  Slider.prototype.dotMove = function() {
    var _this = this;

    $('.dot').on('click', function() {
      var i = _this.index();

      console.log('dot distance', ($(this).index() - i) * _this.width);

      _this.move(($(this).index() - i) * _this.width);
    });

  };

  Slider.prototype.arrow = function() {
    var _this = this;

    var arrowBf = '<span class="arrow-bf"><</span>';
    var arrowAf = '<span class="arrow-af">></span>';

    this.$element.append(arrowBf);
    this.$element.append(arrowAf);

    $('.arrow-af').on('click', function() {
      _this.next();
    });
    $('.arrow-bf').on('click', function() {
      _this.pre();
    });
  };

  // TODO: add debounce
  Slider.prototype.resize = function() {
    var _this = this;
    var timer = null;
    $(window).on('resize', function() {
      console.log('11');
      if (timer) clearTimeout(timer);
      timer = setTimeout(_this.init(), 500);
      // debounce(_this.init, 500);
    });
  };

  // register as a jQuery plugin
  // TODO: add no conflict
  $.fn.slider = function(options) {
    var slider = new Slider(this, options);
    return slider;
  };

}(jQuery));
