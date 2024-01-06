import Reader from "./reader";
import StreamReader from "./streamReader";

export class ExternalTextReader implements Reader {
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  
  async *read(onLineRead: ((line: string) => void) | undefined) {
    try {
      const options = {
        headers: {
          'Cache-Control': 'no-cache'
        }
      };    
      const response = await fetch(this.url, options);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      if (!response.body) {
        return;
      }

      const textStream = response.body.pipeThrough(new TextDecoderStream());
      const streamReader = new StreamReader(textStream);
      yield* streamReader.read(onLineRead);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
}

export default ExternalTextReader;
