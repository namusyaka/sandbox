var SubHTMLCollection = function (collection) {
  this.collection = [];
  for(var i = 0, element; element = collection[i]; ++i)
    this.collection.push(element);
  return this;
};

SubHTMLCollection.prototype = {
  each : function (callback) {
    for(var i = 0, element; element = this.collection[i]; ++i)
      callback.call(this, element, i);
  },

  reverseEach : function (callback) {
    for(var i = this.collection.length - 1, element; element = this.collection[i]; --i)
      callback.call(this, element, i);
  }
};
