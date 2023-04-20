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

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      window.location.href = "index.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("Error: " + errorMessage);
    });
});
