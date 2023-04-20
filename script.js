// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2FTLG_RgzXUOYz5UZ3CISuiw5bDHRIuw",
  authDomain: "gas-prices-4ff65.firebaseapp.com",
  projectId: "gas-prices-4ff65",
  storageBucket: "gas-prices-4ff65.appspot.com",
  messagingSenderId: "334309115103",
  appId: "G-W93C9PP94F",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Handle login
document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("Error signing in: ", error);
    });
});

// Handle price input
document.getElementById("priceForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const regular = parseFloat(document.getElementById("regular").value).toFixed(3);
  const midgrade = parseFloat(document.getElementById("midgrade").value).toFixed(3);
  const premium = parseFloat(document.getElementById("premium").value).toFixed(3);
  const diesel = parseFloat(document.getElementById("diesel").value).toFixed(3);

  // Save prices to Firestore
  firebase.firestore().collection("prices").doc("latest").set({
    regular,
    midgrade,
    premium,
    diesel,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  })
  .then(() => {
    console.log("Prices saved successfully.");
  })
  .catch((error) => {
    console.error("Error saving prices: ", error);
  });
});

// Load the most recent prices when the page loads
firebase.firestore().collection("prices").doc("latest").get()
  .then((doc) => {
    if (doc.exists) {
      const data = doc.data();
      document.getElementById("regular").value = data.regular;
      document.getElementById("midgrade").value = data.midgrade;
      document.getElementById("premium").value = data.premium;
      document.getElementById("diesel").value = data.diesel;
    } else {
      console.log("No such document!");
    }
  })
  .catch((error) => {
    console.log("Error getting document:", error);
  });
