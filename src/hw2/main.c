#include <stdio.h>
#include "./ex2.h"

void test() {
   int arr[8] = {1, 1, 3, 4, 1, 1, 6, 7};
   int d;
   int dCtr;
   int *pD = &d;
   findDominant(arr, 8, &d, &dCtr);
   if (dCtr == 0) {
       printf("No dominant element!");
   } else {
       printf("Dominant is: %d, is counter for it is: %d", d, dCtr);
   }
}

int _main() {
   test();
   return 0;
}