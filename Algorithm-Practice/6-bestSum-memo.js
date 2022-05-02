// bestSum Memoization

// Write a function 'bestSum(targetSum, numbers)' that takes in a targetSym and an aray of numbers as arguments.

// The function should return an array containing the shortest combination of numbers that add up to exactly the targetSum

// If there is a tie for the shortest combination, you may return any one of the shortest.

// Examples:
bestSum(7, [5,3,4,7]) // -> [3,4] works, but [7] is shortest
bestSum(8, [2,3,5]) // -> [2,2,2,2] works, but [3,5] is shortest


// 1. make it work. have a solution that is recursive. it's ok if it's slow
//    -visualize the problem as a tree.
//    -look for patterns. look for ways to shrink the problem.
//    -implement the tree using recursion. find the base case(s).
//    -test the brute force solution for correctness.

// I need to compare all of my branches (recursive calls) and pick the shortest combination
// the for loop iterates and attemps all of the branches
// create a new variable that is updated when a shorter combination is found
const bestSum = (targetSum, numbers) => {
 if (targetSum === 0) return [];
 if (targetSum < 0) return null;

 let shortestCombination = null; // set to null in case no numbers combo leads to the targetSum

 for (let num in numbers) {
  const remainder = targetSum - num;
  const remainderCombination = bestSum(remainder, numbers);
  if (remainderCombination !== null) {
   const combination = [ ...remainderCombination, num ];
   // if the combination is shorter than the current 'shortest' or it's null, update it:
   if (shortestCombination === null || combination.length < shortestCombination.length) {
    shortestCombination = combination;
   }
  }
 }

 return shortestCombination;
}


console.log(bestSum(7, [5,3,4,7])); // [7]
console.log(bestSum(8, [2,3,5])); // [3,5]
console.log(bestSum(8, [1,4,5])); // [4,4]
console.log(bestSum(100, [1,2,5,25])); // [25,25,25,25]


// brute force time complexity:
// m = target sum
// n = numbers.length
// time: O(n^m) + using the spread operator [ ...remainderCombination, num ] which is max value of m
// time: O(n^m * m)

// brute force time complexity:
// space: O(m * m) or O(m^2)


// 2. make it efficient.
//    -add a memo object 
//       -needs to have keys that represent arguments to the function
//       -values of the object need to represent the return values
//       -make sure the memo is shared among all the recursive calls 
//    -add a new base case to return memo values that captures the memo
//    -store return values expression into the memo before finally returning the memo object

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
};


console.log(bestSum(7, [5,3,4,7])); // [7]
console.log(bestSum(8, [2,3,5])); // [3,5]
console.log(bestSum(8, [1,4,5])); // [4,4]
console.log(bestSum(100, [1,2,5,25])); // [25,25,25,25]
