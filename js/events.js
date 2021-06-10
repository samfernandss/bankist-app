'use strict';

btnLogin.addEventListener('click', function (e) {
  //prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  currentAccount?.pin === parseInt(inputLoginPin.value)
    ? displayAccountInfo(currentAccount)
    : showLoginError();
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const transferTo = accounts.find(acc => acc.username === inputTransferTo.value) ?? { username: null };

  if (transferTo.username) {
    const amount = Number(inputTransferAmount.value);
    inputTransferAmount.value = inputTransferTo.value = '';
    inputTransferAmount.blur();

    if (amount > 0 && currentAccount.balance >= amount && currentAccount.username !== transferTo.username) {
      currentAccount.movements.push(-amount);
      currentAccount.movementsDates.push(new Date().toISOString());
      transferTo?.movements.push(amount);
      transferTo?.movementsDates.push(new Date().toISOString());
      updateUI(currentAccount);
    }
  }
  else alert('Insira um valor válido e disponível em sua conta.');
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= 0.1 * amount)) {
    currentAccount.movements.push(amount);
    currentAccount.movementsDates.push(new Date().toISOString());
    updateUI(currentAccount);
    inputLoanAmount.value = '';
    inputLoanAmount.blur();
  }
  else alert('You can\'t request this amount, try a bit less.');
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (currentAccount.username === inputCloseUsername.value && currentAccount.pin === Number(inputClosePin.value)) {
    accounts.splice(accounts.findIndex(acc => acc.username === currentAccount.username), 1);
    containerApp.style.opacity = 0;

    alert('Foi um prazer tê-lo concosco. Sua conta foi deletada, até mais!');
  }
  else {
    alert('Você não pode deletar essa conta, verifique suas credenciais.')
  }
});

btnSort.addEventListener('click', function () {
  sorted = !sorted;
  displayMovements(currentAccount);
});

// inputTransferTo.addEventListener('change', function (e) {
//   btnTransfer.disabled = (inputTransferAmount.target?.value === '') && (e.target.value === '');
// });

// inputTransferAmount.addEventListener('change', function (e) {
//   btnTransfer.disabled = (inputTransferTo.target?.value === '') && (e.target.value === '');
// });
