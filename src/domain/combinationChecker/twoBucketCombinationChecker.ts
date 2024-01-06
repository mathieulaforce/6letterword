import WordBucketCollection from "../wordBucketCollection";
import { BucketCombinationChecker } from "./bucketCombinationChecker";

class TwoBucketCombinationChecker implements BucketCombinationChecker {
  private wordBucketCollection: WordBucketCollection;

  constructor(wordBucketCollection: WordBucketCollection) {
    this.wordBucketCollection = wordBucketCollection;
  }

  checkCombinations(onCombinationFound?: ((result: string, combinations: string[]) => void) | undefined): Map<string, string[][]> {
    const buckets = this.wordBucketCollection.getBuckets();
    const availableKeys = Array.from(buckets.keys()).sort();
    const biggestBucketNumber = availableKeys[availableKeys.length - 1];
    const wordsToCreate = this.wordBucketCollection.getBucket(biggestBucketNumber)!;
    const combinations = new Map<string, string[][]>();

    // we manualy check if the combination left + right and right + left is in the word list, this way we save some iterations
    for (let i = 1; i <= Math.floor(biggestBucketNumber / 2); i++) {
      
      const firstBucket = buckets.get(i);
      const secondBucket = buckets.get(biggestBucketNumber - i);
      const isSameBucket = i === biggestBucketNumber - i;

      if (firstBucket && secondBucket) {
        for(let firstBucketIndex = 0; firstBucketIndex < firstBucket.size; firstBucketIndex++){
          for(let secondBucketIndex = isSameBucket? firstBucketIndex + 1 : 0; secondBucketIndex < secondBucket.size; secondBucketIndex++){
            this.addCombinationWhenFound(Array.from(firstBucket)[firstBucketIndex], Array.from(secondBucket)[secondBucketIndex], wordsToCreate, combinations, onCombinationFound);
            this.addCombinationWhenFound(Array.from(secondBucket)[secondBucketIndex], Array.from(firstBucket)[firstBucketIndex], wordsToCreate, combinations, onCombinationFound);
          }
        }
      }
    }

    return combinations;
  }

  private addCombinationWhenFound(left: string, right: string, wordsToCreate: ReadonlySet<string>, combinations: Map<string, string[][]>, onCombinationFound: ((result: string, combinations: string[]) => void) | undefined) {
    const result = left + right;
    if (wordsToCreate.has(result)) {
      const combination = [left, right];
      const existingCombinations = combinations.get(result);
      if (existingCombinations) {
        existingCombinations.push(combination);
      } else {
        combinations.set(result, [combination]);
      }

      if (onCombinationFound) {
        onCombinationFound(result, combination);
      }
    }
  }
}

export default TwoBucketCombinationChecker;