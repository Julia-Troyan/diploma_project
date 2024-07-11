document.addEventListener('DOMContentLoaded', () => {
  const addStudentBtn = document.getElementById('add-student-btn');
  const modal = document.getElementById('modal');
  const closeBtn = document.querySelector('.close-btn');
  const addStudentForm = document.getElementById('add-student-form');
  const table = document.querySelector('.blok');
  let editRow = null;

  addStudentBtn.addEventListener('click', () => {
    modal.style.display = 'block';
  });

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  });

  addStudentForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const formData = new FormData(addStudentForm);
    const newRow = document.createElement('tr');

    formData.forEach((value, key) => {
      const newCell = document.createElement('td');
      const newDiv = document.createElement('div');
      newDiv.textContent = value;
      newCell.appendChild(newDiv);
      newRow.appendChild(newCell);
    });

    const actionsCell = document.createElement('td');
    const editButton = document.createElement('button');
    editButton.textContent = 'Изменить';
    editButton.classList.add('edit-btn');
    editButton.addEventListener('click', () => editRowHandler(newRow));

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Удалить';
    deleteButton.classList.add('delete-btn');
    deleteButton.addEventListener('click', () => newRow.remove());

    actionsCell.appendChild(editButton);
    actionsCell.appendChild(deleteButton);
    newRow.appendChild(actionsCell);

    if (editRow) {
      table.replaceChild(newRow, editRow);
      editRow = null;
    } else {
      table.appendChild(newRow);
    }

    modal.style.display = 'none';
    addStudentForm.reset();
  });

  function editRowHandler(row) {
    editRow = row;
    const cells = row.querySelectorAll('td div');
    const formData = {
      date: cells[0].textContent,
      operator: cells[1].textContent,
      'training-form': cells[2].textContent,
      attempt: cells[3].textContent,
      time: cells[4].textContent,
      specialist: cells[5].textContent,
      result: cells[6].textContent,
      comment: cells[7].textContent,
      trainee: cells[8].textContent,
      receiver: cells[9].textContent,
    };

    for (let key in formData) {
      document.getElementById(key).value = formData[key];
    }

    modal.style.display = 'block';
  }
});

