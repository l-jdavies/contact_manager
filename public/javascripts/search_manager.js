export class Search {
  debounce(func, delay) {
    let timeout;
    return (...args) => {
      if (timeout) {clearTimeout(timeout)}
      timeout = setTimeout(() => func.apply(null, args), delay);
    };
  };

  byName(allContacts, searchName) {
    let results = [];

    allContacts.forEach(contact => {
      let contactName = contact.full_name.toLowerCase();
      if (contactName.startsWith(searchName.toLowerCase())) {
        results.push(contact);
      }
    })

    return results;
  }

  byTag(allContacts, searchTag) {
    if (searchTag === "all") {
      return this.allContactsWithTag(allContacts);
    } else {
      return this.contactsWithSpecificTag(allContacts, searchTag);
    }
  }

  allContactsWithTag(allContacts) {
    let results = [];

    allContacts.forEach(contact => {
      if (contact.tags) {
        results.push(contact);
      }
    })
    return results;

  }

  contactsWithSpecificTag(allContacts, searchTag) {
    let results = [];

    allContacts.forEach(contact => {
      if (contact.tags && contact.tags.includes(searchTag)) {
        results.push(contact);
      }
    })

    return results;
  }
}
