// canSum Tabulation

// Write a function 'canSum(targetSum, numbers)' that takes in a targetSum and an array of numbers as arguments.

// The function should return a boolean indicating whether or not it is possible to generate the targetSum using numbers from the array.

// Constraints:
// -you may use an element of the array as many times as needed
// -you may assume that all input numbers are non-negative

// Examples
canSum(7, [5,3,4]) // -> true
canSum(7, [2,4])   // -> false


// Tabulation Recipe:

// You should have the most efficient version of the solution in one swoop (not like memoization)

// 1. Visualize the problem as a table 
//  -size the table based on the inputs (be aware of an off-by-one scenario)
// 2. Initialize the table with default values 
//  -choose compatible types (match return type with table value type. ie number to number)
// 3. Seed the trivial answer into the table
//  -capture the scenario where I have a trivially small instance of the input with a known answer
// 4. Iterate through the table (hard part)
//  -create logic that fills further positions of the table based on the current position
//  -to do this, focus on what options I have at any point in the problem (go right, down, etc)

// 1.
// What do I make the table out of? Which values contribute, the targetSum or numbers?
// What is going to change throughout the problem?...
// The numbers array doesn't change since we can reuse them. the targetSum shrinks, so that's the one.
// So the array should be roughly the size of targetSum + 1 (array of length 8) because of off-by-one.
// 2.
// What type is the question asking for? boolean. so initialize with boolean data. false value for all.
// 3.
// the base case of targetSum = 0 should always return true so at position 0 write T
// 4.
// time to iterate. start at index 0. how do I transition into further positions?...
// what possible numbers can I take into my sum? look at first element of 5. this means look 5 spaces ahead
// change that to true, repeat for other elements (3,4) - look 3 and four spaces ahead. change to T.
// first iteration complete. shift forward one position and repeat iteration.
// since position 1 is F, I should not modify any values looking forward any edge amount (5,3,4)
// repeat iteration moving forward one position until I reach the end.
// The table shows whether the quantities for target are actually possible.
// the element stored at the last position (7)  is the final answer. it's true, meaning possible.

// Complexity: both these terms affect the complexity:
// m = targetSum
// n = numbers.length
// O(m*n) time
// O(m) space

// think about what nested loops are required:
// one loop to iterate through the table
// a nested loop to iterate through every number of the numbers array

// let's code it up:

const canSum = (targetSum, numbers) => {
 const table = Array(targetSum + 1) // 1. size the table based on input that changes (targetSum)
 .fill(false); // 2. initialize table with all false values (this is on same line as above)
 table[0] = true; // 3. seed index 0 with true
 
 for (let i=0; i<= targetSum; i++) { // 4. start iteration loop at 0, go to TARGETSUM ONLY, increment by 1
  if (table[i] === true) { // 4. check if value is true. only if it is, look forward
   for (let num of numbers) { // 4. start nested loop that iterates through all values in numbers array
    table[i + num] = true; // 4. look ahead to current position plus current number and assign to true
   }
  }
 }

 return table[targetSum]; // 5. return the position asked for in the question to get final answer
}

console.log(canSum(7, [2,3])); // true
console.log(canSum(7, [5,3,4,7])); // true
console.log(canSum(7, [2,4])); // false
console.log(canSum(8, [2,3,5])); // true
console.log(canSum(300, [7,14])); // false... [Done] exited with code=0 in 0.052 seconds!
