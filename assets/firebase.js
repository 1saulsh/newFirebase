$(document).ready(function(){



 // Initialize Firebase
 var config = {
   apiKey: "AIzaSyCiaqN41r48LNVRPrSfQwRwYgrbgsDwB7k",
   authDomain: "train-scheduler-db020.firebaseapp.com",
   databaseURL: "https://train-scheduler-db020.firebaseio.com",
   projectId: "train-scheduler-db020",
   storageBucket: "",
   messagingSenderId: "101915537776"
 };
 firebase.initializeApp(config);

  // Create a variable to reference the database.
  var database = firebase.database();

  // Initial Values
  var trainName= "";
  var destination = "";
  var firstTrainTime = "";
  var frequency = 0;

  // Capture Button Click(Button for adding new users)
  $("#addTrain").on("click", function(event) {
    event.preventDefault();

    // Grabbed values from text boxes
    trainName = $("#trainInput").val().trim();
    destination = $("#destinationInput").val().trim();
    
    //Convert to Unix
    firstTrainTime = $("#firstTrainInput").val().trim();
    frequency = $("#frequencyInput").val().trim();

    console.log(trainName);
    console.log(destination); 
    console.log(firstTrainTime);
    console.log(frequency);

    // Code for handling the push (essentially pushing user input (variables) to the database)
    database.ref().push({
      trainName: trainName,
      destination: destination,
      firstTrainTime: firstTrainTime,
      frequency: frequency,
      //dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
   
    return false;
  });

  // Firebase watcher + initial loader + order/limit HINT: .on("child_added"
  database.ref().on("child_added", function(snapshot) {
   
   // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();

    // Update the variable with data from the database
    $("#trainName").text(sv.trainName);
    $("#destination").text(sv.destination);
    $("#firstTrainTime").text(sv.firstTrainTime);
    $("#frequency").text(sv.frequency);

    // Console.logging the last user's information
    console.log(sv.trainName);
    console.log(sv.destination);
    console.log(sv.firstTrainTime);
    console.log(sv.frequency);

 // moment.js methods for time calls and calculations. lines 57 to 65 were accomplished with Tenor's assistance. I didn't update the current time. It looks like "Minutes Away" may be larger than the frequency interval :(
 var firstTrainMoment = moment(firstTrainTime, 'HH:mm');
 var nowMoment = moment(); // creates a moment object of current date and time and storing it in a variable whenever the user click the submit button

 var minutesSinceFirstArrival = nowMoment.diff(firstTrainMoment, 'minutes');
 var minutesSinceLastArrival = minutesSinceFirstArrival % frequency;
 var minutesAway = frequency - minutesSinceLastArrival;

 var nextArrival = nowMoment.add(minutesAway, 'minutes');
 var formatNextArrival = nextArrival.format("HH:mm");

   // add to table
    $("trainTable > tbody").append("<tr><td>" + trainName + "<td><td>" + destination + "<td><td>" + frequency + "<td><td>" + formatNextArrival + "<td><td>" + minutesAway);
  
   // Handle the errors
   }, function(errorObject) {
   //In case of error this will print the error
    console.log("Errors handled: " + errorObject.code);
   });

});