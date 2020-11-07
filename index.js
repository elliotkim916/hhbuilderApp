'use strict';

const ageInput = document.querySelector("input[name='age']");
const relSelect = document.querySelector("select[name='rel']");
const smokerCheckbox = document.querySelector("input[name='smoker']");
const form = document.querySelector('form');
const submitButton = document.querySelector("button[type='submit']");

let householdArray = [];

ageInput.required = true;
relSelect.required = true;

form.addEventListener('submit', function(e) {
  e.preventDefault();

  if (ageInput.value < 1) {
    return alert('Age must be greater than 0..');
  }

  const householdMember = {
    id: Math.floor(Math.random() * 100),
    age: ageInput.value,
    relationship: relSelect.value,
    smoker: smokerCheckbox.checked
  };

  householdArray.push(householdMember);
  renderHousehold(householdArray);
  resetEntryForm();
});

submitButton.addEventListener('click', function(e) {
  e.preventDefault();
  
  if (householdArray.length) {
    console.log('Sending to server..');
    renderInDebug();
  } else {
    alert('Must have household members added in order to submit..');
  }
});

function renderHousehold(householdArr) {
  const householdList = document.querySelector('.household');
  householdList.innerHTML = '';

  householdArr.forEach(household => {
    const listItem = document.createElement('li');
    const deleteButton = document.createElement('button');

    listItem.innerHTML += 
      'Age: ' + household.age + '<br>' + 
      'Relationship: ' + household.relationship + '<br>' + 
      'Smoker: ' + household.smoker + '<br>';
    listItem.appendChild(deleteButton); 
    householdList.appendChild(listItem);

    deleteButton.innerHTML = 'Delete';
    deleteButton.addEventListener('click', function(e) {
      removeHouseholdMember(household);
    });
  });
};

function renderInDebug() {
  const debug = document.querySelector('.debug');
  
  const householdJSON = JSON.stringify(householdArray, null, '\t');
  debug.style.display = 'block';
  debug.style.width = '400px';
  debug.innerHTML = householdJSON;
}

function removeHouseholdMember(member) {
  householdArray = householdArray.filter(household => household.id !== member.id);
  renderHousehold(householdArray);
}

function resetEntryForm() {
  ageInput.value = '';
  relSelect.value = '---';
  smokerCheckbox.checked = false;
}
