/* Variables */

const url = 'https://randomuser.me/api/?results=12&nat=gb,us,fr';
const employees = [];
const main = document.getElementById('main');
const modalHtml = document.querySelector('.modal-container');

/* Fetch Functions */

fetch(url)
    .then((response) => response.json())
    .then(employeeData);

/* Functions */

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

function modal(employee, index){
    
    const dob = new Date(Date.parse(employee.dob.date)).toLocaleDateString(navigator.language);

    modalHtml.innerHTML = `
    <div class="modal-overlay">
        <div class="modal-content">
            <span class="close">X</span>
            <img src="${employee.picture.large}" alt="">
            <h2>${employee.name.first} ${employee.name.last}</h2>
            <p>${employee.email}</p>
            <p>${employee.location.city}</p>
            <span class="left-arrow"><</span>
            <span class="right-arrow">></span>
            <p>${employee.cell}</p>
            <address>${employee.location.street.number}, ${employee.location.street.name}, 
            ${employee.location.city}, ${employee.location.state}, 
            ${employee.location.postcode}</address>
            <p>${dob}</p>
        </div>
    </div>
    `;

    const modalOverlay = document.getElementsByClassName('modal-overlay')[0];
    modalOverlay.style.display = 'block';
    const modalClose = document.getElementsByClassName('close')[0];

    modalClose.addEventListener('click', () => {
        modalOverlay.style.display = 'none';
    });
}

