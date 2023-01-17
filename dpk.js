const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;

  // candidate can be initialized with TRIVIAL_PARTITION_KEY
  // and modified later in case conditions are met
  let candidate = TRIVIAL_PARTITION_KEY;

  // There was no condition in case no event is passed
  if (!event) return candidate;

  // event was passed, must determine value of candidate
  if (event.partitionKey) {
    // Return value must be a string
    typeof event.partitionKey == "string"
      ? (candidate = event.partitionKey)
      : (candidate = JSON.stringify(event.partitionKey));

    // If length of candidate exceeds max key length, needs to be hashed
    if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
      // The output of SHA512 in hex format is automatically a string with 128 char
      candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
    }
  } else {
    // property partitionKey is not present
    // Use event data as key
    const data = JSON.stringify(event);

    // The output of SHA512 in hex format is automatically a string with 128 char
    candidate = crypto.createHash("sha3-512").update(data).digest("hex");
  }

  return candidate;
};
