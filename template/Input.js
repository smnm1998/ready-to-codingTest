class Input {
  async readMultipleInputs() {
    const inputs = [];
    while (true) {
      const input = await Console.readLineAsync('입력 (빈 줄 입력 시 종료):\n');
      const trimmed = input.trim();

      if (trimmed === '') break; // 엔터만 치면 종료
      inputs.push(trimmed);
    }
    return inputs;
  }
}
