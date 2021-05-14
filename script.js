'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Brooke Davis',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Day',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Hermione Jean Granger',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Diana Prince',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];
let currentAccount;

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//Functions
const displayMovements = function (movements) {
  containerMovements.innerHTML = '';

  movements.forEach((movement, index) => {
    const typeMovement = movement > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${typeMovement}">${index + 1} ${typeMovement}</div>
        <div class="movements__value">${movement}€</div>
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

const displayBalance = function (mov) {
  const balance = mov.reduce((acc, current) => acc + current, 0);

  labelBalance.textContent = `${balance}€`;
}

const displaySummary = function ({movements, interestRate}) {
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

  labelSumIn.textContent = `${incomes}€`;
  labelSumOut.textContent = `${Math.abs(out)}€`;
  labelSumInterest.textContent = `${interest}€`;
}

//Events
btnLogin.addEventListener('click', function (event) {
  //prevent form from submitting
  event.preventDefault();

  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome, ${currentAccount.owner.split(' ')[0]}!`

    displayBalance(currentAccount.movements);
    displaySummary(currentAccount);
    displayMovements(currentAccount.movements);

    containerApp.style.opacity = 100;
    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    inputLoginPin.blur();
  }
  else {
    alert('Wrong username or pin. Please, try again.')
    containerApp.style.opacity = 0;
  }

  console.log(currentAccount.pin === Number(inputLoginPin.value));
});

createUsernames(accounts);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// const dogsKate = [4,1,15,8,3];
// const dogsJulia = [3,5,2,12,7];

// function checkDogs(julias, kates) {
//   const dogs = [...julias.slice(1, -2), ...kates];

//   dogs.forEach( (dog, i) => {
//   dog >= 3
//       ? console.log(`Dog number ${i+1} is an adult and its ${dog} years old.`)
//       : console.log(`Dog number ${i+1} is still a puppy.`);
//   })
// }

// function dogsToHumanAge (age) {
//   return age <= 2 ? 2 * age : 16 + age * 4;
// }

// function calcAverageHumanAge (ages) {
//   const humanAge = ages
//     .map(dogsToHumanAge)
//     .filter(age => age >= 18);

//   return humanAge.reduce((acc, age) => acc + age, 0) / humanAge.length;
// }

// // //checkDogs(dogsJulia, dogsKate);
// console.log(calcAverageHumanAge (dogsJulia));
// // console.log(calcAverageHumanAge (dogsKate));
// console.log(calcAverageHumanAge ([5,2,4,1,15,8,3]));
