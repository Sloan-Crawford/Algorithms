// countConstruct Tabulation

// Write a function'countConstruct(target, wordBank)' that accepts a target string and an array of strings.

// The function should return the NUMBER OF WAYS that the 'target' can be constructed by concatenating elements of the 'wordBank' array.

// You may reuse elements of 'wordBank' as many times as needed.

// Examples:
countConstruct(abcdef, [ab, abc, cd, def, abcd]) // -> 1 way

// example for going through formula:
countConstruct('purple', ['purp', 'p', 'ur', 'le', 'purpl']); // -> 2 

// 1. Visualize the problem as a table 
//  -size the table based on the inputs (be aware of an off-by-one scenario)
//  table length = target.length + 1 (7)
//  lign up target characters along bottom starting from left position (last one is blank)

// 2. Initialize the table with default values 
//  -choose compatible types (match return type with table value type. ie number to number)
//  -initialize all values as 0

// 3. Seed the trivial answer into the table
//  -capture the scenario where I have a trivially small instance of the input with a known answer
//  ** look at images. this is tricky. first position is EMPTY STRING. second is looking at a, third is ab...
//  fourth is abc, fifth is abcd, sixth is abcde, seventh is abcdef
//  *since position one represents the possibilty of creating an empty string, seed it with 1 (1 way)

// 4. Iterate through the table (hard part)
//  -create logic that fills further positions of the table based on the current position
//  -to do this, focus on what options I have at any point in the problem...
//  1st iteration: is it legal (starts with correct character?) if so, look forward by number of chars in word
//  add 1 to that value, repeat looking forward by other word lengths that start with correct character
//  other iterations: move current position ahead one. check if it's not 0, repeat.


// Complexity: both these terms affect the complexity:
// m = target
// n = wordBank.length
// O(m^2*n) time = ( m to iterate through array, n to look forward for each element, m for match check)
// O(m) space = (m for size of the table)
// it's polinomial, not exponential, so it should run quickly enough.

// Let's code it up:

const countConstruct = (target, wordBank) => {
 const table = Array(target.length + 1).fill(0);
 table[0] = 1; // 1 way to make an empty string
 
 for (let i=0; i<= target.length; i++) {
  for (let word of wordBank) {
   if (target.slice(i, i+word.length) === word) { // check if current slice of word = current word in wordB
    table[i + word.length] += table[i]; // increase look ahead value by number stored in current position
   }
  }
 }

 return table[target.length];
}


console.log(countConstruct('purple', ['purp', 'p', 'ur', 'le', 'purpl'])); // 2 
console.log(countConstruct('abcdef', ['ab', 'abc', 'cd', 'def', 'abcd'])); // 1
console.log(countConstruct('skateboard', ['bo', 'rd', 'ate', 't', 'ska', 'sk', 'boar'])); // 0
console.log(countConstruct('enterapotentpot', ['a', 'p', 'ent', 'enter', 'ot', 'o', 't'])); // 4
console.log(countConstruct('eeeeeeeeeeeeeeeeeeeeeeeeeeeef', ['e', 'ee', 'eee', 'eeee', 'eeeee', 'eeeeee'])); // 0 ... [Done] exited with code=0 in 0.048 seconds!