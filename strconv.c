#include <stdio.h>
#include <string.h>
#include <stdlib.h>

void encode(char *target, char *str) {
    
    char *result = malloc(strlen(target) * 8 + 1);
    
    if(result) {
        
        int b, sum;
        
        for(sum = 0; *target; *target++)
            for(b = 1; b <= 128; b <<= 1)
                result[sum++] = str[*target & b ? 1 : 0];
        
        result[sum] = 0;
        printf("%s", result);
        free(result);
    }
}

void decode(char *target, char *str) {
    
    int l = strlen(target);
    
    if(l & 7)
        return;
    
    int sum = l >> 3;
    char *result = malloc(sum + 1);

    if(result) {
        
        int i, j, b;
        
        for(j = 0; j < sum; j++){
            for(i = 7, b = 0; i >= 0; i--)
                if(target[i] - str[0])
                    b |= (1 << i);
            
            target += 8;
            result[j] = b;
        }
        
        result[sum] = 0;
        printf("%s", result);
        free(result);
        
    }
    
}

int main(int argc, char *argv[]) {
    
    int sum = 0;
    
    if(argc > 3) {
        if(*argv[1] == '-' && strlen(argv[3]) == 2) {
            switch(argv[1][1]) {
                case 'e':
                    encode(argv[2], argv[3]);
                    break;
                case 'd':
                    decode(argv[2], argv[3]);
                    break;
            }
        }
    }
    
    return 0;
}
