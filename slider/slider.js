'use strict';

/**
 * Slider --
 * Author: LWXYFER
 * Following amazeui rules
 */

var Slider = function(element, options) {

  this.$element = $(element);

  // simplify html structure
  this.$element.html('<div class="slider-con">' + this.$element.html() + '</div>');

  // users has other names
  this.$element.addClass('slider');

  this.$con = $('.slider-con');
  this.$child = this.$con.children();

  this.options = $.extend({}, Slider.DEFAULTS, options);

  // Reference: debounce & throttle
  this.status = true;

  this.init();
  this.resize();
}

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
  callback: null, // after every move
}

Slider.prototype.init = function() {

  var $element = this.$element;
  var $child = this.$child;
  var $con = this.$con;
  var options = this.options;

  $element.css('width', options.width);
  this.width = $element.width(); // if use percentage, need get real width
  this.length = $child.length;

  console.log('width', this.width)

  this.$allWidth = this.width*$child.length;
  this.$fullWidth = this.width*($child.length+1);
  this.$numWidth = this.width*($child.length-1);

  // cant use percentage
  $child.css('width', this.width)
  $element.css('height', options.height);

  $con.css('width', (this.$fullWidth).toString() );

  // infinitescroll
  $con.append($con.children().eq(0).clone());
  $con.prepend($con.children().eq(this.length-1).clone());

  $con.css('left', -this.width);

  if(options.keyboard) {
    this.keyboard();
  }
  if(options.autoplay) {
    this.autoplay();
  }
  if(options.arrow) {
    this.arrow();
  }
  if(options.dots) {
    this.dots();
  }
}

Slider.prototype.destory = function() {
  // clear css
  // clear event
}

// 数字 字符串 连接
// 动画优化， 考虑使用 JS 动画
// throttle；   debounce 完成确定
// left，  margin-left，  transform 哪个好
Slider.prototype.move = function(distance) {
  var _this = this;

  // not infinite scroll
  if( !_this.infinite ) {
    if(_this.index === _this.length) {
      return false;
    }
  }

  if( _this.status ) {
    (function() {
      _this.status = !_this.status;

      _this.$con.animate({
        left: '-=' + distance,
      }, _this.options.speed, function() {

        console.log('ok');
        _this.status = !_this.status;

        if(_this.index() === _this.length) {
          _this.$con.css('left', -_this.width);
          console.log('change')
        }
        if(_this.index() === -1) {
          _this.$con.css('left', -_this.$allWidth);
          console.log('change')
        }

        _this.dotActive();
      })
    }());
  }
  return true;
}

Slider.prototype.next = function() {
  var _this = this;
  return this.move(_this.width);
}

Slider.prototype.pre = function() {
  var _this = this;
  this.move(-_this.width);
}

Slider.prototype.keyboard = function() {
  var _this = this;
  $('body').on('keydown', function(e) {
    var which = e.which;
    if( which === 37 || which === 38) {
      _this.pre();
    } else if( which === 39 || which === 40) {
      _this.next();
    }
  })
}

Slider.prototype.index = function() {
  // var _this = this;
  var ml = Number(this.$con.css('left').slice(0,-2));
  var w = this.width;
  var i = Math.abs(-ml/w) - 1;
  return i;
}

Slider.prototype.autoplay = function() {
  var _this = this;
  var timer = setInterval(function() {
    var x = _this.next();

    if(!x) {
      clearTimeout(timer)
    }
  }, _this.options.autoplaySpeed)
}

Slider.prototype.hoverStop = function() {
// mouse over stop
// mouse out start
}

Slider.prototype.dots = function() {
  var dotsTem = '<div class="dots">';
  var dotTem = '<span class="dot"></span>';

  for(var i=0; i< this.length; i++) {
    dotsTem += dotTem;
  }

  dotsTem += '</div>';

  this.$element.append(dotsTem);
  this.dotActive();
  this.dotMove()
}

Slider.prototype.dotActive = function() {
  var i = this.index();
  console.log('current index', i);

  $('.dots .dot').removeClass('active');
  $('.dots .dot ').eq(i).addClass('active');
}

Slider.prototype.dotMove = function() {
  var _this = this;

  $('.dot').on('click', function() {
    var self = this;
    var i = _this.index();

    console.log('dot distance', ($(self).index() - i) * _this.width);

    _this.move( ($(self).index() - i) * _this.width )
  })

}

Slider.prototype.arrow = function() {
  var _this = this;

  var arrowBf = '<span class="arrow-bf"><</span>';
  var arrowAf = '<span class="arrow-af">></span>';

  this.$element.append(arrowBf);
  this.$element.append(arrowAf);

  $('.arrow-af').on('click', function() {
    _this.next();
  })
  $('.arrow-bf').on('click', function() {
    _this.pre();
  })
}

Slider.prototype.resize = function() {
  var _this = this;
  $(window).on('resize', function() {
    console.log('11')
    _this.init();
  })
}

// var aaa = new slider('slider',{
//   width: 800,
//   height: 500,
// });
// $('#pre').click( function() {
//   aaa.pre()
// });
// $('#next').click( function() {
//   aaa.next()
// } );


// register as a jQuery plugin
// no conflict
$.fn.slider = function( options) {
  var slider = new Slider(this, options);
  return slider;
}

var aa = $('.slider').slider({
  width: '100%',
  height: 500,
  // autoplay: true,
})
