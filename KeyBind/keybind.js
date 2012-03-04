/* take no thought of IE. */

function KeyBind () {
  return (this instanceof KeyBind) ? this.init() : new KeyBind();
};

KeyBind.KEY_SHIFT = 16;
KeyBind.KEY_CONTROL = 17;
KeyBind.KEY_ALT = 18;

(function (proto) {

  proto.init = function () {

    this.stream = [];
    this.display = window;

  };

  proto.extend = function (keybind_object, opt_permit_overload) {
    var keyEventMethods = this.keyEventMethods
    ,   subKeyEventMethods = this.subKeyEventMethods;

    if(opt_permit_overload) {
      for(var keyCode in keybind_object) {
        if(keyCode.indexOf('<Ctrl>') !== -1)
          subKeyEventMethods.ctrl[keyCode.replace(/(<Ctrl>)/g, '')] = keybind_object[keyCode];
        else if(keyCode.indexOf('<Shift>') !== -1)
          subKeyEventMethods.shift[keyCode.replace(/(<Shift>)/g, '')] = keybind_object[keyCode];
        else if(keyCode.indexOf('<Alt>') !== -1)
          subKeyEventMethods.alt[keyCode.replace(/(<Alt>)/g, '')] = keybind_object[keyCode];
        else
          keyEventMethods[keyCode] = keybind_object[keyCode];
      };
    } else {
      for(var keyCode in keybind_object) {

        var codeIndex = keyCode.replace(/(<Ctrl>|<Shift>|<Alt>)/g, '');

        if(keyCode.indexOf('<Ctrl>') !== -1) {
          if(!subKeyEventMethods.ctrl[codeIndex])
            subKeyEventMethods.ctrl[codeIndex] = keybind_object[keyCode];
        } else if(keyCode.indexOf('<Shift>') !== -1) {
          if(!subKeyEventMethods.shift[codeIndex])
            subKeyEventMethods.shift[codeIndex] = keybind_object[keyCode];
        } else if(keyCode.indexOf('<Alt>') !== -1) {
          if(!subKeyEventMethods.alt[codeIndex])
            subKeyEventMethods.alt[codeIndex] = keybind_object[keyCode];
        } else
          keyEventMethods[keyCode] = keybind_object[keyCode];
      };
    };
  };

  proto.replaceKeywords = function (all, match) {
    switch(match) {
      case '<Ctrl>':
        return KeyBind.KEY_CONTROL;
      case '<Shift>':
        return KeyBind.KEY_SHIFT;
      case '<Alt>':
        return KeyBind.KEY_ALT;
    };
  };

  proto.run = function () {

    this.defineEventHandler();

  };

  proto.defineEventHandler = function (key_event) {
    this.display[key_event || 'onkeydown'] = this.keyEvent.bind(this);
  };

  proto.keyEvent = function (e) {

    var _event = e || event
    ,   keyCode = _event.charCode || _event.keyCode
    ,   command = this.stream.join('');

    // Debug code.
    //var ul = document.getElementsByTagName('ul')[0];
    //ul.appendChild(document.createElement('li')).appendChild(document.createTextNode(keyCode));

    this.stream[this.stream.length] = keyCode;


    if(_event.shiftKey && !(keyCode === KeyBind.KEY_SHIFT) && this.subKeyEventMethods.shift[keyCode])
      return proto.subKeyEventMethods.shift[keyCode].bind(this)(_event);

    if(_event.ctrlKey && !(keyCode === KeyBind.KEY_CONTROL) && this.subKeyEventMethods.ctrl[keyCode])
      return proto.subKeyEventMethods.ctrl[keyCode].bind(this)(_event);

    if(_event.altKey && !(keyCode === KeyBind.KEY_ALT) && this.subKeyEventMethods.alt[keyCode])
      return proto.subKeyEventMethods.alt[keyCode].bind(this)(_event);

    if(this.keyEventMethods[keyCode])
      return this.keyEventMethods[keyCode].bind(this)(_event);
    else
      return this.keyEventMethods.default.call(this, _event, keyCode);

    _event.preventDefault();
    _event.returnvalue = false;
    return false;
  };

  proto.keyEventMethods = {};

  proto.subKeyEventMethods = {
    shift : {
    },
    ctrl : {
    },
    alt : {},
  };

})(KeyBind.prototype);
