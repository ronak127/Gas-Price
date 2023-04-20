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

// Initialize Firestore
const db = firebase.firestore();

function signOut() {
  firebase.auth().signOut().then(() => {
    window.location.href = "login.html";
  }).catch((error) => {
    console.error("Error signing out:", error);
  });
}

function updatePrice(id, value) {
  const priceElement = document.getElementById(id);
  priceElement.textContent = value ? `$${value.toFixed(3)}` : "-";
}

function loadPrices() {
  db.collection("gasPrices").doc("currentPrices").get().then((doc) => {
    if (doc.exists) {
      const data = doc.data();
      updatePrice("regularPrice", data.regular);
      updatePrice("midgradePrice", data.midgrade);
      updatePrice("premiumPrice", data.premium);
      updatePrice("dieselPrice", data.diesel);
    } else {
      console.error("No document found with ID 'currentPrices'");
    }
  }).catch((error) => {
    console.error("Error fetching prices:", error);
  });
}

document.getElementById("priceForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const regular = parseFloat(document.getElementById("regular").value) || null;
  const midgrade = parseFloat(document.getElementById("midgrade").value) || null;
  const premium = parseFloat(document.getElementById("premium").value) || null;
  const diesel = parseFloat(document.getElementById("diesel").value) || null;

  const updatedPrices = {
    regular: regular !== null ? regular : firebase.firestore.FieldValue.delete(),
    midgrade: midgrade !== null ? midgrade : firebase.firestore.FieldValue.delete(),
    premium: premium !== null ? premium : firebase.firestore.FieldValue.delete(),
    diesel: diesel !== null ? diesel : firebase.firestore.FieldValue.delete()
  };

  db.collection("gasPrices").doc("currentPrices").set(updatedPrices, { merge: true })
    .then(() => {
      loadPrices();
    })
    .catch((error) => {
      console.error("Error updating prices:", error);
    });
});

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    loadPrices();
  } else {
    window.location.href = "login.html";
  }
});
