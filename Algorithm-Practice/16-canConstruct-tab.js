// canConstruct Tabulation

// Write a function 'canConstruct(target, wordBank)' that accepts a target string and an array of strings.

// The funtion should return a boolean indicating wheter or not the 'target' can be constructed by concatenating elements of the 'wordBank' array.

// You may reuse elements of 'wordBank' as many times as needed.

// Examples:
canConstruct('hi', ['hello', 'i']); // -> false. you can't take individual characters, just strings
canConstruct(abcdef, [ab, abc, cd, def, abcd]); // -> true (abc + def = abcdef)
canConstruct(skateboard, [bo,rd,ate,t,ska,sk,boar]); // -> false
canConstruct('', [cat, dog, mouse]); // -> true (take 0 elements from the array of strings)

// example for going through formula:
canConstruct(abcdef, [ab, abc, cd, def, abcd]); // -> true (abc + def = abcdef)

// 1. Visualize the problem as a table 
//  -size the table based on the inputs (be aware of an off-by-one scenario)
//  table length = target.length + 1 (7)

// 2. Initialize the table with default values 
//  -choose compatible types (match return type with table value type. ie number to number)
//  -initialize all values as false

// 3. Seed the trivial answer into the table
//  -capture the scenario where I have a trivially small instance of the input with a known answer
//  ** look at images. this is tricky. first position is EMPTY STRING. second is looking at a, third is ab...
//  fourth is abc, fifth is abcd, sixth is abcde, seventh is abcdef
//  *since position one represents the possibilty of creating an empty string, seed it with True

// 4. Iterate through the table (hard part)
//  -create logic that fills further positions of the table based on the current position
//  -to do this, focus on what options I have at any point in the problem...
//  1st iteration: is it legal (starts with correct character?) if so, look forward by number of chars in word
//  change that value to T, repeat looking forward by other word lengths that start with correct character
//  2nd iteration: move current position ahead one. check if it's true (giving back just an a...not possible)
//  3rd iteration: move current forward. check. initial is True (ab is possible) so do process, look ahead


// Complexity: both these terms affect the complexity:
// m = target
// n = wordBank.length
// O(m^2*n) time 
// O(m) space
// it's polinomial, not exponential, so it should run quickly enough.

// Let's code it up:

const canConstruct = (target, wordBank) => {
 const table = Array(target.length + 1).fill(false);
 table[0] = true;

 for (let i=0; i<= target.length; i++) {
  if (table[i] === true) {  // check that current position is true
   for (let word of wordBank) {
    // make sure words match their characters starting at current position i:
    if (target.slice(i, i + word.length) === word) { // if i'm at 0, it slices from 0 to 0+2 for ab, etc.
     table[i + word.length] = true;
    }
   }
  }
 }

 return table[target.length];
}


console.log(canConstruct('abcdef', ['ab', 'abc', 'cd', 'def', 'abcd'])); // true
console.log(canConstruct('skateboard', ['bo', 'rd', 'ate', 't', 'ska', 'sk', 'boar'])); // false
console.log(canConstruct('enterapotentpot', ['a', 'p', 'ent', 'enter', 'ot', 'o', 't'])); // true
console.log(canConstruct('eeeeeeeeeeeeeeeeeeeeeeeeeeeef', ['e', 'ee', 'eee', 'eeee', 'eeeee', 'eeeeee'])); // false ... [Done] exited with code=0 in 0.281 seconds!