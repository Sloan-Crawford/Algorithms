// bestSum Tabulation

// Write a function 'bestSum(targetSum, numbers)' that takes in a targetSym and an aray of numbers as arguments.

// The function should return an array containing the shortest combination of numbers that add up to exactly the targetSum

// If there is a tie for the shortest combination, you may return any one of the shortest.

// Examples:
bestSum(7, [5,3,4,7]) // -> [3,4] works, but [7] is shortest
bestSum(8, [2,3,5]) // -> [2,2,2,2] works, but [3,5] is shortest


// example for going through formula:
bestSum(8, [2,3,5]) // -> [3,5] is shortest

// 1. Visualize the problem as a table 
//  -size the table based on the inputs (be aware of an off-by-one scenario)
//  length = targetSum + 1 (9)


// 2. Initialize the table with default values 
//  -choose compatible types (match return type with table value type. ie number to number)
//  initialize all positions with value of null

// 3. Seed the trivial answer into the table
//  -capture the scenario where I have a trivially small instance of the input with a known answer
//  seed index[0] with empty array []


// 4. Iterate through the table (hard part)
//  -create logic that fills further positions of the table based on the current position
//  -to do this, focus on what options I have at any point in the problem (choose any number from array)
//  at 0, look forward by number values (2,3,5) and add num if current position is not null
//  repeat iteration shifting forward one position each time
//  compare length of arrays to select the shortest one

// Complexity: both these terms affect the complexity:
// m = targetSum
// n = numbers.length
// O(m^2*n) time - at most we need to copy over an array of an additional length of m.
// O(m^2) space
// it's polinomial, not exponential, so it should run quickly enough.

// Let's code it up:

const bestSum = (targetSum, numbers) => {
 const table = Array(targetSum + 1).fill(null);
 table[0] = [];
 
 for (let i=0; i<= targetSum; i++) {
  if (table[i] !== null) {
   for (let num of numbers) {
    const combination = [...table[i], num]; // store possible combination to compare next
    if (!table[i + num] || table[i + num].length > combination.length) { // if it's longer, replace it:
     table[i + num] = combination; // replace longer value with shorter option
    }
   }
  }
 }
 return table[targetSum];
}

console.log(bestSum(7, [5,3,4,7])); // [7]
console.log(bestSum(8, [2,3,5])); // [3,5]
console.log(bestSum(8, [1,4,5])); // [4,4]
console.log(bestSum(100, [1,2,5,25])); // [25,25,25,25]... [Done] exited with code=0 in 0.064 seconds!