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
console.log(countConstruct('eeeeeeeeeeeeeeeeeeeeeeeeeeeef', ['e', 'ee', 'eee', 'eeee', 'eeeee', 'eeeeee'])); // 0 ... runs way too long (16.7 seconds)