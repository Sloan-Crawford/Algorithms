// canConstruct Memoization

// Write a function 'canConstruct(target, wordBank)' that accepts a target string and an array of strings.

// The funtion should return a boolean indicating wheter or not the 'target' can be constructed by concatenating elements of the 'wordBank' array.

// You may reuse elements of 'wordBank' as many times as needed.

// Examples:
canConstruct('hi', ['hello', 'i']); // -> false. you can't take individual characters, just strings
canConstruct(abcdef, [ab, abc, cd, def, abcd]); // -> true (abc + def = abcdef)
canConstruct(skateboard, [bo,rd,ate,t,ska,sk,boar]); // -> false
canConstruct('', [cat, dog, mouse]); // -> true (take 0 elements from the array of strings)

// 1. make it work. have a solution that is recursive. it's ok if it's slow
//    -visualize the problem as a tree.
//    -look for patterns. look for ways to shrink the problem.
//    -implement the tree using recursion. find the base case(s).
//    -test the brute force solution for correctness.

// VISUALIZE THE TREE for this true example:
canConstruct(abcdef, [ab, abc, cd, def, abcd]); // -> true (abc + def = abcdef)
// the root is the target string 'abcdef'
// how do I transition to children nodes? what moves do I make to shrink the target string?...
// I need to shrink it because I have the base case of the empty string in mind.
// I also need to use the array of words as I transition nodes.
// so I remove the first string in the wordBank array from the target string (ab). 
// repeat for each string in the array to get all the second nodes = (cdef, def, ef)
// *do NOT take out characters from the middle of the string (cd, def). only prefixes.
// only branch to children if I have a matching prefix in the wordBank.
// continue branching until a node can't be broken down (=false) or it's an empty string (=true).
// bubble boolean values up and if even one branch returns true, it is possible to construct.

// code up the brute force:
// write early return scenarios
// write for loop to iterate through wordBank to find each word string.
// remember that it needs to match the prefix of the target. *do this with indexOf(word) 
// indexOf() examples: 'potato'.indexOf('pot') -> 0 ... 'potato'.indexOf('tato') -> 2
// shrink the target with SLICE. pick up characters after the length of the word.
// make the recursive call with the arguments (suffix, wordBank).
// what type of data do I get back from canConstruct? a boolean. so set if to check for true.
// if the recursive call is true, return true for larger problem early.
// return false only after the for loop (after trying every possible choice of the word).

const canConstruct = (target, wordBank) => {
 if (target === '') return true;
 if (wordBank === '') return false;

 for (let word of wordBank) {
  if (target.indexOf(word) === 0) { // if this returns 0, it's a prefix. use it to shrink target.
   const suffix = target.slice(word.length); // this will start to pick up characters after word.
   if (canConstruct(suffix, wordBank) === true) {
    return true;
   }
  }
 }

 return false;
}

// Test for correctness:
console.log(canConstruct('abcdef', ['ab', 'abc', 'cd', 'def', 'abcd'])); // true
console.log(canConstruct('skateboard', ['bo', 'rd', 'ate', 't', 'ska', 'sk', 'boar'])); // false
console.log(canConstruct('enterapotentpot', ['a', 'p', 'ent', 'enter', 'ot', 'o', 't'])); // true
console.log(canConstruct('eeeeeeeeeeeeeeeeeeeeeeeeeeeef', ['e', 'ee', 'eee', 'eeee', 'eeeee', 'eeeeee'])); // false ... runs way too long (15 seconds)



// 2. make it efficient.
//    -add a memo object 
//       -needs to have keys that represent arguments to the function
//       -values of the object need to represent the return values
//       -make sure the memo is shared among all the recursive calls 
//    -add a new base case to return memo values that captures the memo
//    -store return values expression into the memo before finally returning the memo object

// the wordBank doesn't change from one call to the next so I don't need to make it part of the key:

const canConstruct = (target, wordBank, memo = {}) => { // 1. add empty memo object
 if (target in memo) return memo[target]; // 2. add memo checking logic (must be first!)
 if (target === '') return true;
 // if (wordBank === '') return false; // don't need this, just my idea


 for (let word of wordBank) {
  if (target.indexOf(word) === 0) { 
   const suffix = target.slice(word.length);
   if (canConstruct(suffix, wordBank, memo) === true) { // 3. add memo to recursive calls
    memo[target] = true; // 4. take returns, store in memo (replace 'return')
    return true; // 5. return after storing
   }
  }
 }

 memo[target] = false; // 4. take returns, store in memo (replace 'return')
 return false; // 5. return after storing
}

// Test for efficiency:
console.log(canConstruct('abcdef', ['ab', 'abc', 'cd', 'def', 'abcd'])); // true
console.log(canConstruct('skateboard', ['bo', 'rd', 'ate', 't', 'ska', 'sk', 'boar'])); // false
console.log(canConstruct('enterapotentpot', ['a', 'p', 'ent', 'enter', 'ot', 'o', 't'])); // true
console.log(canConstruct('eeeeeeeeeeeeeeeeeeeeeeeeeeeef', ['e', 'ee', 'eee', 'eeee', 'eeeee', 'eeeeee'])); // false ... [Done] exited with code=0 in 0.065 seconds!