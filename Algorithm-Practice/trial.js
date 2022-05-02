const bestSum = (targetSum, numbers, memo={}) => { // 1. add empty memo object
 if (targetSum in memo) return memo[targetSum]; // 2. add early return if target is in memo 
 if (targetSum === 0) return [];
 if (targetSum < 0) return null;

 let shortestCombination = null; 

 for (let num of numbers) {
  const remainder = targetSum - num;
  const remainderCombination = bestSum(remainder, numbers, memo); // 3. add memo to recursive calls
  if (remainderCombination !== null) {
   const combination = [ ...remainderCombination, num ];
   
   if (shortestCombination === null || combination.length < shortestCombination.length) {
    shortestCombination = combination;
   }
  }
 }

memo[targetSum] = shortestCombination; // 4. take returns, store in memo (replace 'return')
return shortestCombination; // 5. return shortestCombination this time
}


console.log(bestSum(7, [5,3,4,7])); // [7]
console.log(bestSum(8, [2,3,5])); // [3,5]
console.log(bestSum(8, [1,4,5])); // [4,4]
console.log(bestSum(100, [1,2,5,25])); // [25,25,25,25]
