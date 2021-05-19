'use strict';

// Events
btnLogin.addEventListener('click', function (event) {
  //prevent form from submitting
  event.preventDefault();

  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  currentAccount?.pin === Number(inputLoginPin?.value)
    ? displayAccountInfo(currentAccount)
    : showLoginError();
});

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

btnClose.addEventListener('click', function (event) {
  event.preventDefault();

  // const accountToDelete = accounts.findIndex(acc => acc.username === inputCloseUsername.value);
  if (currentAccount.username === inputCloseUsername.value && currentAccount.pin === Number(inputClosePin.value)){
    accounts.splice(accounts.findIndex(acc => acc.username === currentAccount.username), 1);
    containerApp.style.opacity = 0;

    alert('Foi um prazer tê-lo concosco. Sua conta foi deletada, até mais!');
  }
  else {
    alert('Você não pode deletar essa conta, verifique suas credenciais.')
  }
})