#include <ruby.h>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

VALUE cSuconv;

static VALUE suconv_s_encode(int argc, VALUE *argv, VALUE klass) {

  char *str    = StringValuePtr(argv[0]);
  char *target = StringValuePtr(argv[1]);
  char *result = ruby_xmalloc(strlen(target) * 8 + 1);
  int b, sum;
  VALUE encoded_str;

  for(sum = 0; *target; *target++)
    for(b = 1; b <= 128; b <<= 1)
      result[sum++] = str[*target & b ? 1 : 0];

  result[sum] = 0;
  encoded_str = rb_str_new2(result);

  ruby_xfree(result);

  return encoded_str;
}

static VALUE suconv_s_decode(int argc, VALUE *argv, VALUE klass) {

  char *str    = StringValuePtr(argv[0]);
  char *target = StringValuePtr(argv[1]);
  int length   = strlen(target);

  if(length & 7)
    return Qnil;

  int sum = length >> 3;
  char *result = ruby_xmalloc(sum + 1);
  VALUE decoded_str;

  int i, j, b;
  for(j = 0; j < sum; j++) {
    for(i = 7, b = 0; i >= 0; i--)
      if(target[i] - str[0])
        b |= (1 << i);
    target += 8;
    result[j] = b;
  }

  result[sum] = 0;
  decoded_str = rb_str_new2(result);

  ruby_xfree(result);

  return decoded_str;
}

void Init_Suconv(void) {
  cSuconv = rb_define_module("Suconv");
  rb_define_module_function(cSuconv, "encode", suconv_s_encode, -1);
  rb_define_module_function(cSuconv, "decode", suconv_s_decode, -1);
}
