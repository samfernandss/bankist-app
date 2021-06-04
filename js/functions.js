'use strict';

// Functions
const displayMovements = function (movements) {
  containerMovements.innerHTML = '';

  const movs = sorted ? movements.slice().sort((a,b) => a - b) : movements;

  movs.forEach((movement, index) => {
    const typeMovement = movement > 0 ? 'deposit' : 'withdrawal';

    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${typeMovement}">${index + 1} ${typeMovement}</div>
          <div class="movements__value">${movement.toFixed(2)}€</div>
        </div>
      `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}

const createUsernames = function (accs) {
  accs.forEach(acc => {
    acc.username = acc.owner.toLowerCase().split(' ').map(name => name[0]).join('');
  });
}

const calcBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, current) => acc + current, 0);
  labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
}

const displaySummary = function ({ movements, interestRate }) {
  const incomes = movements
    .filter(m => m > 0)
    .reduce((acc, cur) => acc + cur, 0);

  const out = movements
    .filter(m => m < 0)
    .reduce((acc, cur) => acc + cur, 0);

  const interest = movements
    .filter(m => m > 0)
    .map(dep => dep * interestRate / 100)
    .filter(int => int >= 1)
    .reduce((acc, cur) => acc + cur, 0);

  labelSumIn.textContent = `${incomes.toFixed(2)}€`;
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
}

const displayWelcomeMessage = function (owner) {
  const hour = new Date().getHours();
  let momentOfDay;

  if (hour < 12) momentOfDay = 'Good Morning';
  else if (hour >= 12 && hour < 18) momentOfDay = 'Good Afternoon';
  else momentOfDay = 'Good Evening';

  labelWelcome.textContent = `${momentOfDay}, ${owner.split(' ')[0]}!`;
}

const displayAccountInfo = function (loggedAccount) {
  displayWelcomeMessage(loggedAccount.owner);
  updateUI(loggedAccount);

  containerApp.style.opacity = 1;
  inputLoginUsername.value = '';
  inputLoginPin.value = '';
  inputLoginPin.blur();
}

const showLoginError = function () {
  spanWrongUser.style.opacity = 1;
  spanWrongUser.textContent = 'Wrong username or pin. Please, try again.';
  labelWelcome.textContent = 'Ops, something wrong is not right :\(';

  setTimeout(() => {
    spanWrongUser.style.opacity = 0;
    labelWelcome.textContent = 'Log in to get started';
  }, 3000);

  containerApp.style.opacity = 0;
}

const updateUI = function (acc) {
  calcBalance(acc);
  displaySummary(acc);
  displayMovements(acc.movements);
}

const randomInt = (min, max) => {
  Math.floor(Math.random() * (max - min) + 1) + min;
}