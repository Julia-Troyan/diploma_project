document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modal');
  const openModalBtn = document.getElementById('modal-open-btn');
  const closeModalBtn = document.querySelector('.close-btn');
  const saveBtn = document.getElementById('save-btn');
  const form = document.getElementById('add-student-form');
  const tableBody = document.getElementById('table-body');
  let editingRow = null;

  openModalBtn.addEventListener('click', () => {
    form.reset();
    editingRow = null;
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

    if (editingRow) {
      updateRow(editingRow, {
        date, operator, trainingForm, attempt, time, specialist, result, comment, trainee, receiver
      });
    } else {
      const newRow = document.createElement('tr');
      newRow.innerHTML = `
        <td class="date-cell"><div>${formatDate(date)}</div></td>
        <td><div>${operator}</div></td>
        <td><div>${trainingForm}</div></td>
        <td><div>${attempt}</div></td>
        <td><div>${time}</div></td>
        <td><div>${specialist}</div></td>
        <td><div>${result}</div></td>
        <td><div>${comment}</div></td>
        <td><div>${trainee}</div></td>
        <td><div>${receiver}</div></td>
        <td>
          <div class="table-actions">
            <button class="edit-btn" title="Изменить">
              <img src="./img_testing/raphael_pensil.svg" alt="Edit">
            </button>
            <button class="delete-btn" title="Удалить">
              <img src="./img_testing/fluent_delete-32-regular.svg" alt="Delete">
            </button>
          </div>
        </td>
      `;

      const rowCount = tableBody.getElementsByTagName('tr').length;
      if (rowCount % 2 === 0) {
        newRow.classList.add('even-row');
      } else {
        newRow.classList.add('odd-row');
      }

      tableBody.appendChild(newRow);
      attachEventListeners(newRow);
    }

    modal.style.display = 'none';
    form.reset();
  });

  function attachEventListeners(row) {
    const editBtn = row.querySelector('.edit-btn');
    const deleteBtn = row.querySelector('.delete-btn');

    editBtn.addEventListener('click', () => {
      editingRow = row;
      const cells = row.getElementsByTagName('td');

      document.getElementById('date').value = cells[0].innerText;
      document.getElementById('operator').value = cells[1].innerText;
      document.getElementById('training-form').value = cells[2].innerText;
      document.getElementById('attempt').value = cells[3].innerText;
      document.getElementById('time').value = cells[4].innerText;
      document.getElementById('specialist').value = cells[5].innerText;
      document.getElementById('result').value = cells[6].innerText;
      document.getElementById('comment').value = cells[7].innerText;
      document.getElementById('trainee').value = cells[8].innerText;
      document.getElementById('receiver').value = cells[9].innerText;

      modal.style.display = 'block';
    });

    deleteBtn.addEventListener('click', () => {
      row.remove();
    });
  }

  function updateRow(row, data) {
    const cells = row.getElementsByTagName('td');

    cells[0].innerHTML = `<div>${formatDate(data.date)}</div>`;
    cells[1].innerHTML = `<div>${data.operator}</div>`;
    cells[2].innerHTML = `<div>${data.trainingForm}</div>`;
    cells[3].innerHTML = `<div>${data.attempt}</div>`;
    cells[4].innerHTML = `<div>${data.time}</div>`;
    cells[5].innerHTML = `<div>${data.specialist}</div>`;
    cells[6].innerHTML = `<div>${data.result}</div>`;
    cells[7].innerHTML = `<div>${data.comment}</div>`;
    cells[8].innerHTML = `<div>${data.trainee}</div>`;
    cells[9].innerHTML = `<div>${data.receiver}</div>`;
  }

  function formatDate(dateString) {
    const dateObj = new Date(dateString);
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return dateObj.toLocaleDateString('ru-RU', options);
  }
  
});
