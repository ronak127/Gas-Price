// Replace with your Firebase project configuration values
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

const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;

  // Sign in with email and password
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      window.location.href = 'index.html'; // Redirect to the main page
    })
    .catch((error) => {
      // Handle errors
      console.error('Error signing in:', error);
      alert('Error signing in. Please check your email and password.');
    });
});
