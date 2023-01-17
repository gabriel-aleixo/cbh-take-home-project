const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the partition key if it is a string and length is <= 256", () => {
    const event = { partitionKey: "abcde433fsdsd#$%#$ddsshe453dfssc`12314" };
    const result = deterministicPartitionKey(event);
    expect(result).toBe(event.partitionKey);
  });

  it("Returns the the partition in string if it is not a string", () => {
    const event = { partitionKey: 12345 };
    const result = deterministicPartitionKey(event);
    expect(result).toBe(event.partitionKey.toString());
  });

  it("Returns the SHA3-512 hash of the partition key if its length > 256", () => {
    const partitionKeyString = (length) => {
      let string = "";
      while (string.length < length) {
        string += Math.random().toString(36).slice(2);
      }
      return string;
    };
    // console.log("STRING ====>", partitionKeyString(512));
    const event = { partitionKey: partitionKeyString(512) };
    const result = deterministicPartitionKey(event);
    expect(result).toHaveLength(128);
    expect(result).toMatch(/^[A-Fa-f0-9]+$/);
  });

  it("Returns the SHA3-512 hash of the event data if the partition key is not present in the event", () => {
    const event = { data: { foo: "bar" } };
    const result = deterministicPartitionKey(event);
    expect(result).toHaveLength(128);
    expect(result).toMatch(/^[A-Fa-f0-9]+$/);
  });
});
