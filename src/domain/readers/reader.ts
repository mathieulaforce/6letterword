interface Reader {
  read: (
    onLineRead?: ((line: string) => void) | undefined
  ) => AsyncGenerator<string>;
}

export default Reader;
