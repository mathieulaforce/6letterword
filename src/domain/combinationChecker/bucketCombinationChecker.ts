export interface BucketCombinationChecker {
  checkCombinations(onCombinationFound?: ((result: string, combinations: string[] ) => void) | undefined ): Map<string,string[][]>;
}
export default BucketCombinationChecker;