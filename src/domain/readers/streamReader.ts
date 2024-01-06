import Reader from "./reader";

class StreamReader implements Reader {
    private stream: ReadableStream<string>;
  
    constructor(stream: ReadableStream<string>) {
      this.stream = stream;
    }
  
    async *read(onLineRead?: ((line: string) => void) | undefined) {
      if (!this.stream) {
        throw new Error("No stream to read from");
      }
  
      const reader = this.stream.getReader();
      let chunk = await reader.read();
      let partialLine = "";
  
      while (!chunk.done) {
        partialLine += chunk.value;
        // windows machine line endings are \r\n
        const linesArray = partialLine.replace("\r\n","\n").split("\n");
  
        for (let i = 0; i < linesArray.length - 1; i++) {
          if (onLineRead) {
            onLineRead(linesArray[i]);
          }
          yield linesArray[i];
        }
  
        partialLine = linesArray[linesArray.length - 1];
        
        chunk = await reader.read();
      }
  
      if (partialLine) {
        if (onLineRead) {
          onLineRead(partialLine);
        }
        yield partialLine;
      }
    }
  }
  
  export default StreamReader;