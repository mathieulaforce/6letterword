import Reader from "./readers/reader";
import WordBucketCollection, {
  WordBucketCollectionOptions,
} from "./wordBucketCollection";

class WordBucketProcessor {
  private reader: Reader;
  private options: WordBucketCollectionOptions;

  constructor(reader: Reader, options: WordBucketCollectionOptions) {
    this.reader = reader;
    this.options = options;
  }

  async process(onLineRead?: ((line: string) => void) | undefined) {
    const wordBucketCollection = new WordBucketCollection(this.options);
    for await (const line of this.reader.read(onLineRead)) {
      wordBucketCollection.addLine(line);
    }
    return wordBucketCollection;
  }
}

export default WordBucketProcessor;
