import ClearStringArrayReader from "./clearStringArrayReader";
import Reader from "./reader";

export class ClearTextReader implements Reader {
  private text: string;

  constructor(text: string) {
    this.text = text;
  }

  async *read(onLineRead: ((line: string) => void) | undefined) {
    if (!this.text) {
      return;
    }

    const lines = this.text.replace("\r\n", "\n").split("\n");
    const reader = new ClearStringArrayReader(lines);
    yield* reader.read(onLineRead);
  }
}

export default ClearTextReader;
