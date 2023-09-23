/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleDinosaurData` variable below to gain access to tickets data. This data is pulled from the `data/dinosaurs.js` file.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.

  Keep in mind that your functions must still have and use a parameter for accepting all dinosaurs.
*/
const exampleDinosaurData = require("../data/dinosaurs");
// Do not change the line above.

/**
 * getLongestDinosaur()
 * ---------------------
 * Returns an object with the longest dinosaur from the list. Converts from meters to feet.
 *
 * NOTE: To convert from meters to feet, multiply the meters by `3.281`.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @returns {Object} An object where the key is the name of the dinosaur and the value is the height of the dinosaur in feet.
 *
 * EXAMPLE:
 *  getLongestDinosaur(dinosaurs);
 *  //> { Brachiosaurus: 98.43 }
 */
function getLongestDinosaur(dinosaurs) {
  if (dinosaurs.length === 0) {
    return {};
  }
//The above returns an empty object if the list is empty. In line 25, i am at the start of defining a function with the name of getLongestDinosaur() which in this case takes on one argument
//inside of the parameters titled dinosaurs, which also in this case is expected to be an array of dinosaur objects. In line 26, i have included a conditional statement to check if the dinosaurs array 
//is empty. If the array is empty, this conditional statement will allow the return of an empty object (`{}`).

  let longestDinosaurName = '';
  let longestDinosaurHeightFeet = 0;

  // In the above i have initialized 2 variables. This is so that i can keep track of the name and height in feet of the longest dinosaur found. 

  for  (const dinosaur of dinosaurs) { //This line marks the beginning of my for...of loop. My loop is intended to iterate over each dionsaur object in the dinosaurs array one at a time.
    const { name, lengthInMeters } = dinosaur;// I am using the destructoring in this line to extract the name and lengthInMeters properties from the current dinosaur object.
    const lengthInFeet = lengthInMeters * 3.281; //In this line, i am making the conversion. I am converting meters into feet here. This line calculates the lengthInFeet.Here, the code calculates the lengthInFeet by converting the lengthInMeters to feet. The conversion factor used is 3.281, as 1 meter is approximately equal to 3.281 feet.

    if (lengthInFeet > longestDinosaurHeightFeet) {//In this line i have created another conditional statement comparing the lengthInFeet of the current dinosaur with the longestDinosaurHeightFeet value. If the current dinosaur is taller, it will be entered into the if block. This condition is used to determine if the current dinosaur is taller than the previously recorded longest dinosaur.
      longestDinosaurName = name;  // Within this block, the longestDinosaurName is expected to update to the name of the current dinosaur and the longestDinosaurHeightFeet is expected to update to
      longestDinosaurHeightFeet = lengthInFeet; //the lengthInFeet also of the current dinosaur, which is how my code is to keep track of the longest dinosaur found
    } // This completes the end of the if block
  } //This completes the end of my loop
  const result = {};  // In this line, i am initializing an empty object called result which will be used to store the ending results.(The name and height of the longest dinosaur)
  result[longestDinosaurName] = longestDinosaurHeightFeet; // In this line, i am assigning a property to the result object. Here the property name is set to longestDinosaurName which will hold the name of the longest dinosaur(in feet) and the property value is set to longestDinosaurHeightFeet which will hold the length of the longest dinosaur in feet.
  return result; // This line will return back the result object that will contain the name and height in feet of the longest dinosaur found in the dinosaurs array.
}

// This function iterates through the dinosaur objects, calculates the length in feet, and keeps track of the longest dinosaur found along with its name and height in feet.

/**
 * getDinosaurDescription()
 * ---------------------
 * Returns a formatted description of a dinosaur. If the dinosaur cannot be found, returns an error message.
 *
 * NOTE: Carefully view the test output and example below to see how the returned string should be formatted.
 *
 * NOTE: The `\n` represents a new line in text.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @param {string} id - The unique identifier for the dinosaur.
 * @returns {string} A detailed description of the dinosaur.
 *
 * EXAMPLE:
 *  getDinosaurDescription(dinosaurs, "U9vuZmgKwUr");
 *  //> "Xenoceratops (ZEE-no-SEH-ruh-tops)\nXenoceratops had horns and a bony frill with elaborate ornamentation of projections, knobs, and spikes. It lived in the Early Cretaceous period, over 77.5 million years ago."
 *
 *  getDinosaurDescription(dinosaurs, "incorrect-id");
 *  //> "A dinosaur with an ID of 'incorrect-id' cannot be found."
 */
function getDinosaurDescription(dinosaurs, id) { //Here in this function, it takes two parameters: dinosaurs, which is an array of dinosaur objects, and id, which is the ID of the dinosaur picked to be described.
  for (let i = 0; i < dinosaurs.length; i++) {// Here i am starting my for loop. My intentions with this loop is to iterate over the dinosaurs array. My for loop initializes a variable i to 0 also allowing my loop to continue as long as the i is less than the length of the dinosaurs array.
    const dinosaur = dinosaurs[i];// Here inside of my loop, the current dinosaur object from the dinosaurs array is pulled and then stored into the created variable dinosaur.

    if (dinosaur.dinosaurId === id) { // Here in my function, this line is to check if the dinosaurId property of the current dinosaur object matches the id passed to the function. Its search is to find a dinosaur with a specified ID.
      const {   //If a matching dinosaur is found, this part uses destructuring to extract various properties of the dinosaur object, such as name, pronunciation, meaningOfName, and so on, and stores them in separate variables.
        name,
        pronunciation,
        meaningOfName,
        diet,
        lengthInMeters,
        period,
        mya,
        info,
      } = dinosaur;

      let ID = `${name} (${pronunciation})\n${info} It lived in the ${period} period, over ${mya[mya.length - 1]} million years ago.` //Here im creating a string called ID that is to contain the formatted description of the dinosaur. This includes the dinosaurs name, pronunciation, information, period it lived in, and the number of million years ago it lived.

      return ID; // If a matching dinosaur is found, this line is to have the ID string immediately return, which will represent the description of the dinosaur.
    }
  }
// This marks the end of my for loop. (If no matching dinosaur is found within the loop, the loop continues to the next dinosaur object in the array.)
  return `A dinosaur with an ID of '${id}' cannot be found.`; // If the loop finishes without finding a matching dinosaur, this line will return this string indicating such status that no dinosaur with the specified ID was found.
}

// So, this function iterates through the dinosaurs array to find a dinosaur with a specific ID. If it finds one, it constructs a detailed description of that dinosaur and returns it. If no match is found, it returns an error message.

/**
 * getDinosaursAliveMya()
 * ---------------------
 * Returns an array of dinosaurs who were alive at the given `mya` (i.e. "millions of years ago") value. If a `key` is provided, returns the value of that key for each dinosaur alive at that time. Otherwise, returns the ID.
 *
 * If the dinosaur only has a single value for `mya`, allows for the `mya` value to be equal to the given value or one less. For example, if a dinosaur has a `mya` value of `[29]`, the dinosaur's information will be returned if `29` is entered or `28` is entered.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @param {number} mya - "Millions of years ago."
 * @param {string} key - An optional parameter. If included, for dinosaurs that lived during the `mya` value given, will return the value of the supplied key. Otherwise, returns the ID.
 * @returns {*[]} An array of values, which depend on the key given. The array should only include data of dinosaurs who lived during the given time period.
 *
 * EXAMPLE:
 *  getDinosaursAliveMya(dinosaurs, 150);
 *  //> ["YLtkN9R37", "GGvO1X9Zeh", "BFjjLjea-O", "V53DvdhV2A"]
 *
 *  getDinosaursAliveMya(dinosaurs, 65);
 *  //> ["WHQcpcOj0G"]
 *
 *  getDinosaursAliveMya(dinosaurs, 65, "name");
 *  //> ["Dracorex"]
 *
 *  getDinosaursAliveMya(dinosaurs, 65, "unknown-key");
 *  //> ["WHQcpcOj0G"]
 */
function getDinosaursAliveMya(dinosaurs, mya, key) { //This function has three parameters: dinosaurs, which is an array of dinosaur objects, mya, which is a number representing "millions of years ago", and key.

  return dinosaurs                
    .filter((dinosaur) => { // Here i am using the filter method to create a new array containing only the dinosaur objects that meet the condition below. In this case, the filter method is used and it starts a callback function that is to apply to each dinosaur in the dinosaurs array.
      if (dinosaur.mya.length === 1) { // This if statment is to check if the mya property of the current dinosaur object is an array of length 1. Its used to handle dinosaurs with a single mya value.
        return (mya === dinosaur.mya[0]) || mya === dinosaur.mya[0] - 1; //If the dinosaur has a single mya value, this line checks if the mya parameter passed to the function matches that value exactly or is one less. This is because dinosaurs with a single mya value are considered to be alive at that exact time or one million years before.
      }
      return mya <= dinosaur.mya[0] && mya >= dinosaur.mya[1]; //If the dinosaur has a range of mya values (i.e., an array of length 2), this part checks if the mya parameter passed to the function falls within that range. It returns true for dinosaurs that lived during that period.
    })
    .map((dinosaur) => (key ? dinosaur[key] || dinosaur.dinosaurId : dinosaur.dinosaurId)); //After filtering the dinosaurs based on their mya, the map method is used to create a new array. This array can contain either the dinosaur's dinosaurId (if no key is provided) or the value of the specified key property from the dinosaur object (if key is provided). If the key property is not found or is falsy (like null or undefined), it defaults to dinosaur.dinosaurId.

}

// So, this function filters the dinosaurs based on the mya parameter, keeping only those that match the criteria for being alive during that time. It then constructs a new array containing either dinosaurId values or values of a specified key property for those filtered dinosaurs.









module.exports = {
  getLongestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
