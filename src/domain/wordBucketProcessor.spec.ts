import { describe, expect, it } from "vitest";
import WordBucketProcessorBuilder from "./wordBucketProcessorBuilder";

describe("wordBucketProcessor tests", () => {
  it("should return empty buckets after processing", async () => {
    const bucketProcessor = WordBucketProcessorBuilder.create()
      .withBucketCollectionOptions({ maxWordLength: 6 })
      .withClearText("")
      .build();
    const buckets = (await bucketProcessor.process()).getBuckets();
    expect(buckets.size).toBe(6);
    expect(buckets.get(1)).toBeDefined();
    expect(buckets.get(2)).toBeDefined();
    expect(buckets.get(3)).toBeDefined();
    expect(buckets.get(4)).toBeDefined();
    expect(buckets.get(5)).toBeDefined();
    expect(buckets.get(6)).toBeDefined();
  });

  it("should return bucket with words after processing clear text", async () => {
    const bucketProcessor = WordBucketProcessorBuilder.create()
      .withBucketCollectionOptions({ maxWordLength: 6 })
      .withClearText("cat\ndog")
      .build();
    const buckets = (await bucketProcessor.process()).getBuckets();
    expect(buckets.get(3)?.has("cat")).toBe(true);
    expect(buckets.get(3)?.has("dog")).toBe(true);
  });

  it("should return bucket with words after processing clear text", async () => {
    const bucketProcessor = WordBucketProcessorBuilder.create()
      .withBucketCollectionOptions({ maxWordLength: 6 })
      .withClearText("cat dog")
      .build();
    const buckets = (await bucketProcessor.process()).getBuckets();
    expect(buckets.get(3)?.has("cat")).toBe(true);
    expect(buckets.get(3)?.has("dog")).toBe(true);
  });

  it("should return bucket with words after processing string array", async () => {
    const bucketProcessor = WordBucketProcessorBuilder.create()
      .withBucketCollectionOptions({ maxWordLength: 6 })
      .withClearStringArray(["cat", "dog"])
      .build();
    const buckets = (await bucketProcessor.process()).getBuckets();
    expect(buckets.get(3)?.has("cat")).toBe(true);
    expect(buckets.get(3)?.has("dog")).toBe(true);
  });

  it("should return bucket with words after processing string array", async () => {
    const bucketProcessor = WordBucketProcessorBuilder.create()
      .withBucketCollectionOptions({ maxWordLength: 6 })
      .withClearStringArray(["cat dog"])
      .build();
    const buckets = (await bucketProcessor.process()).getBuckets();
    expect(buckets.get(3)?.has("cat")).toBe(true);
    expect(buckets.get(3)?.has("dog")).toBe(true);
  });

  it("should call onLineRead when processing clear text", async () => {
    let linesRead = 0;
    const bucketProcessor = WordBucketProcessorBuilder.create()
      .withBucketCollectionOptions({ maxWordLength: 6 })
      .withClearText("cat\ndog")
      .build();
    await bucketProcessor.process(() => {
      linesRead++;
    });
    expect(linesRead).toBe(2);
  });

  it("should call onLineRead when processing string array", async () => {
    let linesRead = 0;
    const bucketProcessor = WordBucketProcessorBuilder.create()
      .withBucketCollectionOptions({ maxWordLength: 6 })
      .withClearStringArray(["cat", "dog"])
      .build();
    await bucketProcessor.process(() => {
      linesRead++;
    });
    expect(linesRead).toBe(2);
  });
});
