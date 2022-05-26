// allConstruct Tabulation

// Write a function'allConstruct(target, wordBank)' that accepts a target string and an array of strings.

// The function should return a 2D array containing ALL THE WAYS that the 'target' can be constructed by concatenating elements of the 'wordBank' array. Each element of the 2D array should represent one combination that constructs the 'target'.

// You may reuse elements of 'wordBank' as many times as needed.

// Example 1:
allConstruct(purple, [purp, p, le, purpl]) // ->

[
 [purp, le],
 [p, ur, p, le]
]

// Example 2:
allConstruct('', [cat, dog, mouse]) // -> [[]]

// example for going through formula:
allConstruct(abcdef, [ab, abc, cd, def, abcd, ef, c]) // ->

[
 [ab, cd, ef],
 [ab, c, def],
 [abc, def],
 [abcd, ef]
]


// 1. Visualize the problem as a table 
//  -size the table based on the inputs (be aware of an off-by-one scenario)
//  table length = target.length + 1 (7)
//  lign up target characters along bottom starting from left position (last one is blank)

// 2. Initialize the table with default values 
//  -choose compatible types (match return type with table value type. ie number to number)
//  -initialize all values as []

// 3. Seed the trivial answer into the table
//  -capture the scenario where I have a trivially small instance of the input with a known answer
//  ** look at images. this is tricky. first position is [[]]. 
//  *since position one represents the possibilty of creating an empty string, seed it with [[]]

// 4. Iterate through the table (hard part)
//  -create logic that fills further positions of the table based on the current position
//  -to do this, focus on what options I have at any point in the problem...
//  1st iteration: is it legal (starts with correct character?) if so, look forward by number of chars in word
//  copy contents of current position and append word i'm considering right now to each inner array...
 // repeat looking forward by other word lengths that start with correct character
//  other iterations: move current position ahead one. check if it's not a single empty string, repeat.


// Complexity: both these terms affect the complexity:
// m = target.length
// n = wordBank.length
// O(n^m) time
// O(n^m) space = (m for size of the table, every element is a 2D array and each could be exponential)
// it's exponential

// Let's code it up:

const allConstruct = (target, wordBank) => {
 const table = Array(target.length + 1)
  .fill()
  .map(() => []); // don't forget to map! generate a new array for every element

 table[0] = [[]];
 
 for (let i=0; i<= target.length; i++) {
  for (let word of wordBank) {
   if (target.slice(i, i + word.length) === word) {
    // create potential subarrays with current position arrays and word appended:
    const newCombination = table[i].map(subArray => [...subArray, word]); // woah
    // take the new combination and copy it into further spot in table without replacement (use push):
    table[i + word.length].push(...newCombination);
   }
  }
 }

 return table[target.length];
}


console.log(allConstruct('purple', ['purp', 'p', 'ur', 'le', 'purpl'])); // ->
// [
//  ['purp', 'le']
//  'p', 'ur', 'p', 'le']
// ]
console.log(allConstruct('abcdef', ['ab', 'abc', 'cd', 'def', 'abcd', 'ef', 'c'])); // ->
// [
//  [ab, cd, ef],
//  [ab, c, def],
//  [abc, def],
//  [abcd, ef]
// ]
console.log(allConstruct('skateboard', ['bo', 'rd', 'ate', 't', 'ska', 'sk', 'boar'])); // ->
// []
console.log(allConstruct('aaaaaaaaaaaaaaaaaz', ['a', 'aa', 'aaa', 'aaaa', 'aaaaa'])); // ->
// []... [Done] exited with code=0 in 0.163 seconds!