import {UI} from "./createUI.js";
import {EventManager} from "./event_manager.js";
import {FormManager} from "./form_manager.js";
import {ContactsManager} from "./contacts_manager.js";
import {Search} from "./search_manager.js";
import {TagManager} from "./tag_manager.js";

class App {
  constructor() {
    this.ui = new UI();
    this.form = new FormManager();
    this.contacts = new ContactsManager();
    this.search = new Search();
    this.tags = new TagManager();

    this.allContacts = null;
    this.allTags = null;

    this.mainElement = document.querySelector('main');
    this.createContactDiv = document.getElementById('create_contact_form');
    this.editContactDiv = document.getElementById('edit_contact_form');
    this.searchDiv = document.getElementById('search');
    this.displayNoContactsDiv = document.getElementById('display_no_contacts');
    this.errorDiv = document.getElementById('error');
    this.displayContactsDiv = document.getElementById('display_contacts');
    this.modalDiv = document.querySelector('.modal');
    this.noSearchResultsDiv = document.getElementById('no_results');

    this.buildUI();
    this.bindEvents();
  }


  bindEvents() {
    EventManager.bindSearchBar.call(this);
    EventManager.bindAddContactBtns.call(this);
    EventManager.bindNewContactFormBtns.call(this);
    EventManager.bindNewContactFormInputs.call(this);
    EventManager.bindContactDetailBtns.call(this);
    EventManager.bindModalDivBtns.call(this);
    EventManager.bindEditContactFormBtns.call(this);
    EventManager.bindEditContactFormInputs.call(this);

    this.searchContacts = this.search.debounce(this.searchByName.bind(this), 300);
  }

  async buildUI() {
    this.allContacts = await this.contacts.getAll();
    this.allTags = this.tags.getTags(this.allContacts);

    this.ui.renderUI(this.allContacts, this.allTags);
  }

  searchByName(name) {
    let result = this.search.byName(this.allContacts, name);

    if (result.length > 0) {
      this.ui.renderAllContacts(result);
    } else {
      this.ui.displayNoResults();
    }
  }

  searchByTag(tag) {
    let result = this.search.byTag(this.allContacts, tag);

    if (result.length > 0) {
      this.ui.renderAllContacts(result);
    } else {
      this.ui.displayNoResults();
    }
  }

  addNewContact() {
    this.ui.displayAddContactForm(this.allTags);
  }

  confirmDelete(event) {
    this.deleteId = this.getContactId(event);
    this.ui.showConfirm();
  }

  cancelDelete() {
    this.ui.hideConfirm();
  }

  cancelEdit() {
    this.ui.removeEditContactForm();
  }

  async editContact(event) {
    this.editId = this.getContactId(event);

    try {
      this.editContactDetails = await this.contacts.getContact(this.editId);
      this.editContactDetails['option'] = this.allTags;
      this.ui.renderEditForm(this.editContactDetails);
    } catch {
      this.displayPageError();
    }
  }

  async deleteContact() {
    this.ui.hideConfirm();

    try {
      await this.contacts.remove(this.deleteId);
      this.buildUI();
    } catch {
      this.displayPageError();
    }
  }

  async submitNewContactForm() {
    let data = this.form.getJsonData();

    try {
      await this.contacts.addNew(data);
      this.ui.removeAddContactForm();
      this.buildUI();
    } catch {
      this.displayPageError();
    }
  }

  async submitEdit() {
    let data = this.form.getEditJsonData();

    try {
      await this.contacts.edit(data, this.editId);
      this.ui.removeEditContactForm();
      this.buildUI();
    } catch {
      this.displayPageError();
    }
  }

  async updateContacts() {
    this.allContacts = await this.contacts.getAll();
    this.ui.renderContactDiv(this.allContacts);
  }

  cancelNewContactForm() {
    this.ui.removeAddContactForm();
  }

  displayPageError() {
    this.errorDiv.textContent = "An error has occurred. Please try again."
    this.errorDiv.classList.add('show');
  }

  getContactId(event) {
    return Number(event.target.parentElement.getAttribute('data-id'));
  }

  removeNoResults() {
    this.ui.removeNoSearchResults();
  }

  resetDropDown() {
    let dropDown = document.getElementById('list_tags');
    dropDown.selectedIndex = 0;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new App();
})
