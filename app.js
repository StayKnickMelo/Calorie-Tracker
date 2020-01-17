// Storage Controller

const StorageCtrl = (function () {

  return {
    loadItemsFromLS: function () {
      if (localStorage.getItem('items')) {
        const items = JSON.parse(localStorage.getItem('items'));

        return items;
      }

    },
    addItemToLS: function (item) {
      let items;
      if (localStorage.getItem('items') === null) {
        items = [];

      } else {
        items = JSON.parse(localStorage.getItem('items'));

      }
      items.push(item);

      localStorage.setItem('items', JSON.stringify(items));

    },
    deleteItemFromLS: function (itemToDeleteID) {
      const items = JSON.parse(localStorage.getItem('items'));

      items.forEach((item, index) => {
        if (item.id === itemToDeleteID) {
          items.splice(index, 1);
        }
      })

      localStorage.setItem('items', JSON.stringify(items));

    },
    clearAll: function () {
      localStorage.removeItem('items');

    },
    updateItemLS: function (id, updatedItem) {
      const items = JSON.parse(localStorage.getItem('items'));

      items.forEach(item => {
        if (item.id === id) {
          item.calories = parseInt(updatedItem.calories)
          item.name = updatedItem.name;

        }

      });

      localStorage.setItem('items', JSON.stringify(items));

    }
  }

})();

// Item Controller
const ItemCtrl = (function () {
  // Item Constructor

  const Item = function (id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;

  }

  // Data Structure / State
  const data = {
    items: [
      // { id: 0, name: 'Steak Dinner', calories: 1200 },
      // { id: 1, name: 'Cookie', calories: 400 },
      // { id: 2, name: 'Eggs', calories: 300 }
    ],
    // items: StorageCtrl.loadItemsFromLS(),
    currentItem: null,
    totalCalories: 0
  }



  return {
    logData: function () {
      return data;
    },
    getItems: function () {
      return data.items;
    },
    getTotalCalories: function () {

      data.totalCalories = 0;
      data.items.forEach(item => {
        data.totalCalories += item.calories;

      });

      return data.totalCalories;

    },
    addItem(name, calories) {
      let ID;
      // Create ID

      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;

      } else {
        ID = 0;
      }

      calories = parseInt(calories);

      // Create New Itam

      const newItem = new Item(ID, name, calories);


      // Add to items Array
      data.items.push(newItem);

      // Add item to LS/////////////////////////////////////////////////
      // StorageCtrl.addItemToLS(newItem);


      return newItem;
    },
    setCurrentItem: function (id) {
      data.currentItem = id;
    },
    getCurrentIten: function () {
      return data.currentItem;
    },
    deleteItem: function (id) {
      data.items.forEach((item, index) => {
        if (item.id === id) {
          data.items.splice(index, 1);
          data.totalCalories -= item.calories;
        }
      });




    },
    clearAll: function () {
      data.items = [];

    },
    updateCurItem: function (id, updatedItem) {
      data.items.forEach(item => {
        if (item.id === id) {
          item.calories = parseInt(updatedItem.calories)
          item.name = updatedItem.name;

        }
      });




    }
  }


})();

