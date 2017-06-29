$(document).ready(function() {
    $("#departing").datepicker();
    $("#returning").datepicker();
    $("button").click(function() {
        var selected = $("#dropdown option:selected").text();
        var departing = $("#departing").val();
        var returning = $("#returning").val();
    });
});

var config = {
        apiKey: "AIzaSyDCY3lAwOFJn9QaR83WlUOOK1AauG_ezWY",
        authDomain: "buddy-3f375.firebaseapp.com",
        databaseURL: "https://buddy-3f375.firebaseio.com",
        projectId: "buddy-3f375",
        storageBucket: "buddy-3f375.appspot.com",
        messagingSenderId: "501948672835"
      };
      firebase.initializeApp(config);

    var database = firebase.database();

    var postRef = database.ref('events');
    var usersRef = database.ref('users');

    var storage = firebase.storage();

    var storageRef = firebase.storage().ref();

    var provider = new firebase.auth.GoogleAuthProvider();
    var user = [];
    var Profilep = document.getElementById("ProfilePic");
    var Welom = document.getElementById("Welcome");
    function writeUserData(userId, name, email) {
      firebase.database().ref('users/' + userId).set({
        username: name,
        email: email,
      });
    }
    function LoginFaceBook(x) {
            if (x) {
                var provider = new firebase.auth.FacebookAuthProvider();
                firebase.auth().signInWithPopup(provider).then(function(result) {
                  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                  var token = result.credential.accessToken;
                  // The signed-in user info.
                  user = result.user;
                  console.log(user);
                  // ...
                  writeUserData(user.uid, user.displayName, user.email);
                  x.style.display = 'none';
                  Profilep.style.display = 'inline';
                  Profilep.src = user.photoURL;
                  Welom.innerHTML = ('Welcome, ' + user.displayName).bold();
                }).catch(function(error) {
                  // Handle Errors here.
                  var errorCode = error.code;
                  var errorMessage = error.message;
                  // The email of the user's account used.
                  var email = error.email;
                  // The firebase.auth.AuthCredential type that was used.
                  var credential = error.credential;
                  // ...
                });
            }
        }
