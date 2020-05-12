/* Variables */

const url = 'https://randomuser.me/api/?results=12&nat=gb,us,fr';
const employees = [];
// const main = document.getElementById('main');

/* Fetch Functions */

fetch(url)
    .then((response) => response.json())
    .then(employeeData);

/* Functions */

function employeeData(data) {
    for(let i = 0; i < data.results.length; i += 1 ) {
        employees.push(data.results[i]);
        document.createElement('section').innerHTML =  ` 
        
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

}

console.log(employees);