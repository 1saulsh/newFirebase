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

  (function() {
      var app = document.querySelector("#app");

      app.signIn = function() {
          var email = app.email;
          var password = app.password;

          if (!email || !password) {
              return console.log("email and password required");
          }

          //Sign in user
          //firebase.auth allows one access firebase api
          firebase.auth().signInWithEmailAndPassword(email, password)
            .catch(function(error) {
                //handle errors here
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log("signIn error", error);
            });
      };
      
      app.register = function() {
          var email = app.email;
          var password = app.password;

          if (!email || !password) {
            return console.log("email and password required");
        }
  
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(function(error) { 
                console.log("register error", error);

                if (errorCode === "auth/email-already-in-use") {
                    var credential = firebase.auth.EmailAuthProvider.credential(email, password)
               
                    app.signInWithGoogle()
                        .then(function() {
                            firebase.auth().currentUser.link(credential)
                            .then(function(user) {
                                console.log("Account linkinig Success", user);
                            }, function(error) {
                                console.log("Account linking error", error);
                            
                            })
                        });
                    }
                });
            };
               
            app.signInWithGoogle =function() {
                //Sign in with Google
                var provider = new firebase.auth.GoogleAuthProvider();
                povider.addScope("profile");
                provider.addScope("email");

                return firebase.auth().signInWithPopup(provider)
                .catch (function (error) {
                    console.log ("Google sign in error", error);
                });
            };

            app.signOut = function(){
                //sign out
                firbase.auth().signOut();
            };

            //onAuthStatwChanged Linstner...Listens to auth state changes
            //.onAuthChanged allows a callback function to be passed in that takes a user object
            firebase.auth().onAuthStateChanged(function(user) {
                app.user = user;
                console.log("user", user);
            });

        })();
               