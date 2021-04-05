export class UI {
  constructor() {
    this.allTemplates = {};

    this.mainElement = document.querySelector('main');
    this.createContactDiv = document.getElementById('create_contact_form');
    this.searchDiv = document.getElementById('search');
    this.displayNoContactsDiv = document.getElementById('display_no_contacts');
    this.displayContactsDiv = document.getElementById('display_contacts');
    this.modalDiv = document.querySelector('.modal');
    this.editContactDiv = document.getElementById('edit_contact_form');
    this.noSearchResultsDiv = document.getElementById('no_results');


    this.cacheTemplates();
  }

  cacheTemplates() {
    let allHandlebars = Array(...document.querySelectorAll("[type*=x-handlebars]"));

    allHandlebars.forEach(script => {
      this.allTemplates[script.id] = Handlebars.compile(script.innerHTML);
    })
  }

  displayNoResults(searchName) {
    this.noSearchResultsDiv.insertAdjacentHTML('beforeend', this.allTemplates.noSearchResults({name: searchName}));
  }

  removeNoSearchResults() {
    while (this.noSearchResultsDiv.childElementCount > 0) {
      this.noSearchResultsDiv.firstElementChild.remove();
    }
  }

  renderUI(contacts, tags) {
    this.renderSearchDiv(tags)
    this.renderContactDiv(contacts);
  }

  renderSearchDiv(tags) {
    this.removeCurrentSearch()
    this.searchDiv.insertAdjacentHTML('beforeend', this.allTemplates.addSearchTemplate({option: tags}));
  }

  removeCurrentSearch() {
    while (this.searchDiv.childElementCount > 0) {
      this.searchDiv.firstElementChild.remove();
    }
  }

  renderContactDiv(contacts) {
    if (!contacts) {
      this.displayNoContactsDiv.insertAdjacentHTML('beforeend', this.allTemplates.noCurrentContacts());
    } else {
      this.renderAllContacts(contacts);
    }
  }

  renderAllContacts(contacts) {
    this.removeCurrentDisplayedContacts();

    contacts.forEach(contact => {
      this.displayContactsDiv.insertAdjacentHTML('beforeend', this.allTemplates.displayContact(contact));
    })
  }

  removeCurrentDisplayedContacts() {
    while (this.displayContactsDiv.childElementCount > 0) {
      this.displayContactsDiv.firstElementChild.remove();
    }
  }
  displayAddContactForm(tags) {
    this.hideElement(this.searchDiv, this.displayContactsDiv, this.displayNoContactsDiv);
    this.createContactDiv.insertAdjacentHTML('beforeend', this.allTemplates.addContact({option: tags}));
  }

  hideElement(...targetElements) {
    targetElements.forEach(element => {
      element.classList.add('hide');
    })
  }

  displayElement(...targetElements) {
    targetElements.forEach(element => {
      element.classList.remove('hide');
      element.classList.add('display');
    })
  }

  removeAddContactForm() {
    this.createContactDiv.firstElementChild.remove();
    this.displayElement(this.searchDiv, this.displayNoContactsDiv, this.displayContactsDiv);
  }

  removeEditContactForm() {
    this.editContactDiv.firstElementChild.remove();
    this.displayElement(this.searchDiv, this.displayNoContactsDiv, this.displayContactsDiv);
  }

  showConfirm() {
    this.modalDiv.style.visibility = 'visible';
  }

  hideConfirm() {
    this.modalDiv.style.visibility = 'hidden';
  }

  renderEditForm(contact) {
    this.hideElement(this.searchDiv, this.displayContactsDiv, this.displayNoContactsDiv);
    this.editContactDiv.insertAdjacentHTML('beforeend', this.allTemplates.editContact(contact))
  }
}
