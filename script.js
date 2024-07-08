document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modal');
  const openModalBtn = document.getElementById('modal-open-btn');
  const closeModalBtn = document.querySelector('.close-btn');
  const saveBtn = document.getElementById('save-btn');
  const form = document.getElementById('add-student-form');
  const tableBody = document.getElementById('table-body');

  openModalBtn.addEventListener('click', () => {
    modal.style.display = 'block';
  });

  closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const date = document.getElementById('date').value;
    const operator = document.getElementById('operator').value;
    const trainingForm = document.getElementById('training-form').value;
    const attempt = document.getElementById('attempt').value;
    const time = document.getElementById('time').value;
    const specialist = document.getElementById('specialist').value;
    const result = document.getElementById('result').value;
    const comment = document.getElementById('comment').value;
    const trainee = document.getElementById('trainee').value;
    const receiver = document.getElementById('receiver').value;

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td><div>${date}</div></td>
      <td><div>${operator}</div></td>
      <td><div>${trainingForm}</div></td>
      <td><div>${attempt}</div></td>
      <td><div>${time}</div></td>
      <td><div>${specialist}</div></td>
      <td><div>${result}</div></td>
      <td><div>${comment}</div></td>
      <td><div>${trainee}</div></td>
      <td><div>${receiver}</div></td>
    `;

    const rowCount = tableBody.getElementsByTagName('tr').length;
    if (rowCount % 2 === 0) {
      newRow.classList.add('even-row');
    } else {
      newRow.classList.add('odd-row');
    }

    tableBody.appendChild(newRow);

    modal.style.display = 'none';
    form.reset();
  });
});
