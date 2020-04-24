#include <stdio.h>

void findDominant(int* pArr, int size, int* pDominant, int* pDominantCtr) {
   if (size == 0) {
      *pDominantCtr = 0;
   } else if (size == 1) {
      *pDominant = pArr[0];
      *pDominantCtr = 1;
   } else {
      int size1 = (size / 2) + (size % 2);
      int dominant1;
      int dominant1Ctr;
      int size2 = (size / 2);
      int dominant2;
      int dominant2Ctr;
      findDominant(pArr, size1, &dominant1, &dominant1Ctr);
      findDominant(pArr + size1, size2, &dominant2, &dominant2Ctr);

      if (dominant1 == dominant2 && dominant1Ctr != 0 && dominant2Ctr != 0) {
         *pDominant = dominant1;
         *pDominantCtr = dominant1Ctr + dominant2Ctr;
      } else {
         if (dominant1Ctr == dominant2Ctr) {
            // No dominant
            *pDominantCtr = 0;
         } else {
            int dominantCtr = 0;
            int dominantCtrInLessArr = 0;
            int i;
            int maxI;

            if (dominant1Ctr > dominant2Ctr) {
               *pDominant = dominant1;
               dominantCtr = dominant1Ctr;
               i = size1;
               maxI = size;
            } else {
               *pDominant = dominant2;
               dominantCtr = dominant2Ctr;
               i = 0;
               maxI = size1;
            }

            for (; i < maxI; i++) {
               int current = pArr[i];
               if (current == *pDominant) {
                  dominantCtrInLessArr += 1;
               }
            }

            dominantCtr += dominantCtrInLessArr;
            if (dominantCtr <= (size / 2)) {
               *pDominantCtr = 0;
            } else {
               *pDominantCtr = dominantCtr;
            }
         }
      }
   }
}
