import ClearStringArrayReader from "./readers/clearStringArrayReader";
import ClearTextReader from "./readers/clearTextReader";
import ExternalTextReader from "./readers/externalTextReader";
import Reader from "./readers/reader";
import StreamReader from "./readers/streamReader";
import { WordBucketCollectionOptions } from "./wordBucketCollection";
import WordBucketProcessor from "./wordBucketProcessor";

interface IWordBucketProcessorOptionsBuilder {
  withBucketCollectionOptions(options: WordBucketCollectionOptions): IWordBucketProcessorReaderBuilder;
}

interface IWordBucketProcessorReaderBuilder {
  withClearText(text: string): IWordBucketProcessorBuilder;
  withUrlOfTextFile(url: string): IWordBucketProcessorBuilder;
  withStream(stream: ReadableStream): IWordBucketProcessorBuilder;
  withClearStringArray(lines: string[]): IWordBucketProcessorBuilder;
}

interface IWordBucketProcessorBuilder {
  build(): WordBucketProcessor;
}

class WordBucketProcessorBuilder
  implements
    IWordBucketProcessorOptionsBuilder,
    IWordBucketProcessorReaderBuilder,
    IWordBucketProcessorBuilder
{
  private wordBucketCollectionOptions: WordBucketCollectionOptions;
  private reader: Reader | null = null;

  private constructor() {
    this.wordBucketCollectionOptions = { maxWordLength: 6 };
  }

  static create(): IWordBucketProcessorOptionsBuilder {
    return new WordBucketProcessorBuilder();
  }

  withBucketCollectionOptions(options: WordBucketCollectionOptions): IWordBucketProcessorReaderBuilder {
    this.wordBucketCollectionOptions = {...this.wordBucketCollectionOptions, ...options}
    return this;
  }

  withClearText(text: string): IWordBucketProcessorBuilder {
    this.reader = new ClearTextReader(text);
    return this;
  }

  withUrlOfTextFile(url: string): IWordBucketProcessorBuilder {
    this.reader = new ExternalTextReader(url);
    return this;
  }

  withStream(stream: ReadableStream): IWordBucketProcessorBuilder {
    this.reader = new StreamReader(stream);
    return this;
  }

  withClearStringArray(lines: string[]): IWordBucketProcessorBuilder {
    this.reader = new ClearStringArrayReader(lines);
    return this;
  }

  build() {
    if (!this.reader) {
      throw new Error("No reader provided");
    }
    return new WordBucketProcessor(
      this.reader,
      this.wordBucketCollectionOptions
    );
  }
}

export default WordBucketProcessorBuilder;
