// gridTraveler Tabulation:

// Challenge Scenario:
// You are a traveler on a 2D grid.
// You begin in the top-left corner.
// Your goal is to travel to the bottom-right corner.
// You may only move down or right.

// In how many ways can you travel to the goal on a grid with dimensions m * n?
// Write a function 'gridTraveler(m,n)' that calculates this.

// gridTraveler(3,3) -> go down once, then it becomes gridTraveler(2,3)... = 6 ways

// Tabulation Process:
// 1. Create a table that is roughly the size of the input (establish dimensions)
// 2. Seed the starting values within the table
// 3. Iterate through the table and create logic with for loops


// in this case there are 2 inputs that represent the number of columns and rows
// we can create a 2D array to correspond to that. for this example an array of 4x4 to account for 0 index
// For counting problems, a good initial value to choose is 0. so seed 0 to all positions...
// We  know that gridTraveler(1,1) should return 1 (one way to get to bottom right of grid that size) so,
// Seed the starting value at position 1,1 with the value of 1.
// then, iterate through the table and create logic that combines the values in the table
// do this using nested for loops. take current postition value, add to right and down neighbours

// the complexity is driven by the dimensions of the table. it has n rows and n columns.
// O(mn) time
// O(mn) space

// Let's code it up:
// create a 2D table (array) with dimensions m + 1
// fill it up
// use map so that every element of the array is going to be a new array 
// make sure the dimensions of the new array has columns of length n + 1
// insert seed values. fill the new may array with 0s
// insert seed value for position 1,1 since we know that should show 1 (1 way to reach goal from there)
// iterate through the table and fill in the positions using nested loops
// take the current element we're at, add it into the right neighbour and down neighbour
// be aware of what happens at the edges. don't go out of bounds...
// create conditional logic to check if location is in bounds and add before neighbour additioning

const gridTraveler = (m, n) => {
 const table = Array(m + 1) // create a table with rows = m + 1
 .fill()
 .map(() => Array(n + 1).fill(0)); // use map then seed all with 0 and position 1,1 with 1
 table[1][1] = 1;
 for (let i=0; i<= m; i++) { // iterate through table to fill with values using nested loops
  for (let j=0; j<=n; j++) {
   const current = table[i][j]; // create current element location
   if (j + 1 <= n) table[i][j + 1] += current; // if in bounds, add current to row + 1 and column + 1
   if (i + 1 <= m) table[i + 1][j] += current;
  }
 }
 return table[m][n];
}

// Expected Results:
console.log(gridTraveler(1,1)); // 1
console.log(gridTraveler(2,3)); // 3
console.log(gridTraveler(3,2)); // 3
console.log(gridTraveler(3,3)); // 6
console.log(gridTraveler(18,18)); // 2333606220 ... [Done] exited with code=0 in 0.104 seconds!