// countConstruct Memoization

// Write a function'countConstruct(target, wordBank)' that accepts a target string and an array of strings.

// The function should return the NUMBER OF WAYS that the 'target' can be constructed by concatenating elements of the 'wordBank' array.

// You may reuse elements of 'wordBank' as many times as needed.

// Examples:
countConstruct(abcdef, [ab, abc, cd, def, abcd]) // -> 1 way

// 1. make it work. have a solution that is recursive. it's ok if it's slow
//    -visualize the problem as a tree.
//    -look for patterns. look for ways to shrink the problem.
//    -implement the tree using recursion. find the base case(s).
//    -test the brute force solution for correctness.

// VISUALIZE THE TREE for this true example:
// this time I want to choose a different value to return for the base cases (number not boolean)
// and change the logic for reconstructing our subsolutions
// we want to bubble up the values and add up all the numbers that come back from their children

// Example 2:
countConstruct('purple', ['purp', 'p', 'ur', 'le', 'purpl']); // -> 2 ways

// set base case to return 1 if target is empty string
// iterate through each word in wordBank
// check if the word is a prefix
// number of ways to generate the suffix with the rest of target = a recursive call on the countConstruct function with the arguments being the suffix and wordBank
// let totalCount = 0 (before for loop)
// add the numWaysForRest to the totalCount using +=
// return totalCount after for loop finishes

const countConstruct = (target, wordBank) => {
 if (target === '') return 1; // blank string means there is 1 way for sure

 let totalCount = 0;

 for (let word of wordBank) {
  if (target.indexOf(word) === 0) { // then it must be a prefix, so call recursively on suffix:
   const numWaysForRest = countConstruct(target.slice(word.length), wordBank);
   totalCount += numWaysForRest;
  }
 }

 return totalCount;
}

// Test for correctness:
console.log(countConstruct('purple', ['purp', 'p', 'ur', 'le', 'purpl'])); // 2 
console.log(countConstruct('abcdef', ['ab', 'abc', 'cd', 'def', 'abcd'])); // 1
console.log(countConstruct('skateboard', ['bo', 'rd', 'ate', 't', 'ska', 'sk', 'boar'])); // 0
console.log(countConstruct('enterapotentpot', ['a', 'p', 'ent', 'enter', 'ot', 'o', 't'])); // 4
console.log(countConstruct('eeeeeeeeeeeeeeeeeeeeeeeeeeeef', ['e', 'ee', 'eee', 'eeee', 'eeeee', 'eeeeee'])); // 0 ... runs way too long (16.7 seconds)


// 2. make it efficient.
//    -add a memo object 
//       -needs to have keys that represent arguments to the function
//       -values of the object need to represent the return values
//       -make sure the memo is shared among all the recursive calls 
//    -add a new base case to return memo values that captures the memo
//    -store return values expression into the memo before finally returning the memo object

const countConstruct = (target, wordBank, memo={}) => { // 1. add empty memo object
 if (target in memo) return memo[target]; // 2. add early return if target is in memo
 if (target === '') return 1; 

 let totalCount = 0;

 for (let word of wordBank) {
  if (target.indexOf(word) === 0) { 
   const numWaysForRest = countConstruct(target.slice(word.length), wordBank, memo); // 3. add memo
   totalCount += numWaysForRest;
  }
 }

 memo[target] = totalCount; // 4. take returns, store in memo (replace 'return')
 return memo[target]; // 5. return after storing
}

// Test for efficiency:
console.log(countConstruct('purple', ['purp', 'p', 'ur', 'le', 'purpl'])); // 2 
console.log(countConstruct('abcdef', ['ab', 'abc', 'cd', 'def', 'abcd'])); // 1
console.log(countConstruct('skateboard', ['bo', 'rd', 'ate', 't', 'ska', 'sk', 'boar'])); // 0
console.log(countConstruct('enterapotentpot', ['a', 'p', 'ent', 'enter', 'ot', 'o', 't'])); // 4
console.log(countConstruct('eeeeeeeeeeeeeeeeeeeeeeeeeeeef', ['e', 'ee', 'eee', 'eeee', 'eeeee', 'eeeeee'])); // 0 ... exited with code=0 in 0.294 seconds!