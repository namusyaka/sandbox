function Monamona () {
  return (this instanceof Monamona) ? this.init() : new Monamona();
};

Monamona.prototype = new Brainfuck();

(function (proto) {

  var commands = proto.commands;

  commands['M'] = commands['>'];
  commands['O'] = commands['<'];
  commands['N'] = commands['+'];
  commands['A'] = commands['-'];
  commands['m'] = commands[','];
  commands['o'] = commands['.'];

  commands['n'] = function () {
    if(this.memory[this.pointer] === 0) {
      var counter = 1;
      while(counter) {
        ++this.pos;
        var currentChar = this.code[this.pos];
        if(currentChar === 'n') {
          ++counter;
        } else if(currentChar === 'a') {
          --counter;
        }
      }
    }
    ++this.pos;
  };

  commands['a'] = function () {
    if(this.memory[this.pointer] !== 0) {
      var counter = 1;
      while(counter) {
        --this.pos;
        var currentChar = this.code[this.pos];
        if(currentChar === 'n') {
          --counter;
        } else if(currentChar === 'a') {
          ++counter;
        }
      }
    } else
      ++this.pos;
  };

})(Monamona.prototype);
