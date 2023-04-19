// Add your Firebase configuration here
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
  
  // Get elements
  const loginForm = document.getElementById('loginForm');
  const gasPriceForm = document.getElementById('gasPriceForm');
  
  // Add login event
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
  
      // Get email and password
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
  
      // Sign in
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
          window.location.replace("index.html");
        })
        .catch((error) => {
          console.error("Error signing in:", error);
        });
    });
  }
  
  // Add gas price form event
  if (gasPriceForm) {
    gasPriceForm.addEventListener('submit', (e) => {
      e.preventDefault();
  
      // Get gas prices
      const regular = document.getElementById('regular').value;
      const midGrade = document.getElementById('midGrade').value;
      const premium = document.getElementById('premium').value;
      const diesel = document.getElementById('diesel').value;
  
      // Save gas prices to Firestore
      const db = firebase.firestore();
      db.collection("gasPrices").add({
        regular: parseFloat(regular),
        midGrade: parseFloat(midGrade),
        premium: parseFloat(premium),
        diesel: parseFloat(diesel),
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        console.log("Gas prices saved successfully.");
        gasPriceForm.reset();
      })
      .catch((error) => {
        console.error("Error saving gas prices:", error);
      });
    });
  }
  
  // Realtime listener
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log("User is signed in.");
    } else {
      console.log("No user is signed in.");
      if (window.location.pathname !== '/login.html') {
        window.location.replace("login.html");
      }
    }
  });
  
