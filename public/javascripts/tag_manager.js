export class TagManager {
  getTags(allContacts) {
    let tagArr = [];

    allContacts.forEach(contact => {
      if (contact.tags) {
        let tagStr = contact.tags;

        tagStr.split(',').forEach(tag => {
          if (!tagArr.includes(tag)) {
            tagArr.push(tag);
          }
        })
      }
    })

    return tagArr;
  }

}
