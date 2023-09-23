/*
  Do not change the lines below. If you'd like to run code from this file, you may use the `exampleDinosaurData` and `exampleRoomData` variables below to gain access to each data set. This data is pulled from the relevant files in the `data/` directory.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.
*/
const exampleDinosaurData = require("../data/dinosaurs");
const exampleRoomData = require("../data/rooms");
// Do not change the lines above.

/**
 * getRoomByDinosaurName()
 * ---------------------
 * Return the name of the room where the given dinosaur can be found. If the dinosaur does not exist in the `dinosaurs` list or cannot be found in any room, return an error message that says so.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @param {Object[]} rooms - An array of room objects. See the `data/rooms.js` file for an example of the input.
 * @param {string} dinosaurName - The name of the dinosaur.
 * @returns {string} The name of the room where the dinosaur can be found. Alternatively, an error message.
 *
 * EXAMPLE:
 *  getRoomByDinosaurName(dinosaurs, rooms, "Tyrannosaurus");
 *  //> "Roberts Room"
 *
 * EXAMPLE:
 *  getRoomByDinosaurName(dinosaurs, rooms, "Pterodactyl");
 *  //> "Dinosaur with name 'Pterodactyl' cannot be found."
 */
function getRoomByDinosaurName(dinosaurs, rooms, dinosaurName) {  // In this line i am declaring a function that takes three parameters: dinosaurs, rooms, and dinosaurName. These parameters represent the list of dinosaurs, list of rooms and the name of the dinosaur.
  const dinosaur = dinosaurs.find(dino => dino.name === dinosaurName); // I used the find method to search for a dinosaur in the dinosaurs array. It is taking in a callback function as an argument. In this case it is used to specifically look for a dinosaur whose name property matches the provided dinosaur name.If a matching dinosaur is found, it is stored in the dinosaur variable. If no matching dinosaur is found, dinosaur will be undefined, indicating that the dinosaur with the given name was not found in the list.

  if (!dinosaur) { // In this line i am checking to see if dinosaur is falsy or undefined. If undefined, this means that the provided name was not found in the list of names thus returning an error message which will indicate that the dinosaur with the provided name cannot be found.
    return `Dinosaur with name '${dinosaurName}' cannot be found.`;
  }

  const room = rooms.find(room => room.dinosaurs.includes(dinosaur.dinosaurId));
// Above, I used the find method on the rooms array to search for a room in the rooms array. The callback function here checks if the dinosaurs property of a room includes the dinosaurId which will indicate that the dinosaur can be found in that specific room.If a matching room is found, it is stored in the room variable. If no matching room is found, room will be undefined, indicating that the dinosaur cannot be found in any of the rooms.
  if (!room) {  //In this line i am checking to see if room is falsy or undefined. This line would be similar to line 31.
    return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`;
  }

  return room.name; // Here, if the data matches, the name property is what will be returned. The name property is what represents the name of the room where the dinosaur can be found.
}
// The above function first searches for the dinosaur by name, and if found, it then searches for the room where the dinosaur can be found based on its dinosaurId. It handles cases where the dinosaur is not found or is not found in any rooms, returning appropriate error messages in those cases.

/**
 * getConnectedRoomNamesById()
 * ---------------------
 * Returns an array of strings, where each string is the name of a room connected to the given room. If a room ID cannot be found, an error message is returned.
 *
 * @param {Object[]} rooms - An array of room objects. See the `data/rooms.js` file for an example of the input.
 * @param {string} id - A unique room identifier.
 * @returns {string|string[]} An array of room names, or an error message.
 *
 * EXAMPLE:
 *  getConnectedRoomNamesById(rooms, "aIA6tevTne");
 *  //> ["Ticket Center"]
 *
 * EXAMPLE:
 *  getConnectedRoomNamesById(rooms, "A6QaYdyKra");
 *  //> [
      "Entrance Room",
      "Coat Check Room",
      "Ellis Family Hall",
      "Kit Hopkins Education Wing"
    ]
 */
    function getConnectedRoomNamesById(rooms, id) { //This line declares the function getConnectedRoomNamesById with two parameters: rooms (an array of room objects) and id (the ID of the room we want to find connected rooms for).
  const room = rooms.find(room => room.roomId === id); //This line uses the find method to search for a room within the rooms array whose roomId property matches the id passed to the function. It assigns the found room object to the room variable.

  if (!room) {
    return `Room with ID of '${id}' could not be found.`;
  }  //This if statement checks if room is falsy, which means that no room with the specified ID was found in the rooms array. If that's the case, it returns an error message indicating that the room with the given ID could not be found.

  const connectedRoomNames = room.connectsTo.map(connectsId => {
    const connectedRoom = rooms.find(room => room.roomId === connectsId);
    return connectedRoom ? connectedRoom.name : `Room with ID of '${connectsId}' could not be found.`;
  });  //This block of code maps over the connectsTo array of the room object, which contains IDs of rooms connected to the current room. For each connectsId, it searches for the corresponding room in the rooms array and retrieves its name. If a connected room is found, it includes its name; otherwise, it includes an error message indicating that the room with the specified ID could not be found. The result is an array of connected room names or error messages.

  let possibleBrokenRoom = connectedRoomNames.find(room => room.includes("could not be found"))
 
  if (possibleBrokenRoom) {
    return possibleBrokenRoom
  } // Lines 79-83 is to check if any of the names include the substring "could not be found." If it finds any such name, it means that there's at least one connected room with an invalid ID, and it returns the error message for that room.

  const validConnectedRoomNames = connectedRoomNames.filter(name => typeof name === 'string'); //This line filters the connectedRoomNames array to include only names that are of type 'string' (i.e., valid room names). Any error messages indicating that a room could not be found are excluded.

  if (validConnectedRoomNames.length === 0) {
    return `No connected rooms found for room with ID '${id}'.`;
  } //If there are no valid connected room names in the validConnectedRoomNames array (i.e., if all connected rooms have issues or are not found), it returns an error message indicating that no connected rooms were found for the room with the specified ID.

  return validConnectedRoomNames;
} //For this ending return, if there are valid connected room names, it returns the array of valid connected room names.

 //This function essentially finds and returns the names of rooms connected to a specified room ID, handling cases where the specified room ID is invalid or where some of the connected rooms are not found. If any errors are encountered, it returns an error message instead of the room names.   

    
module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
