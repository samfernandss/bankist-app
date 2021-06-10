'use strict';

const displayMovements = function (acc) {
  containerMovements.innerHTML = '';

  const movs = sorted ? acc.movements.slice().sort((a,b) => a - b) : acc.movements;

  movs.forEach((movement, index) => {
    const typeMovement = movement > 0 ? 'deposit' : 'withdrawal';
    const movsDate = new Date(acc.movementsDates[index]);
    const displayDate = formatDate(movsDate, true);

    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${typeMovement}">${index + 1} ${typeMovement}</div>
          <div class="movements__date">${displayDate}</div>
          <div class="movements__value">${formattedCurrency(movement)}</div>
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
  labelBalance.textContent = formattedCurrency(acc.balance);
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

  labelSumIn.textContent = formattedCurrency(incomes);
  labelSumOut.textContent = formattedCurrency(Math.abs(out));
  labelSumInterest.textContent = formattedCurrency(interest);
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
  //displayLoginDate();
  labelDate.textContent = formatDate('');

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
  displayMovements(acc);
}

const randomInt = (min, max) => {
  Math.floor(Math.random() * (max - min) + 1) + min;
}

const formatDate = function(date, isMovementDate = false){
  const myDate = isMovementDate ? new Date(date) : new Date();
  const locale = currentAccount.locale;
  const options = {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  };

  if (isMovementDate) {
    const daysPassed = calcDaysPassed(myDate, new Date());
    if (daysPassed === 0) return 'Today';
    if (daysPassed === 1) return 'Yesterday';
    if (daysPassed <= 7) return `${daysPassed} days ago`;
  };

  return new Intl.DateTimeFormat(locale, options).format(myDate);
}

const calcDaysPassed = function(date1, date2) {
  return Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
}

const formattedCurrency = function (mov) {
  return new Intl.NumberFormat(currentAccount.locale, {style: 'currency', currency: currentAccount.currency}).format(mov);
}

//FAKE LOGIN
currentAccount = account5;
displayAccountInfo(currentAccount);
