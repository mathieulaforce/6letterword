import { describe, expect, it } from "vitest";
import WordBucketCollection from "./wordBucketCollection";

describe("wordBucketManager tests", () => {
  describe("constructor tests", () => {
    it("should create buckets of the correct size", () => {
      const bucketManager = new WordBucketCollection({ maxWordLength: 6 });
      const buckets = bucketManager.getBuckets();
      expect(buckets.size).toBe(6);
      expect(buckets.get(1)).toBeDefined();
      expect(buckets.get(2)).toBeDefined();
      expect(buckets.get(3)).toBeDefined();
      expect(buckets.get(4)).toBeDefined();
      expect(buckets.get(5)).toBeDefined();
      expect(buckets.get(6)).toBeDefined();
    });
  });

  describe("addWord tests", () => {
    it("should add a word to the correct bucket", () => {
      const bucketManager = new WordBucketCollection({ maxWordLength: 6 });
      bucketManager.addWord("cat");
      const bucket = bucketManager.getBucket(3);
      expect(bucket?.has("cat")).toBe(true);
    });

    it("should not add a word that is too long", () => {
      const bucketManager = new WordBucketCollection({ maxWordLength: 3 });
      bucketManager.addWord("catdog");
      const bucket = bucketManager.getBucket(6);
      expect(bucket).toBeUndefined();
    });

    it("should not add a word that is empty", () => {
      const bucketManager = new WordBucketCollection({ maxWordLength: 6 });
      bucketManager.addWord("");
      const bucket = bucketManager.getBucket(0);
      expect(bucket).toBeUndefined();
    });
  });

  describe("addLine tests", () => {
    it("should add a line of words to the correct buckets", () => {
      const bucketManager = new WordBucketCollection({ maxWordLength: 6 });
      bucketManager.addLine("cat dog");
      const bucket = bucketManager.getBucket(3);
      expect(bucket?.has("cat")).toBe(true);
      expect(bucket?.has("dog")).toBe(true);
    });

    it("should add a line of words to the correct buckets with punctuation", () => {
      const bucketManager = new WordBucketCollection({ maxWordLength: 6 });
      bucketManager.addLine("cat dog.");
      const bucketCat = bucketManager.getBucket(3);
      const bucketDog = bucketManager.getBucket(4);
      expect(bucketCat?.has("cat")).toBe(true);
      expect(bucketDog?.has("dog.")).toBe(true);
    });

    it("should add a line of words to the correct buckets with punctuation and spaces", () => {
      const bucketManager = new WordBucketCollection({ maxWordLength: 6 });
      bucketManager.addLine("cat, dog.");
      const bucket = bucketManager.getBucket(4);
      expect(bucket?.has("cat,")).toBe(true);
      expect(bucket?.has("dog.")).toBe(true);
    });
  });

  describe("addRawLines tests", () => {
    it("should add a line of words to the correct buckets with punctuation and spaces and new lines", () => {
      const bucketManager = new WordBucketCollection({ maxWordLength: 6 });
      bucketManager.addRawLines("cat,\n dog.");
      const bucket = bucketManager.getBucket(4);
      expect(bucket?.has("cat,")).toBe(true);
      expect(bucket?.has("dog.")).toBe(true);
    });

    it("should add a line of words to the correct buckets with punctuation and spaces and new lines and carriage returns", () => {
      const bucketManager = new WordBucketCollection({ maxWordLength: 6 });
      bucketManager.addRawLines("cat,\r\n dog.");
      const bucket = bucketManager.getBucket(4);
      expect(bucket?.has("cat,")).toBe(true);
      expect(bucket?.has("dog.")).toBe(true);
    });

    it("should add a line of words to the correct buckets with punctuation and spaces and new lines and carriage returns and tabs", () => {
      const bucketManager = new WordBucketCollection({ maxWordLength: 6 });
      bucketManager.addRawLines("cat,\r\n\t dog.");
      const bucket = bucketManager.getBucket(4);
      expect(bucket?.has("cat,")).toBe(true);
      expect(bucket?.has("dog.")).toBe(true);
    });

    it("should add a line of words to the correct buckets with punctuation and spaces and new lines and carriage returns and tabs and multiple spaces", () => {
      const bucketManager = new WordBucketCollection({ maxWordLength: 6 });
      bucketManager.addRawLines("cat,\r\n\t dog.  ");
      const bucket = bucketManager.getBucket(4);
      expect(bucket?.has("cat,")).toBe(true);
      expect(bucket?.has("dog.")).toBe(true);
    });
  });
});
