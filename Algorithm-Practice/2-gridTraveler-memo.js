// gridTraveler Memoization:

// Challenge Scenario:
// You are a traveler on a 2D grid.
// You begin in the top-left corner.
// Your goal is to travel to the bottom-right corner.
// You may only move down or right.

// In how many ways can you travel to the goal on a grid with dimensions m * n?
// Write a function 'gridTraveler(m,n)' that calculates this.

// Strategies:
// try to find base cases or invalid inputs (like 0)
// frame the problem in a way that I can decrease the problem size (usually by mutating the arguments to my function call)

// try easy examples:
// gridTraveler(0,1) -> invalid
// gridTraveler(1,1) -> 1 way
// gridTraveler(1,2) -> 1 way
// gridTraveler(2,2) -> 2 ways
// gridTraveler(2,3) -> 3 ways
// gridTraveler(3,3) -> go down once, then it becomes gridTraveler(2,3)... = 6 ways

// structure it like a tree:
// gridTraveler(2,3) -> see images

// implement the recursive strategy from the tree in code:
// when base case is hit, return 1
// when either m or n is 0, return 0
// get the sum of me going downward and me going rightward:
// remember, when going down, number of rows decreases by 1 and vice versa

const gridTraveler = (m,n) => {
 if (m === 1 && n === 1) return 1;
 if (m === 0 || n === 0) return 0;
 return gridTraveler(m - 1, n) + gridTraveler(m, n - 1);
};

// Expected Results:
console.log(gridTraveler(1,1)); // 1
console.log(gridTraveler(2,3)); // 3
console.log(gridTraveler(3,2)); // 3
console.log(gridTraveler(3,3)); // 6
console.log(gridTraveler(18,18)); // 2333606220 in 66 seconds. too long...

// brute force complexity:
// O(2^n+m) time
// O(n + m) space

// let's improve it:
// find the duplicate sub-trees (ex. (1,2) or (2,1)) and memoize it!
// add memo as empty object into the function arguments
// concatinate integers together with comma between to get a unique string to key into the object
// remember to assign the entire expression into the memo object
// don't forget to pass down the memo object by reference to all of the recursive calls

const gridTraveler = (m,n, memo = {}) => {
 const key = m + ',' + n;
 // are the arguments in the memo? check:
 if (key in memo) return memo[key];
 if (m === 1 && n === 1) return 1;
 if (m === 0 || n === 0) return 0;
 memo[key] = gridTraveler(m - 1, n, memo) + gridTraveler(m, n - 1, memo);
 return memo[key];
};

// [Done] exited with code=0 in 0.051 seconds!

// vs. memoized complexity:
// O(m * n) time
// O(n + m) space


