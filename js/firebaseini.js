// Initialize Firebase
var config = {
  apiKey: "AIzaSyCulHzfI4IXS2Zj-fyO1ZjY9iK1ray85LU",
  authDomain: "project-coco-59367.firebaseapp.com",
  databaseURL: "https://project-coco-59367.firebaseio.com",
  projectId: "project-coco-59367",
  storageBucket: "project-coco-59367.appspot.com",
  messagingSenderId: "686607252871"
};
firebase.initializeApp(config);

//request Permission to user Notification
function requestNotificationPermission() {
  if (Notification && Notification.permission === "default") {
    Notification.requestPermission(function(permission) {
      if (!("permission" in Notification)) {
        Notification.permission = permission;
      }
    });
  }
}
//send notification
function sendNotification(msg) {
  //let notif = new Notification(msg);

  if (Notification.permission === "granted") {
    let notification = new Notification("Welcome To Project COCO", {
      icon:
        "http://freeflaticons.com/wp-content/uploads/2014/09/coconut-copy-1410577237kn4g8.png",
      body: msg
    });

    setTimeout(notification.close.bind(notification), 5000);
  }
}

//for signing Up
function signUp(e) {
  e.preventDefault();

  let email = document.getElementById("signup_email").value;
  let password = document.getElementById("signup_password").value;
  let userName = document.getElementById("signup_name").value;
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)

    .then(function(response) {
      firebase
        .auth()
        .currentUser.updateProfile({
          displayName: userName
        })
        .then(
          function() {
            // Update successful.
            console.log("DisplayName succsess: " + response.displayName);
          },
          function(error) {
            // An error happened.
            console.log(error + " DisplayName");
          }
        );
      sendNotification(
        "Thanks for signing up to our website! Check your e-mail for account verification!"
      );
      sendVerificationEmail(response.user);
      document.getElementsByClassName("signup__text")[0].textContent =
        "Success!";
      console.log("success sign up");
    })
    .catch(function(error) {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;

      console.log(errorCode, errorMessage);
      document.getElementById("signup_error").innerHTML =
        errorCode + " - " + errorMessage;
    });
}

//sigining in
function logIn(e) {
  e.preventDefault();

  let email = document.getElementById("signin_email").value;
  let password = document.getElementById("signin_password").value;

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(function(response) {
      sendNotification("You are now logged in successfully!");
      showUserInfo(response.user);
      console.log("success sign in");
      // This  get displayName
      SuccessSignedIn(response.user.displayName);
    })
    .catch(function(error) {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;

      console.log(errorCode, errorMessage);
      document.getElementById("signin_error").innerHTML =
        errorCode + " - " + errorMessage;
    });
}

function signOut() {
  firebase
    .auth()
    .signOut()
    .then(
      function() {
        sendNotification("You are sign out!");
      },
      function(error) {
        console.error("Sign Out Error", error);
      }
    );
}
function sendVerificationEmail(user) {
  user
    .sendEmailVerification()
    .then(function() {
      // Email sent.
    })
    .catch(function(error) {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;

      console.log(errorCode, errorMessage);
    });
}

//Only works with https, https, chrome
function signInGoogle() {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
      sendNotification("You are now logged in successfully with Google!");
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
      console.log(errorCode + " == " + errorMessage);
    });

  //   firebase.auth().signInWithRedirect(provider);
}
function showUserInfo(user) {
  console.log("Welcome " + user.email);
  //   document.getElementById("user_info").innerHTML =
  //     "<h1> Welcome " + user.email + " ! </h1>";
}
