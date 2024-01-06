export interface WordBucketCollectionOptions {
  maxWordLength: number;
  onWordAddedToBucket?: ((word: string, bucketId: number) => void) | undefined;
}

class WordBucketCollection {
  private buckets: Map<number, Set<string>>;
  private options: WordBucketCollectionOptions;

  constructor(options: WordBucketCollectionOptions) {
    this.buckets = new Map();
    this.options = options;
    for (let i = 1; i <= this.options.maxWordLength; i++) {
      this.buckets.set(i, new Set());
    }
  }

  addRawLines(rawLines: string) {
    if(!rawLines){
      return;
    }
    const lines = rawLines.replace("\r\n", "\n").split("\n");
    this.addLines(lines);
  }

  addLines(lines: string[]) {
    if(!lines){
      return;
    }
    lines.forEach((line) => this.addLine(line));
  }

  addLine(line: string) {
    if(!line){
      return;
    }
    const words = line.trim().split(" ");
    this.addWords(words);
  }

  addWords(words: string[]) {
    words.forEach((word) => this.addWord(word));
  }

  addWord(word: string) {
    if (word.length > this.options.maxWordLength || word.length < 1) {
      // we have no use for words that are too long or too short
      return;
    }

    this.buckets.get(word.length)?.add(word);
    if (this.options.onWordAddedToBucket) {
      this.options.onWordAddedToBucket(word,word.length);
    }
  }

  getBucket(wordLength: number):ReadonlySet<string> | undefined {
    return this.buckets.get(wordLength);
  }

  getBuckets(): ReadonlyMap<number, Set<string>> {
    return this.buckets;
  }
}

export default WordBucketCollection;