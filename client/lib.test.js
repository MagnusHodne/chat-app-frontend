import { randomString } from "./lib/randomString";
import { sha256 } from "./lib/sha256";

describe("Random string", () => {
  it("should not produce same output on two consecutive calls", () => {
    const string1 = randomString(50);
    const string2 = randomString(50);
    expect(string1).not.toEqual(string2);
  });

  it("should produce a string of the given length", () => {
    const string = randomString(10);
    expect(string).toHaveLength(10);
  });
});
