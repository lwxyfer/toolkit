'use strict';

var Slider = function(element, options) {
  console.log(element)
  this.$slider = $(element);
  console.log(this.$slider)
  this.$con = $('.slider-con');
  this.options = $.extend({}, Slider.DEFAULTS, options);
  this.$width = this.$slider.width();
  this.$number = this.$con.children();
  this.$length = this.$number.length;
  this.$allWidth = this.$width*this.$number.length;
  this.$numWidth = this.$width*(this.$number.length-1);
  this.$con.css('width', (this.$allWidth).toString() );
  this.$slider.css('height', this.options.height)
  this.$slider.css('width', this.options.width)
  this.status = true;
  if(this.options.keyboard) {
    this.keyboard();
  }
  if(this.options.autoplay) {
    this.autoplay();
  }
  if(this.options.arrow) {
    this.arrow();
  }
  if(this.options.dots) {
    this.dots();
  }
}

Slider.DEFAULTS = {
  width: '100%',
  height: 'auto',
  speed: 200,
  loop: true,
  autoplay: false,
  autoplaySpeed: 1000,
  arrow: true,
  dots: true,
  keyboard: true,
}

Slider.prototype.destory = function() {
  // clear css
  // clear event
}

// 数字 字符串 连接
Slider.prototype.move = function(distance) {
  var _this = this;
  var ml = Number(this.$con.css('marginLeft').slice(0,-2));
  console.log('margin: %s, distance: %s',ml, distance);
  if( (ml === 0 && distance < 0) || (ml === -this.$numWidth && distance >0))  {
    return false;
  }
  if( _this.status ) {
    (function() {
      _this.status = !_this.status;
      _this.$con.animate({
        marginLeft: '-=' + distance,
      }, _this.options.speed, () => {
        console.log('ok');
        _this.status = !_this.status;
        $('.dots .dot ').each(function() {
          $(this).removeClass('active')
        })
        _this.dotActive();
      })
    }());
  }
  return true;
}

Slider.prototype.next = function() {
  var _this = this;
  return this.move(_this.$width);
}

Slider.prototype.pre = function() {
  var _this = this;
  this.move(-_this.$width);
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

Slider.prototype.isOver = function() {
  var ml = this.$con.css('marginLeft');
  console.log(ml);
  if( ml > 0 || -ml > this.$allWidth - this.$width) {
    return true;
  }
}

Slider.prototype.autoplay = function() {
  var _this = this;
  var timer = setInterval(function() {
    var x = _this.next()
    console.log(x)
    if(!x) {
      clearTimeout(timer)
    }
  }, _this.options.autoplaySpeed)
}

Slider.prototype.dots = function() {
  var dotsTem = '<div class="dots">';
  var dotTem = '<span class="dot"></span>';
  for(var i=0; i< this.$length; i++) {
    dotsTem += dotTem;
  }
  dotsTem += '</div>'
  this.$slider.append(dotsTem);
  this.dotActive();
  this.dotMove()
}

Slider.prototype.dotActive = function() {
  var _this = this;
  var ml = Number(_this.$con.css('marginLeft').slice(0,-2));
  var w = _this.$width;
  var i = Math.abs(-ml/w);
  console.log('current index', i);
  $('.dots .dot ').eq(i).addClass('active');
}

Slider.prototype.dotIndex = function() {
  var _this = this;
  var ml = Number(_this.$con.css('marginLeft').slice(0,-2));
  var w = _this.$width;
  var i = Math.abs(-ml/w);
  return i;
}

Slider.prototype.dotMove = function() {
  var _this = this;

  $('.dot').on('click', function() {
    var self = this;
    var i = _this.dotIndex();
    console.log('dot distance', ($(self).index() - i) * _this.$width)
    _this.move( ($(self).index() - i) * _this.$width )
  })
}

Slider.prototype.arrow = function() {
  var _this = this;
  var arrowBf = '<span class="arrow-bf"><</span>';
  var arrowAf = '<span class="arrow-af">></span>';
  this.$slider.append(arrowBf);
  this.$slider.append(arrowAf);
  $('.arrow-af').on('click', function() {
    _this.next();
  })
  $('.arrow-bf').on('click', function() {
    _this.pre();
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
  width: 800,
  height: 500,
})
