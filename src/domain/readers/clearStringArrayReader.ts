import Reader from "./reader";

export class ClearStringArrayReader implements Reader {
  private lines: string[];

  constructor(lines: string[]) {
    this.lines = lines;
  }

  async *read(onLineRead: ((line: string) => void) | undefined) {
    if(!this.lines){
      return;
    }
    for (const line of this.lines) {
      if (onLineRead) {
        onLineRead(line);
      }
      for (const word of line.trim().split(" ")) {
        yield word;
      }
    }
  }
}

export default ClearStringArrayReader;