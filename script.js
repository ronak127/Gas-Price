// Replace these with your own configuration values
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

const db = firebase.firestore();

document.getElementById("gasPricesForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const regularPrice = document.getElementById("regular").value;
  const midgradePrice = document.getElementById("midgrade").value;
  const premiumPrice = document.getElementById("premium").value;
  const dieselPrice = document.getElementById("diesel").value;

  db.collection("gasPrices").doc("currentPrices").set({
    regular: regularPrice,
    midgrade: midgradePrice,
    premium: premiumPrice,
    diesel: dieselPrice,
  });
});

function updateTable(regular, midgrade, premium, diesel) {
  document.getElementById("regularPrice").textContent = `$ ${regular}9`;
  document.getElementById("midgradePrice").textContent = `$ ${midgrade}9`;
  document.getElementById("premiumPrice").textContent = `$ ${premium}9`;
  document.getElementById("dieselPrice").textContent = `$ ${diesel}9`;
}

// Listen for real-time updates from Firestore
db.collection("gasPrices")
  .doc("currentPrices")
  .onSnapshot((doc) => {
    if (doc.exists) {
      const data = doc.data();
      updateTable(data.regular, data.midgrade, data.premium, data.diesel);
    } else {
      console.log("No such document!");
    }
  });
