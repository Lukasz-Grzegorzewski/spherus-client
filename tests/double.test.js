import { doubleIt } from "src/App";

describe('sum module', () => {
  it('adds 1 + 2 to equal 3', () => {
    expect(doubleIt(5)).toBe(10);
  });
});