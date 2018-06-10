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
  //var currentTime = moment();


//     $("#trainTable > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + next + "</td><td>" + min + "</td></tr>");
// });

// database.ref().on("value", function(snapshot) {
   

// });

  // Capture Button Click(Button for adding new users)
  $("#addTrainBtn").on("click", function(event) {
      event.preventDefault();

  // Initial Values Grabbed values from text boxes
  var trainName= $("#trainNameInput").val().trim();
  var destination = $("#destinationInput").val().trim();
  var firstInput = $("#firstInput").val().trim();
  var frequency = $("#frequencyInput").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    start: firstTrain,
    frequency: trainFrequency
};

    // console.log(trainName);
    // console.log(destination); 
    // console.log(firstTrainTime);
    // console.log(frequency);

  // Uploads train data to the database
  database.ref().push(newTrain);

   // Alert
   alert("Train successfully added");

   //Clears all of the text-boxes
   $("#trainNameInput").val("");
   $("#destinationInput").val("");
   $("#firstInput").val("");
   $("#frequencyInput").val("");
  });

   // Creates a Firebase  event for adding train to the database and a row in the html when a user adds an entry   
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    console.log(childSnapshot.val());

    //Store everything into a variable
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().start;
    var trainFrequency = childSnapshot.val().frequency;
   
        // Declare variable
        var trainFreq;

        // Time is to be entered on the entry form
        var firstTime = 0;

    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % trainFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = trainFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));


    // Add each train's data into the table
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + 
    "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>");
    });

});
  
