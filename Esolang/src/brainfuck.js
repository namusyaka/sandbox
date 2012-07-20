function Brainfuck () {
  return (this instanceof Brainfuck) ? this.init() : new Brainfuck();
};

Brainfuck.prototype = {

  init : function () {
    this.memory  = [];
    this.buffer  = [];
    this.pointer = this.memory[0] = 0;

    return this;
  },

  run : function (code) {

    this.code = code;
    var commands = this.commands;

    for(this.pos = 0; this.pos < code.length;) {
      commands[code[this.pos]].call(this, null);
    }

    return this.buffer.join('');
  },

  commands : {
    '>' : function () {
      ++this.pointer;
      ++this.pos;
      if(!this.memory[this.pointer])
        this.memory[this.pointer] = 0;
    },

    '<' : function () {
      --this.pointer;
      ++this.pos;
      if(this.pointer < 0)
        throw('Error: Pointer received a negative number.');
    },

    '+' : function () { ++this.memory[this.pointer];++this.pos; },
    '-' : function () { --this.memory[this.pointer];++this.pos; },

    '.' : function () {
      this.buffer[this.buffer.length] = String.fromCharCode(this.memory[this.pointer]);
      ++this.pos;
    },

    ',' : function () {
      var str = window.prompt('plz, char');
      this.memory[this.pointer] = str ? str.charCodeAt(0) : 0;
      ++this.pos;
    },

    '[' : function () {
      if(this.memory[this.pointer] === 0) {
        var counter = 1;
        while(counter) {
          ++this.pos;
          var currentChar = this.code[this.pos];
          if(currentChar === '[') {
            ++counter;
          } else if(currentChar === ']') {
            --counter;
          }
        }
      }
      ++this.pos;
    },

    ']' : function () {
      if(this.memory[this.pointer] !== 0) {
        var counter = 1;
        while(counter) {
          --this.pos;
          var currentChar = this.code[this.pos];
          if(currentChar === '[') {
            --counter;
          } else if(currentChar === ']') {
            ++counter;
          }
        }
      } else
        ++this.pos;
    }
  }
};
