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


console.log(allConstruct('abcdef', ['ab', 'abc', 'cd', 'def', 'abcd', 'ef', 'c']));