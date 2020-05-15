/* Variables */

const url = 'https://randomuser.me/api/?results=12&nat=gb,us,fr';
const employees = [];
const main = document.getElementById('main');
const modalOverlay = document.querySelector('.modal-overlay');
const modalContent = document.querySelector('.modal-content');

console.log(modalContent);

/* Fetch Functions */

fetch(url)
    .then((response) => response.json())
    .then(employeeData);

/* Functions */

// Employee Card Function

function employeeData(data) {
    for(let i = 0; i < data.results.length; i += 1) {
        employees.push(data.results[i]);
        main.innerHTML +=  ` 
            <div class="card">
                <div class="image-container">
                    <img src="${data.results[i].picture.medium}" alt="">
                </div>
                <div class="employee-info">
                    <h2 class="employee-name">${data.results[i].name.first} ${data.results[i].name.last}</h2>
                    <p>${data.results[i].email}<p>
                    <p>${data.results[i].location.city}</p>
                </div>
            </div>
        `;
    }

    document.querySelectorAll('.card').forEach((card, index) => {
        card.addEventListener('click', (event) => {
            modal(employees[index], index);
        });
    });
}

console.log(employees);

// Modal Function

function modal(employee, index) {
    
    const dob = new Date(Date.parse(employee.dob.date)).toLocaleDateString(navigator.language);

    modalOverlay.innerHTML = `
        <div class="modal-content">
            <span class="close">X</span>
            <div class="modal-image-container">
                <button class="left-arrow"><</button>
                <img src="${employee.picture.large}" alt="">
                <button class="right-arrow">></button>
            </div>
            <h2>${employee.name.first} ${employee.name.last}</h2>
            <p>${employee.email}</p>
            <p>${employee.location.city}</p>
            <hr>
            <p>${employee.cell}</p>
            <p>${employee.location.street.number} ${employee.location.street.name}, 
            ${employee.location.state} ${employee.location.postcode}</p>
            <p>Birthday: ${dob}</p>
        </div>
    `;

    modalOverlay.style.display = 'flex';
    const modalClose = document.getElementsByClassName('close')[0];

    modalClose.addEventListener('click', () => {
        modalOverlay.style.display = 'none';
    });
}

// Event Listeners

modalOverlay.addEventListener('click', (event) => {
    if(event.target.className === 'right-arrow') {
        let indexPosition = parseInt(modalOverlay.firstElementChild.getAttribute('data-index'));
        indexPosition += 1;
        if (indexPosition < 12) {
            modal(employees[indexPosition], indexPosition);
        }
    }
    if(event.target.className === 'left-arrow') {
        let indexPosition = parseInt(modalOverlay.firstElementChild.getAttribute('data-index'));
        indexPosition -= 1;
        if (indexPosition > -1) {
            modal(employees[indexPosition], indexPosition);
        }
    }
});

