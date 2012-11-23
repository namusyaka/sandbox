(function (global) {

  function Klass (name, member) {
    var args;
    var _self = global[name] = function () {
      if (this instanceof _self) {
        args = args || arguments;
        var ret = this.init.apply(this, args);
        args = void 0;
        return ret;
      } else {
        args = arguments;
        return new _self();
      }
    };
    global[name].prototype = member;
  }

})(this);
