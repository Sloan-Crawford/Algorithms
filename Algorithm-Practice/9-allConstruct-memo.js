// allConstruct Memoization

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
allConstruct(abcdef, [ab, abc, cd, def, abcd, ef, c]) // ->

[
 [ab, cd, ef],
 [ab, c, def],
 [abc, def],
 [abcd, ef]
]

// 1. make it work. have a solution that is recursive. it's ok if it's slow
//    -visualize the problem as a tree.
//    -look for patterns. look for ways to shrink the problem.
//    -implement the tree using recursion. find the base case(s).
//    -test the brute force solution for correctness.

// example base case 1: return an empty array (no ways):

allConstruct(hello, [cat, dog, mouse]) // -> []

// example base case 2: return an empty array containing an empty array (take no words):

allConstruct('', [cat, dog, mouse]) // -> [[]]

// visualize the tree for this example:
allConstruct(abcdef, [ab, abc, cd, def, abcd, ef, c])
// base cases of empty arrays mean target can be made
// they return 2D empty arrays [[]] to their parents
// make sure to include the edge used to transition to the child (push into subarrays)
// nodes that have two bubbled up arrays need to combine both arrays. concatenate them.
// repeat for other subtrees
// concatenate all subtrees to create one 2D array

// visualize the tree for this example, too:
allConstruct(purple, [purp, p, le, purpl])
// see how the subtree that can't make the target returns a single empty array to the top

// if target is an empty string, return a 2D empty array
// iterate through every word in wordBank, check if it is a prefix
// create an extra variable to store the target after removing the word (giving the suffix)
// do a recursive call on the suffix and pass along the same wordBank
// think about what type I should get back from allConstruct() -> gives an array
// create a variable called suffixWays (ways to make suffix) that stores the recursive call. 
// now how can I get all the ways to make the original target?
// take the suffixWays and add the current word to the front of it...
// iterate over every subarray and add the word to the front of it using MAP method and spread op.
// remember the for loop gives multiple branches we need to gather together...
// create a variable on the outside, an empty result array.
// PUSH the targetWays into the result, spreading it out so we don't get a 3D array

const allConstruct = (target, wordBank) => {
 if (target === '') return [[]];

 const result = [];

 for (let word of wordBank) {
  if (target.indexOf(word) === 0) {
   const suffix = target.slice(word.length); // gives what's after the end of the word in target
   const suffixWays = allConstruct(suffix, wordBank);
   const targetWays = suffixWays.map(way => [word, ...way]);
   result.push(...targetWays);
  }
 }
 return result;
}

console.log(allConstruct('purple', ['purp', 'p', 'ur', 'le', 'purpl'])); // ->
// [
//  ['purp', 'le']
//  'p', 'ur', 'p', 'le']
// ]
console.log(allConstruct(abcdef, [ab, abc, cd, def, abcd, ef, c])); // ->
// [
//  [ab, cd, ef],
//  [ab, c, def],
//  [abc, def],
//  [abcd, ef]
// ]
console.log(allConstruct(skateboard, [bo, rd, ate, t, ska, sk, boar])); // ->
// []
console.log(allConstruct(aaaaaaaaaaaaaaaaaz, [a, aa, aaa, aaaa, aaaaa])); // ->
// []... but takes a long time



// 2. make it efficient.
//    -add a memo object 
//       -needs to have keys that represent arguments to the function
//       -values of the object need to represent the return values
//       -make sure the memo is shared among all the recursive calls 
//    -add a new base case to return memo values that captures the memo
//    -store return values expression into the memo before finally returning the memo object

// with this problem, the worst case is returning a 2D array that has a ton of possibilities,
// we can still memoize it, but it won't affect the true big O worst case

const allConstruct = (target, wordBank, memo={}) => {
 if (target in memo) return memo[target];
 if (target === '') return [[]];

 const result = [];

 for (let word of wordBank) {
  if (target.indexOf(word) === 0) {
   const suffix = target.slice(word.length); // gives what's after the end of the word in target
   const suffixWays = allConstruct(suffix, wordBank, memo);
   const targetWays = suffixWays.map(way => [word, ...way]);
   result.push(...targetWays);
  }
 }
 memo[target] = result;
 return result;
}

// they all return faster, but it doesn't represent the worst case


// Brute force vs. Memoized: about the same
// O(n^m * m) time ---> O(n^m) time
// O(m) space ---> O(m) space