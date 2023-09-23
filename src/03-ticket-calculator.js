/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleTicketData` variable below to gain access to tickets data. This data is pulled from the `data/tickets.js` file.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.

  Keep in mind that your functions must still have and use a parameter for accepting all tickets.
*/
const exampleTicketData = require("../data/tickets");
// Do not change the line above.

/**
 * calculateTicketPrice()
 * ---------------------
 * Returns the ticket price based on the ticket information supplied to the function. The `ticketInfo` will be in the following shape. See below for more details on each key.
 * const ticketInfo = {
    ticketType: "general",
    entrantType: "child",
    extras: ["movie"],
  };
 *
 * If either the `ticketInfo.ticketType` value or `ticketInfo.entrantType` value is incorrect, or any of the values inside of the `ticketInfo.extras` key is incorrect, an error message should be returned.
 *
 * @param {Object} ticketData - An object containing data about prices to enter the museum. See the `data/tickets.js` file for an example of the input.
 * @param {Object} ticketInfo - An object representing data for a single ticket.
 * @param {string} ticketInfo.ticketType - Represents the type of ticket. Could be any string except the value "extras".
 * @param {string} ticketInfo.entrantType - Represents the type of entrant. Prices change depending on the entrant.
 * @param {string[]} ticketInfo.extras - An array of strings where each string represent a different "extra" that can be added to the ticket. All strings should be keys under the `extras` key in `ticketData`.
 * @returns {number} The cost of the ticket in cents.
 *
 * EXAMPLE:
 *  const ticketInfo = {
      ticketType: "general",
      entrantType: "adult",
      extras: [],
    };
    calculateTicketPrice(tickets, ticketInfo);
    //> 3000
 *  
 * EXAMPLE:
 *  const ticketInfo = {
      ticketType: "membership",
      entrantType: "child",
      extras: ["movie"],
    };
    calculateTicketPrice(tickets, ticketInfo);
    //> 2500

 * EXAMPLE:
 *  const ticketInfo = {
      ticketType: "general",
      entrantType: "kid", // Incorrect
      extras: ["movie"],
    };
    calculateTicketPrice(tickets, ticketInfo);
    //> "Entrant type 'kid' cannot be found."
 */
    function calculateTicketPrice(ticketData, ticketInfo) { //This line defines the calculateTicketPrice function, which takes two parameters: ticketData (an object containing pricing information for different ticket types and extras) and ticketInfo (an object representing the specific ticket to be calculated).
     let priceForTickets = 0;  //This line initializes a variable priceForTickets to 0. This variable will be used to accumulate the total price of the ticket, including any extras.

     if (!ticketData[ticketInfo.ticketType])
     return `Ticket type '${ticketInfo.ticketType}' cannot be found.`; //This if statement checks if the ticketInfo.ticketType exists as a key in the ticketData object. If it doesn't, it means the specified ticket type is not found in the data, and it returns an error message indicating that the ticket type cannot be found.

     if (!ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType])
     return `Entrant type '${ticketInfo.entrantType}' cannot be found.`; //This if statement checks if the ticketInfo.entrantType exists as a key within the priceInCents object of the specified ticketType. If it doesn't, it means the specified entrant type is not found for the given ticket type, and it returns an error message indicating that the entrant type cannot be found.

     priceForTickets = ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType]; // This line calculates the base price for the ticket by accessing the priceInCents object nested within the specified ticketType and retrieving the price for the specified entrantType. It assigns this price to the priceForTickets variable.

     for (let extra of ticketInfo.extras) {
      if (!ticketData.extras[extra]) {
        return `Extra type '${extra}' cannot be found.`;
      }
      priceForTickets += ticketData.extras[extra].priceInCents[ticketInfo.entrantType];
     }  //This loop iterates through each item in the ticketInfo.extras array. For each extra, it checks if the extra type exists as a key in the ticketData.extras object. If it doesn't, it means the specified extra type is not found in the data, and it returns an error message. Otherwise, it adds the price of the extra for the specified entrantType to the priceForTickets variable.

     return priceForTickets // After the calculations for the total ticket price (including base price and extras) is done, this line will return the priceForTickets, which represents the cost of the ticket in cents.
    }
    
// This function essentially calculates the total price of a ticket based on the provided ticketInfo, taking into account the ticket type, entrant type, and any selected extras. If any of these values are invalid or not found in the ticketData object, it returns an error message. Otherwise, it returns the total price in cents.

/**
 * purchaseTickets()
 * ---------------------
 * Returns a receipt based off of a number of purchase. Each "purchase" maintains the shape from `ticketInfo` in the previous function.
 *
 * Any errors that would occur as a result of incorrect ticket information should be surfaced in the same way it is in the previous function.
 * 
 * NOTE: Pay close attention to the format in the examples below and tests. You will need to have the same format to get the tests to pass.
 *
 * @param {Object} ticketData - An object containing data about prices to enter the museum. See the `data/tickets.js` file for an example of the input.
 * @param {Object[]} purchases - An array of objects. Each object represents a single ticket being purchased.
 * @param {string} purchases[].ticketType - Represents the type of ticket. Could be any string except the value "extras".
 * @param {string} purchases[].entrantType - Represents the type of entrant. Prices change depending on the entrant.
 * @param {string[]} purchases[].extras - An array of strings where each string represent a different "extra" that can be added to the ticket. All strings should be keys under the `extras` key in `ticketData`.
 * @returns {string} A full receipt, with each individual ticket bought and the total.
 *
 * EXAMPLE:
 *  const purchases = [
      {
        ticketType: "general",
        entrantType: "adult",
        extras: ["movie", "terrace"],
      },
      {
        ticketType: "general",
        entrantType: "senior",
        extras: ["terrace"],
      },
      {
        ticketType: "general",
        entrantType: "child",
        extras: ["education", "movie", "terrace"],
      },
      {
        ticketType: "general",
        entrantType: "child",
        extras: ["education", "movie", "terrace"],
      },
    ];
    purchaseTickets(tickets, purchases);
    //> "Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\nAdult General Admission: $50.00 (Movie Access, Terrace Access)\nSenior General Admission: $35.00 (Terrace Access)\nChild General Admission: $45.00 (Education Access, Movie Access, Terrace Access)\nChild General Admission: $45.00 (Education Access, Movie Access, Terrace Access)\n-------------------------------------------\nTOTAL: $175.00"

 * EXAMPLE:
    const purchases = [
      {
        ticketType: "discount", // Incorrect
        entrantType: "adult",
        extras: ["movie", "terrace"],
      }
    ]
    purchaseTickets(tickets, purchases);
    //> "Ticket type 'discount' cannot be found."
 */

    function purchaseTickets(ticketData, purchases) {  //This line defines the purchaseTickets function, which takes two parameters: ticketData (an object containing pricing information for different ticket types and extras) and purchases (an array representing the tickets to be purchased).
      let purchaseTotal = 0;
      let receipt = "";

      //These two lines above initialize two variables: purchaseTotal (to keep track of the total cost of the purchased tickets) and receipt (to store the receipt as a string).
    
      for (let i = 0; i < purchases.length; i++) { //This line starts a for loop that iterates over each ticket purchase in the purchases array.
        let ticketPrice = calculateTicketPrice(ticketData, purchases[i]); //Inside the loop, this line calculates the price of the current ticket purchase by calling the calculateTicketPrice function with ticketData and the current purchase (purchases[i]). It assigns the calculated price to the ticketPrice variable.
    
        if (typeof ticketPrice === "string") { //This if statement checks if the ticketPrice is a string. If it is, it means that an error message was returned by calculateTicketPrice, indicating an issue with the purchase. In this case, it returns the error message.
          return ticketPrice; //If an error message is returned, the function immediately exits and returns the error message.
        } else {  //If the ticketPrice is not a string (i.e., a valid ticket price was calculated), it proceeds to create the receipt for the purchase.
          const entrantCaps = purchases[i].entrantType[0].toUpperCase() + purchases[i].entrantType.slice(1); //For lines 146 and 147:these lines capitalize the first letter of the entrantType and ticketType of the current purchase and store them in entrantCaps and ticketTypeCaps, respectively.
          const ticketTypeCaps = purchases[i].ticketType[0].toUpperCase() + purchases[i].ticketType.slice(1);
          const extrasFormatted = purchases[i].extras.map(extra => extra[0].toUpperCase() + extra.slice(1) + ' Access').join(", "); //This line formats the extras by capitalizing the first letter of each extra, adding " Access" to the end, and joining them into a comma-separated string stored in extrasFormatted.
    
          if (purchases[i].extras.length === 0) { //This if statement checks if there are no extras in the current purchase.
            receipt += `${entrantCaps} ${ticketTypeCaps} Admission: $${(ticketPrice / 100).toFixed(2)}\n`; //If there are no extras, it adds a line to the receipt indicating the ticket purchase with the price formatted as dollars (divided by 100 to convert cents to dollars) with two decimal places.
          } else { //If there are extras, it enters this branch of the if statement.
            receipt += `${entrantCaps} ${ticketTypeCaps} Admission: $${(ticketPrice / 100).toFixed(2)} (${extrasFormatted})\n`; //It adds a line to the receipt indicating the ticket purchase with the price formatted as dollars and a list of extras formatted as previously described.
          }
    
          purchaseTotal += ticketPrice; // This line adds the current ticket's price to the purchaseTotal to keep track of the total cost.
        }
      } //This marks the end of my for loop which is intended to iterate over all purchases.
      return `Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n${receipt}-------------------------------------------\nTOTAL: $${(purchaseTotal / 100).toFixed(2)}`;
    } //This line is for the function to return a formatted receipt that includes all ticket purchases, their prices, and the total cost. The receipt is constructed as a string with appropriate line breaks and formatting.
    
    //This function is to calculate the total cost of all ticket purchases, constructs a receipt for them, and return the receipt as a string. If any of the ticket prices are invalid (i.e., an error message is returned by calculateTicketPrice), it immediately exits and returns the error message.





    
// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
