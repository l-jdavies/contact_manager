export class EventManager {

  static bindSearchBar() {
    this.searchDiv.addEventListener('input', (event) => {
      if (event.target.name === 'search') {
        this.removeNoResults();
        this.searchByName(event.target.value);
      }
    });

    this.searchDiv.addEventListener('change', (event) => {
      if (event.target.name === 'tags') {
        this.removeNoResults();
        this.searchByTag();
      }
    })

    this.searchDiv.addEventListener('click', (event) => {
      if (event.target.id === "display_all_contacts") {
        this.resetDropDown();
        this.updateContacts();
      }
    })
  }

  static bindAddContactBtns() {
    this.mainElement.addEventListener('click', (event) => {
      event.preventDefault();

      if (event.target.classList.contains('add_contact_btn')) {
        this.addNewContact();
      }
    });
  }

  static bindNewContactFormBtns() {
    this.createContactDiv.addEventListener('click', (event) => {
      event.preventDefault();
      let id = event.target.id;

      if (id === 'cancel_new_contact') {
        this.cancelNewContactForm();
      } else if (id === 'submit_new_contact' && this.form.anyInvalidFormInputs()) {
        this.form.displayInvalidFormMessage();
      } else if (id === 'submit_new_contact') {
        this.submitNewContactForm();
      }
    })
  }

  static bindEditContactFormBtns() {
    this.editContactDiv.addEventListener('click', (event) => {
      event.preventDefault();
      let id = event.target.id;

      if (id === "edit_contact") {
        this.submitEdit();
      } else if (id === "cancel_edit") {
        this.cancelEdit();
      }
    })
  }

  static bindEditContactFormInputs() {
    this.editContactDiv.addEventListener('focusout', (event) => {
      if (event.target.tagName === 'INPUT') {
        this.form.validateInput(event.target);
      }
    });

    this.editContactDiv.addEventListener('focusin', (event) => {
      if (event.target.tagName === 'INPUT') {
        this.form.removeInputErrorMessage(event.target);
        this.form.removeFormErrorMessage();
      }
    });
  }


  static bindNewContactFormInputs() {
    this.createContactDiv.addEventListener('focusout', (event) => {
      if (event.target.tagName === 'INPUT') {
        this.form.validateInput(event.target);
      }
    });

    this.createContactDiv.addEventListener('focusin', (event) => {
      if (event.target.tagName === 'INPUT') {
        this.form.removeInputErrorMessage(event.target);
        this.form.removeFormErrorMessage();
      }
    });
  }

  static bindContactDetailBtns() {
    this.displayContactsDiv.addEventListener('click', (event) => {
      if (event.target.id === "edit_contact") {
        this.editContact(event);
      } else if (event.target.id === "delete_contact") {
        this.confirmDelete(event);
      }
    })
  }

  static bindModalDivBtns() {
    this.modalDiv.addEventListener('click', (event) => {
      if (event.target.id === "yes_button") {
        this.deleteContact();
      } else {
        this.cancelDelete();
      }
    })
  }
}