// UI Controller
const UICtrl = (function () {

  const UISelectors = {
    itemList: '#item-list',
    addBtn: '.add-btn',
    deleteBtn: '.delete-btn',
    updateBtn: '.update-btn',
    backBtn: '.back-btn',
    clearBtn: '.clear-btn',
    name: '#item-name',
    calories: '#item-calories',
    total: '.total-calories',
    items: '.collection-item'

  }

  return {
    populateItemList: function (items) {
      let html = '';

      items.forEach(item => {
        html += `
        <li class="collection-item" id="item-${item.id}">
        <strong>${item.name}: </strong> <em> ${item.calories} Calories</em>
        <a href="#" class="secondary-content"><i class="fa fa-pen"></i></a>
      </li>`
      });

      const ul = document.querySelector(UISelectors.itemList);

      ul.innerHTML = html;

    },

    getSelectors: function () {
      return UISelectors;
    },

    getItemInput: function () {
      return {
        name: document.querySelector(UISelectors.name).value,
        calories: document.querySelector(UISelectors.calories).value
      }
    },
    addItemToUI: function (item) {

      // Show List
      UICtrl.showList();

      const li = document.createElement('li');

      li.className = 'collection-item';

      li.id = `item-${item.id}`;

      const strong = document.createElement('strong');

      strong.textContent = `${item.name}:`;

      const em = document.createElement('em');

      em.textContent = `${item.calories} Calories`;

      const a = document.createElement('a');

      a.setAttribute('href', '#');

      a.className = 'secondary-content';

      const i = document.createElement('i');

      i.className = 'fa fa-pen';

      a.appendChild(i);

      li.appendChild(strong)

      li.appendChild(em)

      li.appendChild(a);

      document.querySelector(UISelectors.itemList).appendChild(li);
    },
    addTotalCalories: function (total) {
      document.querySelector(UISelectors.total).textContent = total;

    },
    clearFields: function () {
      document.querySelector(UISelectors.name).value = '';
      document.querySelector(UISelectors.calories).value = '';

    },
    hideList: function () {
      document.querySelector(UISelectors.itemList).style.display = 'none';
    },
    hideBtns: function () {
      document.querySelector(UISelectors.deleteBtn).style.display = 'none';
      document.querySelector(UISelectors.updateBtn).style.display = 'none';
      document.querySelector(UISelectors.backBtn).style.display = 'none';

    },
    showList: function () {
      document.querySelector(UISelectors.itemList).style.display = 'block';

    },
    editState: function (name, calories) {
      document.querySelector(UISelectors.deleteBtn).style.display = 'inline-block';
      document.querySelector(UISelectors.updateBtn).style.display = 'inline-block';
      document.querySelector(UISelectors.backBtn).style.display = 'inline-block';

      document.querySelector(UISelectors.addBtn).style.display = 'none';

      document.querySelector(UISelectors.name).value = name;
      document.querySelector(UISelectors.calories).value = calories;


    },
    initialState: function () {

      document.querySelector(UISelectors.deleteBtn).style.display = 'none';
      document.querySelector(UISelectors.updateBtn).style.display = 'none';
      document.querySelector(UISelectors.backBtn).style.display = 'none';

      document.querySelector(UISelectors.addBtn).style.display = 'inline-block';

      UICtrl.clearFields();

    },
    deleteItemFromUI: function (id) {
      const items = document.querySelectorAll(UISelectors.items);

      items.forEach(item => {
        if (parseInt(item.id.split('-')[1]) === id) {
          item.remove();
        }
      })
    },

    clearAll() {
      const items = document.querySelectorAll(UISelectors.items);

      items.forEach(item => item.remove());

      document.querySelector(UISelectors.total).textContent = '';

    },
    updateItemUI: function (id, updatedItem) {
      const items = document.querySelectorAll(UISelectors.items);

      items.forEach(item => {
        if (parseInt(item.id.split('-')[1]) === id) {

          item.firstElementChild.textContent = `${updatedItem.name}: `;
          item.firstElementChild.nextElementSibling.textContent = `${updatedItem.calories} Calories`;
        }
      });

    }
  }

})();

// App Controller

