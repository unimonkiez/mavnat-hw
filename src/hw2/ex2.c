#include <stdio.h>

void findDominant(int* pArr, int size, int* pDominant, int* pDominantCtr) {
   if (size == 1) {
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
         } else if (dominant1Ctr > dominant2Ctr) {
            int dominantCtrInLessArr = 0;
            for (int i = size1; i < size; i++) {
               int current = pArr[i];
               if (current == dominant1) {
                  dominantCtrInLessArr += 1;
               }
            }
            *pDominant = dominant1;
            *pDominantCtr = dominant1Ctr + dominantCtrInLessArr;
         } else {
            int dominantCtrInLessArr = 0;
            for (int i = 0; i < size1; i++) {
               int current = pArr[i];
               if (current == dominant1) {
                  dominantCtrInLessArr += 1;
               }
            }
            *pDominant = dominant2;
            *pDominantCtr = dominant2Ctr + dominantCtrInLessArr;
         }
      }
   }
}
