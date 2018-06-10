  // Initialize and connect Firebase server
  var config = {
    apiKey: "AIzaSyCiaqN41r48LNVRPrSfQwRwYgrbgsDwB7k",
    authDomain: "train-scheduler-db020.firebaseapp.com",
    databaseURL: "https://train-scheduler-db020.firebaseio.com",
    projectId: "train-scheduler-db020",
    storageBucket: "train-scheduler-db020.appspot.com",
    messagingSenderId: "101915537776"
  };

  firebase.initializeApp(config);

  // Create a variable to reference the database.
  var database = firebase.database();

  // Everytime user clicks submit button.. store user data input of train name, destination, first train and frequency 
  $("#addTrainBtn").on("click", function() {
     
        // Initial Values Grabbed values from text boxes
        var trainName = $("#trainNameInput").val().trim();
        var destination = $("#destinationInput").val().trim();
        //turning first train input into a unix variable
        var firstTrain = moment($("#firstTrainInput").val().trim(),"HH:mm").subtract(10,"years").format("X");
        var frequency = $("#frequencyInput").val().trim();

        console.log(firstTrain);
        
//         // Creates local "temporary" object for holding train data
        var newTrain = {
             name: trainName,
             destination: destination,
             firstTrain: firstTrain,
             frequency: frequency,
 }

        // Uploads train data to the database
        database.ref().push(newTrain);

        // Alert
        alert("Train successfully added");

        //Clears all of the text-boxes
        $("#trainNameInput").val("");
        $("#destinationInput").val("");
        $("#firstTrainInput").val("");
        $("#frequencyInput").val("");

        // so page doesn't refresh since we are using a "submit" button type
        return false;
  });
// Creates a Firebase  event for adding train to the database and a row in the html when a user adds an entry   
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

        //Store everything into a variable
        var name = childSnapshot.val().name;
        var destination = childSnapshot.val().destination;
        var firstTrain = childSnapshot.val().firstTrain;
        var frequency = childSnapshot.val().frequency;


        var remainder = moment().diff(moment.unix(firstTrain),"minutes")%frequency;
        var minutes = frequency - remainder;
        var arrival = moment().add(minutes, "m").format("hh:mm A");

        console.log(remainder);
        console.log(minutes);
        console.log(arrival);

        // Add each train's data into the table
        $("#train-table > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + arrival + "</td><td>" + minutes + "</td></tr>");
    
});

// Assume the following situations. 

// (TEST 1) 
// First Train of the Day is 3:00 AM 
// Assume Train comes every 3 minutes.
// Assume the current time is 3:16 AM....
// What time would the next train be...? (Use your brain first)
// It would be 3:18 -- 2 minutes away

// (TEST 2) 
// First Train of the Day is 3:00 AM 
// Assume Train comes every 7 minutes.
// Assume the current time is 3:16 AM....
// What time would the next train be...? (Use your brain first)
// It would be 3:21 -- 5 minutes away


// ==========================================================

// Solved Mathematically
// Test case 1: 
// 16 - 00 = 16
// 16 % 3 = 1 (Modulus is the remainder)
// 3 - 1 = 2 minutes away
// 2 + 3:16 = 3:18

// Solved Mathematically  
// Test case 2: 
// 16 - 00 = 16
// 16 % 7 = 2 (Modulus is the remainder)
// 7 - 2 = 5 minutes away
// 5 + 3:16 = 3:21


   
//         // Declare variable
//         var trainFreq;

//         // Time is to be entered on the entry form
//         var firstTime = 0;

//     var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
//     console.log(firstTimeConverted);

//     // Current Time
//     var currentTime = moment();
//     console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

//     // Difference between the times
//     var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
//     console.log("DIFFERENCE IN TIME: " + diffTime);

//     // Time apart (remainder)
//     var tRemainder = diffTime % trainFrequency;
//     console.log(tRemainder);

//     // Minute Until Train
//     var tMinutesTillTrain = trainFrequency - tRemainder;
//     console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

//     // Next Train
//     var nextTrain = moment().add(tMinutesTillTrain, "minutes");
//     console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));

 //});
  
