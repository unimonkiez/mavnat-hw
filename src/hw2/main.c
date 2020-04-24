#include <stdio.h>
#include <stdlib.h>
#include "./ex2.h"

void test() {
   int arr[8] = {2, 1, 2, 2, 1, 2, 2, 1};
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

void getInputIntArrContent(int* arr, int length) {
    int numIndex;

    for(numIndex = 0; numIndex < length; numIndex++) {
        int inputValue;
        scanf("%d", &inputValue);
        arr[numIndex] = inputValue;
    }
}


void byInputFromUser() {
    int sizeOfArr;
    printf("Enter size:\n");
    scanf("%d", &sizeOfArr);
    int* arr = (int*) malloc(sizeOfArr * sizeof(int));
    printf("Enter numbers:\n");
    getInputIntArrContent(arr, sizeOfArr);
    
    int d;
    int dCtr;
    int *pD = &d;
    findDominant(arr, sizeOfArr, &d, &dCtr);
    if (dCtr == 0) {
        printf("No dominant element!");
    } else {
        printf("Dominant is: %d, is counter for it is: %d", d, dCtr);
    }
    free(arr);
}

int _main() {
   byInputFromUser();
   return 0;
}