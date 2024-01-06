import { describe, expect, it } from "vitest";
import TwoBucketCombinationChecker from "./twoBucketCombinationChecker";
import WordBucketCollection from "../wordBucketCollection";

describe("TwoBucketCombinactionChecker tests", () => {
  it("should return empty combinations when no words are added", () => {
    const collection = new WordBucketCollection({ maxWordLength: 6 });
    const combinationChecker = new TwoBucketCombinationChecker(collection);
    const combinations = combinationChecker.checkCombinations();
    expect(combinations.size).toBe(0);
  });

  it("should return empty combinations when no match is possible", () => {
    const collection = new WordBucketCollection({ maxWordLength: 6 });
    collection.addWord("cat");
    collection.addWord("dog");
    collection.addWord("abcdef");
    const combinationChecker = new TwoBucketCombinationChecker(collection);
    const combinations = combinationChecker.checkCombinations();
    expect(combinations.size).toBe(0);
  });

 it("should return combinations when a match is possible", () => {
    const collection = new WordBucketCollection({ maxWordLength: 6 });
    collection.addWord("cat");
    collection.addWord("dog");
    collection.addWord("catdog");
    const combinationChecker = new TwoBucketCombinationChecker(collection);
    const combinations = combinationChecker.checkCombinations();
    expect(combinations.size).toBe(1);
    expect(combinations.get("catdog")?.length).toBe(1);
    expect(combinations.get("catdog")?.[0]).toEqual(["cat", "dog"]);
  }); 

  it("should return 2 combinations when 2 matches are possible", () => {
    const collection = new WordBucketCollection({ maxWordLength: 6 });
    collection.addWord("cat");
    collection.addWord("dog");
    collection.addWord("catdog");
    collection.addWord("dogcat");
    const combinationChecker = new TwoBucketCombinationChecker(collection);
    const combinations = combinationChecker.checkCombinations();
    expect(combinations.size).toBe(2);
    expect(combinations.get("catdog")?.length).toBe(1);
    expect(combinations.get("catdog")?.[0]).toEqual(["cat", "dog"]);
    expect(combinations.get("dogcat")?.length).toBe(1);
    expect(combinations.get("dogcat")?.[0]).toEqual(["dog", "cat"]);
  });

});
