// script.js
const form = document.getElementById('expense-form');
const tableBody = document.querySelector('#expense-table tbody');
const totalDisplay = document.getElementById('total');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

function updateTable() {
  tableBody.innerHTML = '';
  let total = 0;

  expenses.forEach((e, index) => {
    total += Number(e.amount);
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${e.date}</td>
      <td>${e.item}</td>
      <td>${Number(e.amount).toLocaleString()} 원</td>
      <td>${e.memo}</td>
      <td><button onclick="deleteEntry(${index})">삭제</button></td>
    `;
    tableBody.appendChild(row);
  });

  totalDisplay.textContent = `총합: ${total.toLocaleString()} 원`;
  localStorage.setItem('expenses', JSON.stringify(expenses));
}

function deleteEntry(index) {
  expenses.splice(index, 1);
  updateTable();
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const newEntry = {
    date: document.getElementById('date').value,
    item: document.getElementById('item').value,
    amount: document.getElementById('amount').value,
    memo: document.getElementById('memo').value
  };

  expenses.push(newEntry);
  form.reset();
  updateTable();
});

updateTable();