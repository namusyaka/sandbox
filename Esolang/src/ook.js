function Ook () {
  return (this instanceof Ook) ? this.init() : new Ook();
};

Ook.prototype = new Brainfuck();

(function (proto) {

  proto.commands = {
    'Ook. Ook?' : function () {
      ++this.pointer;
      this.pos += 9;
      if(!this.memory[this.pointer])
        this.memory[this.pointer] = 0;
    },

    'Ook? Ook.' : function () {
      --this.pointer;
      this.pos += 9;
      if(this.pointer < 0)
        throw('Error: Pointer received a negative number.');
    },

    'Ook. Ook.' : function () {
      ++this.memory[this.pointer];
      this.pos += 9;
    },

    'Ook! Ook!' : function () {
      --this.memory[this.pointer];
      this.pos += 9;
    },

    'Ook. Ook!' : function () {
      var str = window.prompt('plz, char');
      this.memory[this.pointer] = str ? str[0] : 0;
      this.pos += 9;
    },

    'Ook! Ook.' : function () {
      this.buffer[this.buffer.length] = String.fromCharCode(this.memory[this.pointer]);
      this.pos += 9;
    },

    'Ook! Ook?' : function () {
      if(this.memory[this.pointer] === 0) {
        var counter = 1;
        while(counter) {
          this.pos += 9;
          var currentChar = this.code.substr(this.pos, 9);
          if(currentChar === 'Ook! Ook?') {
            ++counter;
          } else if(currentChar === 'Ook? Ook!') {
            --counter;
          }
        }
      }
      this.pos += 9;
    },

    'Ook? Ook!' : function () {
      if(this.memory[this.pointer] !== 0) {
        var counter = 1;
        --this.pos;
        while(counter) {
          this.pos = (--this.pos) - 9;
          var currentChar = this.code.substr(this.pos, 9);
          if(currentChar === 'Ook! Ook?') {
            --counter;
          } else if(currentChar === 'Ook? Ook!') {
            ++counter;
          }
        }
      } else
        this.pos += 9;
    }
  }

  proto.run = function (code) {

    this.code = code;
    var commands = this.commands;

    for(this.pos = 0; this.pos < code.length;) {
      commands[code.substr(this.pos++, 9)].call(this, null);
    }

    return this.buffer.join('');
  };

})(Ook.prototype);
