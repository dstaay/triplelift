'use strict';

class ItemList {
  constructor(name, cb) {
    this.name = name;
    this.cb = cb;
    this.uid = 0;
    this.itemObj = {};
    this.buildForm();
  }

  buildForm() {
    const div = document.getElementById(this.name);
    const newForm = document.createElement('form');

    const inputText = document.createElement('input');
    inputText.id  = this.name + ' input text';
    inputText.type = 'text';
    inputText.autofocus  = true;
    inputText.onkeyup = this.checkTextEmpty.bind(this);

    const inputButton = document.createElement('input');
    inputButton.id = this.name + ' add button';
    inputButton.type = 'button';
    inputButton.value = 'ADD';
    inputButton.disabled = true;
    inputButton.onclick = this.addItem.bind(this);

    const ulList = document.createElement('ul');
    ulList.id = this.name + ' output list';

    const submitButton = document.createElement('input');
    submitButton.id = this.name + ' submit button';
    submitButton.type = 'submit';
    submitButton.disabled = true;
    submitButton.onclick = this.submitList.bind(this);

    newForm.appendChild(inputText);
    newForm.appendChild(inputButton);
    newForm.appendChild(ulList);
    newForm.appendChild(submitButton);
    div.appendChild(newForm);
  }

  addItem() {
    const item = document.getElementById(this.name + ' input text').value;
    const ul = document.getElementById(this.name + ' output list');
    this.uid++;

    const newLi = document.createElement('li');
    newLi.id = this.name + ' ' + this.uid;
    newLi.innerHTML = item;

    const deleteButton = document.createElement('input');
    deleteButton.id = this.name + ' ' + this.uid + ' delete button';
    deleteButton.type = 'button';
    deleteButton.value = 'delete';
    deleteButton.onclick = this.deleteItem.bind(this, this.uid);

    newLi.appendChild(deleteButton);
    ul.appendChild(newLi);

    this.itemObj[this.uid] = item;

    document.getElementById(this.name + ' submit button').disabled = false;
    document.getElementById(this.name + ' input text').value = "";
    document.getElementById(this.name + ' add button').disabled = true;
  }

  checkTextEmpty() {
    if (document.getElementById(this.name + ' input text').value === "") {
      document.getElementById(this.name + ' add button').disabled = true;
    } else {
      document.getElementById(this.name + ' add button').disabled = false;
    }
  }

  reset() {
    const ul = document.getElementById(this.name + ' output list');

    while (ul.firstChild) {
      ul.removeChild(ul.firstChild);
    }

    document.getElementById(this.name + ' input text').value = "";
    document.getElementById(this.name + ' submit button').disabled = true;
    document.getElementById(this.name + ' add button').disabled = true;

    this.uid = 0;
    this.itemObj = {};

  }

  deleteItem(uid) {
    const ul = document.getElementById(this.name + ' output list');
    const li = document.getElementById(this.name + ' ' + uid);

    ul.removeChild(li);
    delete this.itemObj[uid];

    if (Object.keys(this.itemObj).length === 0) {
      document.getElementById(this.name + ' submit button').disabled = true;
    }
  }


  submitList(e) {
    e.preventDefault();
    let submitList = [];

    for (let i = 0; i <= this.uid; i++) {
      if (i in this.itemObj) {
        submitList.push(this.itemObj[i]);
      }
    }

    this.reset();

    return this.cb(submitList);
  }

}

const newItemList = (name, cb) => (new ItemList(name, cb));
