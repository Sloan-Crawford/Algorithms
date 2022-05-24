// howSum Tabulation

// Write a function 'howSum(targetSum, numbers)' that takes in a targetSum and an array of numbers as arguments.

// The function should return an array containing any combination of elements that add up to exactly the targetSum. If there is no combination that does this, return null.

// If there are multiple combinations possible, you may return any single one.

// Examples:
howSum(7, [5,3,4,7]); // -> [3,4] one possible answer is adding 3+4, or just take 7
howSum(8, [2,3,5]); // -> [2,2,2,2] or [3,5]
howSum(7, [2,4]); // -> null since it's not possible
howSum(0, [1,2,3]); // -> [] return an empty array when targetSum is 0


// example for going through formula:
howSum(7, [5,3,4]); // -> [3,4] one possible answer is adding 3+4, or just take 7

// 1. Visualize the problem as a table 
//  -size the table based on the inputs (be aware of an off-by-one scenario)
//  length = targetSum + 1

// 2. Initialize the table with default values 
//  -choose compatible types (match return type with table value type. ie number to number)
//  initialize all values as null

// 3. Seed the trivial answer into the table
//  -capture the scenario where I have a trivially small instance of the input with a known answer
//  seed index 0 with empty array []

// 4. Iterate through the table (hard part)
//  -create logic that fills further positions of the table based on the current position
//  -to do this, focus on what options I have at any point in the problem (try each num in numbers)
//  at 0, look forward by each num value (5,3,4) and add num if current position is not null
//  repeat iteration for each position. continue through to the end, finishing all iterations.

// Complexity: both these terms affect the complexity:
// m = targetSum
// n = numbers.length
// O(m^2*n) time - at most we need to copy over an array of an additional length of m.
// O(m^2) space
// it's polinomial, not exponential, so it should run quickly enough.

// Let's code it up:

const howSum = (targetSum, numbers) => {
 const table = Array(targetSum + 1).fill(null); // 1. size the table based on input that changes (targetSum)
 // 2. and initialize table with all null values
 table[0] = []; // 3. seed index 0 with empty array

 for (let i=0; i<=targetSum; i++) { // 4. start iteration loop at 0, go to TARGETSUM ONLY, increment by 1
  if (table[i] !== null) { // 4. check if value is not null. only if it isn't, look forward
   for (let num of numbers) { 
    table[i+num] = ([...table[i], num]);
   }
  }
 }
 return table[targetSum];
}

console.log(howSum(7, [2,3])); // -> [3,2,2]
console.log(howSum(7, [5,3,4,7])); // -> [3,4] one possible answer is adding 3+4, or just take 7
console.log(howSum(8, [2,3,5])); // -> [2,2,2,2] or [3,5]
console.log(howSum(7, [2,4])); // -> null since it's not possible
console.log(howSum(300, [7,14])); // -> null ...[Done] exited with code=0 in 0.059 seconds!