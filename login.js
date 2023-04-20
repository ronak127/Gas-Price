const firebaseConfig = {
  apiKey: "AIzaSyA2FTLG_RgzXUOYz5UZ3CISuiw5bDHRIuw",
  authDomain: "gas-prices-4ff65.firebaseapp.com",
  projectId: "gas-prices-4ff65",
  storageBucket: "gas-prices-4ff65.appspot.com",
  messagingSenderId: "334309115103",
  appId: "G-W93C9PP94F"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  console.log("Trying to log in with email:", email);

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("Logged in successfully with user:", user);
      window.location.href = "index.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Error code:", errorCode);
      console.log("Error message:", errorMessage);
      alert("Error: " + errorMessage);
    });
});

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log("User is logged in:", user);
    window.location.href = "index.html";
  } else {
    console.log("User is not logged in");
  }
});
