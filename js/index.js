//buttons
let btnSignOut = document.getElementsByClassName("signout")[0];
let btnSignIn = document.getElementsByClassName("container__btn--signin")[0];
let btnSignUp = document.getElementsByClassName("container__btn--signup")[0];
let btnGoogleSignIn = document.getElementsByClassName("google__signin")[0];
let btnFormSignIn = document.getElementsByClassName(
  "container__form--btn--signin"
)[0];
let btnFormSignUp = document.getElementsByClassName(
  "container__form--btn--signup"
)[0];
let btnsJustRead = [...document.getElementsByClassName("justread")];
let btnPublish = document.getElementById("btn_publish");
// Containersd

let containerEditor = document.getElementById("editor");
let containerFormSignIn = document.getElementsByClassName(
  "container__signin--form"
)[0];
let containerFormSignUp = document.getElementsByClassName(
  "container__signup--form"
)[0];
let containerSignIn = document.getElementsByClassName("container__signin")[0];
let containerSignUp = document.getElementsByClassName("container__signup")[0];
let containerBlog = document.getElementsByClassName("container__blog")[0];

let signInnedUsername = document.getElementsByClassName("signin__username")[0];

let boxBG = document.getElementsByClassName("box__bg")[0];

//signin mode = shows signIN form, signup mode = shows signUp form
let displayMode = "signup"; //default = signin
//
btnSignIn.addEventListener("click", () => {
  displayMode = "signin";
  SignInMode();
});

btnSignUp.addEventListener("click", () => {
  displayMode = "signup";
  SignUpMode();
});

SignInMode = () => {
  if (boxBG.classList.contains("activeSignUp")) {
    boxBG.classList.remove("activeSignUp");
    boxBG.classList.add("activeSignIn");
  } else {
    boxBG.classList.add("activeSignIn");
  }

  containerFormSignUp.classList.add("activeForm");
  containerFormSignIn.classList.add("activeForm");

  containerFormSignIn.style.zIndex = 1;
  containerFormSignUp.style.zIndex = 0;
  console.log("log in clicked");

  setTimeout(() => {
    containerSignUp.style.zIndex = 3;
    containerSignIn.style.zIndex = -1;
  }, 200);
};
SignUpMode = () => {
  if (boxBG.classList.contains("activeSignIn")) {
    boxBG.classList.remove("activeSignIn");

    boxBG.classList.add("activeSignUp");
  } else {
    boxBG.classList.add("activeSignUp");
  }

  containerFormSignIn.classList.remove("activeForm");
  containerFormSignUp.classList.remove("activeForm");

  containerFormSignIn.style.zIndex = 0;
  containerFormSignUp.style.zIndex = 1;

  setTimeout(() => {
    containerSignUp.style.zIndex = -1;
    containerSignIn.style.zIndex = 3;
  }, 200);
  console.log("Sign Up clicked");
};

//notification permission
requestNotificationPermission();
//things happen with success signed in
SuccessSignedIn = userName => {
  signInnedUsername.textContent = userName;
  containerBlog.style.visibility = "visible";
};
//signing up
btnFormSignUp.addEventListener("click", e => {
  signUp(e);
});
btnFormSignIn.addEventListener("click", e => {
  logIn(e);
});
btnGoogleSignIn.addEventListener("click", () => {
  signInGoogle();
});

btnsJustRead.forEach(btn => {
  anonymousMode(btn);
});

let errorMessages = [...document.getElementsByClassName("error")];

btnSignOut.addEventListener("click", () => {
  signOut();
  containerBlog.style.visibility = "hidden";
  //remove all error messages when signout
  errorMessages.forEach(error => {
    error.textContent = "";
  });

  document.getElementById("title").classList.remove("disabled");
  document.getElementById("cke_editor1").classList.remove("disabled");
  btnPublish.classList.remove("disabled");
});

function anonymousMode(btn) {
  btn.addEventListener("click", () => {
    SuccessSignedIn("Anonymous");

    document.getElementById("title").classList.add("disabled");
    document.getElementById("cke_editor1").classList.add("disabled");
    btnPublish.classList.add("disabled");
  });
}