const App = (function (ItemCtrl, StorageCtrl, UICtrl) {

  // ???
  // const UISelectors = UICtrl.getSelectors();

  // Load event listeners

  const loadEventListeners = function () {
    const UISelectors = UICtrl.getSelectors();


    // Load ITEMS from LS

    document.addEventListener('DOMContentLoaded', loadItems);

    // Add Item Event

    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);


    // Change To Edit State
    document.querySelector(UISelectors.itemList).addEventListener('click', showEditState);

    // Hide Edit State
    document.querySelector(UISelectors.backBtn).addEventListener('click', hideEditState);

    // Delete item
    document.querySelector(UISelectors.deleteBtn).addEventListener('click', deleteItem);

    // Clear All
    document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItems);

    // Edit Item
    document.querySelector(UISelectors.updateBtn).addEventListener('click', updateItem);



  }

  // Add Item submit
  const itemAddSubmit = function (e) {
    e.preventDefault();

    // Get form input from UICtrl

    const input = UICtrl.getItemInput();

    if (input.name !== '' && input.calories !== '') {
      const newItem = ItemCtrl.addItem(input.name, input.calories);


      UICtrl.addItemToUI(newItem);

      // Add Item To LS
      StorageCtrl.addItemToLS(newItem);////////////////////////////////////

      // Get Total calories
      const totalCalories = ItemCtrl.getTotalCalories();

      // Display Total calories

      UICtrl.addTotalCalories(totalCalories);

      UICtrl.clearFields();

      console.log(ItemCtrl.logData());

    }

  }

  const showEditState = function (e) {
    if (e.target.className === 'fa fa-pen') {

      let name = e.target.parentElement.parentElement.firstElementChild.textContent;

      let calories = e.target.parentElement.parentElement.firstElementChild.nextElementSibling.textContent;

      calories = calories.split(' ')[0];

      name = name.slice(0, name.length - 1);

      let id = e.target.parentElement.parentElement.id;

      id = parseInt(id.split('-')[1]);

      // Set Current ITEM
      ItemCtrl.setCurrentItem(id);

      UICtrl.editState(name, calories);
    }
  }

  const hideEditState = function (e) {
    UICtrl.initialState();

  }

  const deleteItem = function () {

    const currentItemID = ItemCtrl.getCurrentIten();
    console.log(currentItemID);

    ItemCtrl.deleteItem(currentItemID);

    UICtrl.deleteItemFromUI(currentItemID);

    // Delete From LS//////////////////////
    StorageCtrl.deleteItemFromLS(currentItemID);

    UICtrl.initialState();

    const totalCalories = ItemCtrl.getTotalCalories();

    UICtrl.addTotalCalories(totalCalories);


  }



  const clearAllItems = function () {
    StorageCtrl.clearAll();

    ItemCtrl.clearAll();

    UICtrl.clearAll();
  }

  const updateItem = function () {
    const currentItemID = ItemCtrl.getCurrentIten();

    const currentItemInput = UICtrl.getItemInput();

    ItemCtrl.updateCurItem(currentItemID, currentItemInput);

    UICtrl.updateItemUI(currentItemID, currentItemInput);

    // UPDATE IN LS ///////////////////////
    StorageCtrl.updateItemLS(currentItemID, currentItemInput);

    // GET TOTAL CALS FROM LS////////////////

    const items = StorageCtrl.loadItemsFromLS();

    let totalCalories = 0;

    items.forEach(item => {
      totalCalories += item.calories
    })


    UICtrl.addTotalCalories(totalCalories);

    UICtrl.initialState();
  }

  const loadItems = function () {
    const items = StorageCtrl.loadItemsFromLS();

    items.forEach(item => {
      UICtrl.addItemToUI(item);
    });

    


    let totalCalories = 0;

    items.forEach(item => {
      totalCalories += item.calories

    });

    UICtrl.addTotalCalories(totalCalories);
  }


  return {
    init: function () {
      // Fetch Items from Data Structure
      const items = ItemCtrl.getItems();

      // Check if any items
      if (items.length === 0) {
        UICtrl.hideList()

      } else {

        // Populate list with items
        UICtrl.populateItemList(items);

        const totalCalories = ItemCtrl.getTotalCalories();

        UICtrl.addTotalCalories(totalCalories);


      }

      // HIDE BTNS
      UICtrl.hideBtns();


      // Load event Listeners
      loadEventListeners();

    }
  }

})(ItemCtrl, StorageCtrl, UICtrl);

App.init();








