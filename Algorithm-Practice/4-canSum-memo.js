// canSum Memoization

// Write a function 'canSum(targetSum, numbers)' that takes in a targetSum and an array of numbers as arguments.

// The function should return a boolean indicating whether or not it is possible to generate the targetSum using numbers from the array.

// Constraints:
// -you may use an element of the array as many times as needed
// -you may assume that all input numbers are non-negative

// Examples
canSum(7, [5,3,4,7]) // -> true
canSum(7, [2,4])     // -> false


// Step 1: make it work. have a solution that is recursive:
// draw the tree for a small problem and find the base cases
// 0 nodes should return true back to their parent, bubbling up to the top
// nodes with remainder return false to parent
// if parent has at least one child that returns true, the parent returns true up the tree
// so I can stop early if even ONE base case returns true (it's not asking 'how MANY ways')

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

// questions to answer: which argument directly impacts the return value? 
// answer: targetSum does so use it as the key, numbers doesn't since it doesn't change ever. 

const canSum = (targetSum, numbers, memo = {}) => {  // 1. bake in memo object
 if (targetSum in memo) return memo[targetSum]; // 3. seen it before? then return stored value
 if (targetSum === 0) return true;
 if (targetSum <0) return false; 
 for (let num of numbers) {
  const remainder = targetSum - num; 
  if (canSum(remainder, numbers, memo) === true) {  // 2. pass down memo object
   memo[targetSum] = true; // 4. go into memo, use key, assign the value returned underneath
   return true; 
  } 
 }

    memo[targetSum] = false; // 4. do the same thing for all returns that aren't base cases
 return false; 
};

// 4. this step will be a hard a fast rule to use when momoizing a brute force recursive function:
// take exactly the expressions that I returned in recursive scenarios and store them in the memo. 

console.log(canSum(7, [2,3])); // true
console.log(canSum(7, [5,3,4,7])); // true
console.log(canSum(7, [2,4])); // false
console.log(canSum(8, [2,3,5])); // true
console.log(canSum(300, [7,14])); // false [Done] exited with code=0 in 0.057 seconds!


// Brute force vs. Memoized:
// O(n^m) time ---> O(m*n) time
// O(m) space ---> O(m) space

// Memoized time complexity explained:
// we know that the value of the nodes in the tree are going to be values up to m,
// so there are m different possible values we can have in a node.
// However now since we're able to cash results inside of the memo object,
// I'm never going to have to rexplore a subtree for m.
// That being said I still have to branch n times for each of those nodes.
// So overall, I have m * n nodes.