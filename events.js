'use strict';

// Events
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const transferTo = accounts.find(acc => acc.username === inputTransferTo.value);
  const amount = Number(inputTransferAmount.value);

  inputTransferAmount.value = inputTransferTo.value = '';
  inputTransferAmount.blur();

  if (amount > 0 && currentAccount.balance >= amount && currentAccount.username !== transferTo.username) {
    currentAccount.movements.push(-amount);
    transferTo?.movements.push(amount);
    updateUI(currentAccount);
  }
  else alert('Insira um valor válido e disponível em sua conta.');
});

//Events
btnLogin.addEventListener('click', function (event) {
  //prevent form from submitting
  event.preventDefault();

  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  currentAccount?.pin === Number(inputLoginPin?.value)
    ? displayAccountInfo(currentAccount)
    : showLoginError();
});