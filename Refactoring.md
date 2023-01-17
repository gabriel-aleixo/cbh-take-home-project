# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

The original function had a couple of unnecessary nested If Statements that made the code deeper and harder to read. By checking a negative condition and returning early, and also immediately assiginig value to the var `candidate`, I could un-nest a few statements. Furthermore, some conditionals treated scenarios outside of their scope. For instance, if the var `candidate` is a hash using SHA3-512 and hex format, it cannot be longer than the maximum key lenght. I reordered the operations to assign value to the var `candidate` in one single `if...else` statement. The logic is more "tree-like" and easier to follow. 