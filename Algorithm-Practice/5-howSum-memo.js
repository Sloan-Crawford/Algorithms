// howSum Memoization

// Write a function 'howSum(targetSum, numbers)' that takes in a targetSum and an array of numbers as arguments.

// The function should return an array containing any combination of elements that add up to exactly the targetSum. If there is no combination that does this, return null.

// If there are multiple combinations possible, you may return any single one.

// Examples:
howSum(7, [5,3,4,7]) // -> [3,4] one possible answer is adding 3+4, or just take 7
howSum(8, [2,3,5]) // -> [2,2,2,2] or [3,5]
howSum(7, [2,4]) // -> null since it's not possible
howSum(0, [1,2,3]) // -> [] return an empty array when targetSum is 0


// 1. make it work. have a solution that is recursive. it's ok if it's slow
//    -visualize the problem as a tree.
//    -look for patterns. look for ways to shrink the problem.
//    -implement the tree using recursion. find the base case(s).
//    -test the brute force solution for correctness.

// same base cases as canSum but return empty array if 0, and null if negative number:
// get branching logic (how do I want to make recursive calls?):
// need to make a recursive call for every element of the numbers array.
// this problem is interesting because it can return an array (possible) or null (not possible)
// for the early return of remainderResult, use the spread operator [... ]
// spread operator: use it to unpack an array and then I can add onto the end of it
const howSum = (targetSum, numbers) => {
 if (targetSum === 0) return [];
 if (targetSum < 0) return null;

 for (let num of numbers) {
  const remainder = targetSum - num;
  const remainderResult = howSum(remainder, numbers); // no need to change since we can reuse numbers
  if (remainderResult !== null) { // early return if valid number found 
   return [...remainderResult, num]; // return the recursive call array & number added to end of it
 }
}
// if no combination of numbers from the numbers array is valid, return null:
return null;
};


console.log(howSum(7, [2,3])); // [3,2,2]
console.log(howSum(7, [5,3,4,7])); // [4,3]
console.log(howSum(7, [2,4])); // null
console.log(howSum(8, [2,3,5])); // [2,2,2,2]
console.log(howSum(300, [7,14])); // null ...[Done] exited with code=0 in 17.465 seconds. too long.

// brute force time complexity:
// m = target sum
// n = numbers.length
// time: O(n^m) + using the spread operator [ ...remainderResult, num ] which is max value of m
// time: O(n^m * m)

// brute force time complexity:
// space: O(m)



// 2. make it efficient.
//    -add a memo object 
//       -needs to have keys that represent arguments to the function
//       -values of the object need to represent the return values
//       -make sure the memo is shared among all the recursive calls 
//    -add a new base case to return memo values that captures the memo
//    -store return values expression into the memo before finally returning the memo object

const howSum = (targetSum, numbers, memo = {}) => { // 1. add empty memo object
 if (targetSum in memo) return memo[targetSum]; // 2. add early return if target is in memo
 if (targetSum === 0) return [];
 if (targetSum < 0) return null;

 for (let num of numbers) {
  const remainder = targetSum - num;
  const remainderResult = howSum(remainder, numbers, memo); // 3. add memo to recursive calls
  if (remainderResult !== null) { 
   memo[targetSum] = [...remainderResult, num,]; // 4. take returns, store in memo (replace 'return')
   return memo[targetSum]; // 5. return memo
 }
}

memo[targetSum] = null // 4. take returns, store in memo (replace 'return')
return null; // 5. return NULL this time
};


console.log(howSum(7, [2,3])); // [3,2,2]
console.log(howSum(7, [5,3,4,7])); // [4,3]
console.log(howSum(7, [2,4])); // null
console.log(howSum(8, [2,3,5])); // [2,2,2,2]
console.log(howSum(300, [7,14])); // null ...[Done] exited with code=0 in 0.355 seconds!




// Brute force vs. Memoized:
// O(n^m * m) time ---> O(N * m^2) time
// O(m) space ---> O(m^2) space

// I have m number of keys & each key has a value which is at worst going to be an array of m elements
// this gives us m * m or m^2 above

// reduced from exponential to polinomial
// m^2 isn't considered exponential because the exponent is a constant number