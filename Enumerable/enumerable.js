(function (global) {

  var Enumerable = function (data) {
    return (this instanceof Enumerable) ? this.init(data) : new Enumerable(data);
  };

  Enumerable.prototype = {
    init : function (data) {
      if(data instanceof Array) {
        this._items = data;
      } else if('length' in data) {
        this._items = [];
        for(var i = 0; i < data.length; ++i)
          this._items.push(data[i]);
      } else if(data instanceof Object) {
        this._items = data;
        this.isObject = true;
      } else {
        throw('error');
      }
      return this;
    },

    each : function (callback, _self) {
      if(this.isObject) {
        var i = 0;
        for(var key in this._items) {
          callback.call(_self || this, key, this._items[key], i);
          ++i;
        }
      } else {
        for(var i = 0; i < this._items.length; ++i)
          callback.call(_self || this, this._items[i], i);
      }

      return this;
    },

    // This is slowly.
    reverseEach : function (callback, _self) {
      if(this.isObject) {
        var i = 0;
        var result = [];

        for(var key in this._items) {
          result[i] = {};
          result[i][key] = this._items[key];
          ++i;
        }

        for(var i = result.length - 1; i >= 0; --i)
          for(var key in result[i])
            callback.call(_self || this, key, result[i][key], i);
      } else
        for(var i = this._items.length - 1; i >= 0; --i)
          callback.call(_self || this, this._items[i], i);

      return this;
    },

    map : function (callback, _self) {
      var result = [];
      if(this.isObject) {
        for(var key in this._items) {
         result.push(callback.call(_self || this, key, this._items[key], i));
          ++i;
        }
      } else {
        var result = [];
        for(var i = 0; i < this._items.length; ++i)
          result.push(callback.call(_self || this, this._items[i], i));
      }
      return result;
    },

    map$ : function (callback, _self) {
      if(this.isObject) {
        result = [];
        for(var key in this._items) {
         result.push(callback.call(_self || this, key, this._items[key], i));
          ++i;
        }
        this._items = result;
        this.isObject = false;
      } else
        for(var i = 0; i < this._items.length; ++i)
          this._items[i] = callback.call(_self || this, this._items[i], i);

      return this._items;
    },

    count : function () {
      if(this.isObject) {
        var i = 0;
        for(var key in this._items)
          ++i;
        return i;
      } else
        return this._items.length;
    },

    toString : function () {
      return '[object Enumerable]';
    },

    all : function () {
      var flag = true;
      if(this.isObject) {
        this.each(function (key, value) {
          if(!value)
            flag = false;
        });
      } else {
        this.each(function (item) {
          if(!item)
            flag = false;
        });
      }
      return flag;
    },

    any : function () {
      var flag = true;
      if(this.isObject) {
        this.each(function (key, value) {
          if(value)
            flag = false;
        });
      } else {
        this.each(function (item) {
          if(item)
            flag = false;
        });
      }
      return flag;
    }
    
  };

  global.Enumerable = Enumerable;

  en = Enumerable([1,2,3,4]);
  console.log(en.any());
  console.log(en.all());

  en2 = Enumerable({ a : "b", c : false });
  console.log(en2.any());
  console.log(en2.all());
})(this);
