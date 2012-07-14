var Foo = function (element, course) {
  this.element = element;
  this.course = course;

  return this;
};

Foo.TIME  = 5;
Foo.MAX_X = (function () { return window.innerWidth || (document.documentElement.clientWidth || document.body.clientWidth); })() - 100;
Foo.MAX_Y = (function () { return window.innerHeight || (document.documentElement.clientHeight || document.body.clientHeight); })() - 100;
Foo.DEFAULT_POS_Y = Foo.MAX_Y / 2;
Foo.DEFAULT_POS_X = Foo.MAX_X / 2;
Foo.COLORS = ['#F00', '#FFB74C', '#FFD400', '#008000', '#0067C0', '#234794', '#A757A8'];
Foo.RANDOM_COURSES = ['top', 'bottom', 'left', 'right'];

// Example code.
Foo.colorTheater = function () {

  var objSize = { width : 70, height : 70};
  var x = Math.floor(Foo.MAX_Y / objSize.height);

  function appendStyle (target, style) {
    var targetStyle = target.style;

    for(var attr in style) {
      targetStyle[attr] = style[attr];
    }

    return target;
  };

  for(var i = 0; i < x; ++i) {
    var obj = document.createElement('div');

    document.body.appendChild(appendStyle(obj, {
      position        : 'absolute',
      opacity         : '0.5',
      top             : (i * 100).toString() + 'px',
      left            : Foo.DEFAULT_POS_X.toString() + 'px',
      width           : objSize.width.toString() + 'px',
      height          : objSize.height.toString() + 'px',
      borderRadius    : (i * 6).toString() + 'px',
      backgroundColor : Foo.COLORS[i]
    }));

    var n = i % 2 ? 'top' : 'bottom';//Foo.RANDOM_COURSES[Math.floor(Math.random() * 4)];

    (new Foo(obj, n)).play();
  };
};

(function (proto) {
  proto.play = function () {

    this.mover.call(this.element, this.course);
    this.element.movers = this.movers;

    return;
  };

  proto.mover = function (course) {
    var self = this;
    self.isCourse = course;
    self.timer = setInterval(function () {
      self.movers[self.isCourse].call(self);
    }, Foo.TIME);
  };

  proto.movers = {
    top : function () {
      var pos = parseInt(this.style.top);

      if(isNaN(pos)) {
        this.style.top = (Foo.DEFAULT_POS_Y - 1).toString() + 'px';
        return;
      }

      if(pos <= 0) {
        this.isCourse = 'bottom';
      } else {
        this.style.top = (pos - 1).toString() + 'px';
      }
    },

    left : function () {
      var pos = parseInt(this.style.left);

      if(isNaN(pos)) {
        this.style.left = (Foo.DEFAULT_POS_X - 1).toString() + 'px';
        return;
      }

      if(pos <= 0) {
        this.isCourse = 'right';
      } else {
        this.style.left = (pos - 1).toString() + 'px';
      }
    },

    right : function () {
      var pos = parseInt(this.style.left) || 0;

      if(isNaN(pos)) {
        this.style.left = (Foo.DEFAULT_POS_X + 1).toString() + 'px';
        return;
      }

      if(pos >= Foo.MAX_X) {
        this.isCourse = 'left';
      } else {
        this.style.left = (pos + 1).toString() + 'px';
      }
    },

    bottom : function () {
      var pos = parseInt(this.style.top);

      if(isNaN(pos)) {
        this.style.top = (Foo.DEFAULT_POS_Y + 1).toString() + 'px';
        return;
      }

      if(pos >= Foo.MAX_Y) {
        this.isCourse = 'top';
      } else {
        this.style.top = (pos + 1).toString() + 'px';
      }
    }
  };

})(Foo.prototype);

