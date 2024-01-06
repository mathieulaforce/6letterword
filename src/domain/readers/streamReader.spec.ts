import { describe, expect, it } from "vitest";
import StreamReader from "./streamReader";
describe("streamreader tests", () => {
  it("should read from a stream", async () => {
    const stream = new ReadableStream<string>({
      start(controller) {
        controller.enqueue("Hello ");
        controller.enqueue("from a ");
        controller.enqueue("stream!");
        controller.close();
      },
    });
    const reader = new StreamReader(stream);
    const result = await reader.read();
    const output = (await result.next()).value;

    expect(output).toBe("Hello from a stream!");
  });

  it("should read from a stream with no line endings", async () => {
    const stream = new ReadableStream<string>({
      start(controller) {
        controller.enqueue("Hello from a stream!");
        controller.close();
      },
    });
    const reader = new StreamReader(stream);
    const result = await reader.read();
    const output = (await result.next()).value;
    expect(output).toBe("Hello from a stream!");
  });

  it("should read from a stream with windows line endings", async () => {
    const stream = new ReadableStream<string>({
      start(controller) {
        controller.enqueue("Hello \r\n");
        controller.enqueue("from a \r\n");
        controller.enqueue("stream!");
        controller.close();
      },
    });
    const reader = new StreamReader(stream);
    const result = await reader.read();
    let output = "";
    let numberOfLines = 0;
    for await (const line of result) {
      output += line;
      numberOfLines++;
    }

    expect(output).toBe("Hello from a stream!");
    expect(numberOfLines).toBe(3);
  });

  it("should read from a stream with only /n line endings", async () => {
    const stream = new ReadableStream<string>({
      start(controller) {
        controller.enqueue("Hello \n");
        controller.enqueue("from a \n");
        controller.enqueue("stream!");
        controller.close();
      },
    });
    const reader = new StreamReader(stream);
    const result = await reader.read();
    let output = "";
    let numberOfLines = 0;
    for await (const line of result) {
      output += line;
      numberOfLines++;
    }

    expect(output).toBe("Hello from a stream!");
    expect(numberOfLines).toBe(3);
  });

  it("should read from a stream with no data", async () => {
    const stream = new ReadableStream<string>({
      start(controller) {
        controller.close();
      },
    });
    const reader = new StreamReader(stream);
    const result = await reader.read();
    let output = "";
    for await (const line of result) {
      output += line;
    }
    expect(output).toBe("");
  });
});
