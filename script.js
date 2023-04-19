const loginForm = document.getElementById('loginForm');
const gasPriceForm = document.getElementById('gasPriceForm');

function saveGasPrices(regular, midGrade, premium, diesel) {
  localStorage.setItem('gasPrices', JSON.stringify({ regular, midGrade, premium, diesel }));
}

function loadGasPrices() {
  const gasPrices = JSON.parse(localStorage.getItem('gasPrices'));
  if (gasPrices) {
    document.getElementById('regular').value = gasPrices.regular;
    document.getElementById('midGrade').value = gasPrices.midGrade;
    document.getElementById('premium').value = gasPrices.premium;
    document.getElementById('diesel').value = gasPrices.diesel;
  }
}

if (loginForm) {
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simple username and password check (not secure)
    if (username === 'admin' && password === 'password') {
      location.href = 'index.html';
    } else {
      alert('Invalid username or password');
    }
  });
}

if (gasPriceForm) {
  loadGasPrices();

  gasPriceForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const regular = document.getElementById('regular').value;
    const midGrade = document.getElementById('midGrade').value;
    const premium = document.getElementById('premium').value;
    const diesel = document.getElementById('diesel').value;

    saveGasPrices(regular, midGrade, premium, diesel);
    alert('Gas prices saved successfully');
  });
}
