export class FormManager {
  constructor() {
    this.createContactDiv = document.getElementById('create_contact_form');
    this.editContactDiv = document.getElementById('edit_contact_form');
  }

  getContactData(element) {
    let data = {};
    let allInputs = Array(...element.querySelectorAll('input'));

    allInputs.forEach(dataField => {
      data[dataField.id] = dataField.value;
    })

    this.addSelectedTags(data);

    data.tags === "" ? (data.tags = null) : this.parseTagString(data);

    return data;
  }

  addSelectedTags(dataObj) {
    let dropdown = Array(...document.querySelectorAll('.select_tags option:checked'));

    dropdown.forEach(option => {
      dataObj.tags += `,${option.value}`;
    })
  }

  parseTagString(dataObj) {
    let tagArr = dataObj.tags.split(',');

    tagArr = tagArr.map(word => {
      return word.toLowerCase().trim();
    })

    tagArr = this.uniqueTags(tagArr);

    dataObj.tags = tagArr.join(',');
  }

  uniqueTags(arr) {
    let unique = [];

    arr.forEach(tag => {
      if (!unique.includes(tag)) {
        unique.push(tag);
      }
    })

    return unique;
  }

  validateInput(inputElement) {
    if (!inputElement.checkValidity()) {
      this.renderInvalidInputMessage(inputElement);
    }
  }

  displayFieldRequiredMessage(inputElement) {
    let span = inputElement.parentElement.querySelector('.message');
    let fieldName = inputElement.parentElement.querySelector('label').textContent.toLowerCase();

    span.textContent = `Please enter a value for the ${fieldName} field.`
    span.classList.add('show');
  }

  displayIncorrectFormatMessage(inputElement) {
    let span = inputElement.parentElement.querySelector('.message');

    span.textContent = `Please enter a value in the format shown.`
    span.classList.add('show');
  }


  renderInvalidInputMessage(inputElement) {
    let errorMessage = inputElement.validationMessage;

    switch (errorMessage) {
      case "Please fill in this field.":
        this.displayFieldRequiredMessage(inputElement);
        break;
      case "Please match the format requested.":
        this.displayIncorrectFormatMessage(inputElement);
    }
  }

  removeInputErrorMessage(inputElement) {
    let span = inputElement.parentElement.querySelector('.message');

    span.textContent = "";
    span.classList.remove('show');
  }

  anyInvalidFormInputs() {
    let allInputs = Array(...this.createContactDiv.querySelectorAll('input'));

    let validInputs = allInputs.map(input => input.checkValidity());
    return validInputs.includes(false);
  }

  displayInvalidFormMessage() {
    let span = document.getElementsByClassName('form message')[0];
    span.classList.add('show');

    span.textContent = 'This form contains invalid inputs. Please try again';
  }

  removeFormErrorMessage() {
    let span = document.getElementsByClassName('form message')[0];
    span.classList.remove('show');

    span.textContent = '';
  }

  getJsonData() {
    let dataObj = this.getContactData(this.createContactDiv);
    this.resetForm(this.createContactDiv);

    return JSON.stringify(dataObj);
  }

  getEditJsonData() {
    let data = this.getContactData(this.editContactDiv);
    this.resetForm(this.editContactDiv);

    return JSON.stringify(data);
  }

  resetForm(element) {
    let form = element.querySelector('form');
    form.reset();
  }
} 
