// canSum Memoization

// Write a function 'canSum(targetSum, numbers)' that takes in a targetSum and an array of numbers as arguments.

// The function should return a boolean indicating whether or not it is possible to generate the targetSum using numbers from the array.

// Constraints:
// -you may use an element of the array as many times as needed
// -you may assume that all input numbers are non-negative

// i.e. canSum(7, [5,3,4,7]) -> true
// i.e. canSum(7, [2,4]) -> false


// Step 1: make it work. have a solution that is recursive:
// draw the tree for a small problem and find the base cases
// 0 nodes should return true back to their parent, bubbling up to the top
// nodes with remainder return false to parent
// if parent has at least one child that returns true, the parent returns true up the tree
// so I can stop early if even one base case returns true (it's not asking 'how MANY ways')

const canSum = (targetSum, numbers) => {
 if (targetSum === 0) return true;
 if (targetSum <0) return false; // gone too far and all array numbers are always positive
 
 // iterate through every element of the array (i.e. 2,3 for the first canSum log below):
 for (let num of numbers) {
  // branching logic (subtract current choice of number from the targetSum):
  const remainder = targetSum - num; // gives new remainder that becomes a targetSum
  // call recursively on canSum:
  if (canSum(remainder, numbers) === true) { // pass in the same numbers array, we can reuse them
   return true; // if remainder can be generated using array numbers, return true for larger problem
  } 
 }

 return false; // only after the for loop because we want to try all possibilities first
};

console.log(canSum(7, [2,3])); // true
console.log(canSum(7, [5,3,4,7])); // true
console.log(canSum(7, [2,4])); // false
console.log(canSum(8, [2,3,5])); // true
console.log(canSum(300, [7,14])); // false... but takes way too long



// brute force is correct, but lacks efficiency. back to the tree to find



// Step 2: make it efficient:
//    -add a memo object 
//       -needs to have keys that represent arguments to the function
//       -values of the object need to represent the return values
//       -make sure the memo is shared among all the recursive calls 
//    -add a new base case to return memo values that captures the memo
//    -store return values expression into the memo before finally returning the memo object

