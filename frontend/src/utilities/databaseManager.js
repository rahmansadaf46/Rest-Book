const getUser = () => {
    const existingUser = sessionStorage.getItem('userId');
    if (existingUser) {
        return existingUser;
    } else {
        const newUser = 'user-' + new Date().getTime();
        sessionStorage.setItem('userId', newUser)
        return newUser;
    }
}


const getDataKey = () => {
    const userId = getUser();
    return `redOnion/carts/${userId}`
}

// push to local storage: a temporary place for database
const getDatabaseCart = () => {
    const dataKey = getDataKey();
    const data = localStorage.getItem('bookData') || "{}";
    return JSON.parse(data);
}

const addToDatabaseCart = (key, count, item, restaurant, tableData) => {
    const currentCart = getDatabaseCart();
    if (currentCart?.foodData?.length > 0) {
        item.count = count;
        currentCart.foodData.push(item)
        let restaurantData = restaurant;
        localStorage.setItem('bookData', JSON.stringify({ foodData: currentCart.foodData, restaurantData: restaurantData, tableData: tableData }));
    } else {
        let itemData = [];
        item.count = count;
        itemData.push(item)
        let restaurantData = restaurant;
        localStorage.setItem('bookData', JSON.stringify({ foodData: itemData, restaurantData: restaurantData, tableData: tableData }));
    }

}
const updateToDatabaseCart = (key, count, item, restaurant) => {
    const currentCart = getDatabaseCart();
    console.log(count, item, restaurant)
    console.log(currentCart)
    if (currentCart.restaurantData._id !== restaurant._id) {
        window.alert('Are you sure')
    } else {
        // Find the item in the foodData array based on the _id
        let itemToUpdate = currentCart.foodData.find(item => item._id === key);

        if (itemToUpdate) {
            // Update the count property with the newCount value
            itemToUpdate.count = count;
        } else {
            console.log("Item not found in foodData array.");
        }

        console.log(itemToUpdate, count, currentCart);
    }
    // currentCart[key] = count;
    // let itemData = []; 
    // let itemDataProductCount = [];
    // itemDataProductCount.push(currentCart)
    // item.count = count;
    // itemData.push(item)
    // let restaurantData = restaurant;
    localStorage.setItem('bookData', JSON.stringify(currentCart));
}
const minusToDatabaseCart = (key, count) => {
    const currentCart = getDatabaseCart();
    currentCart[key] = count--;
    localStorage.setItem(getDataKey(), JSON.stringify([currentCart]));
}
const removeFromDatabaseCart = key => {
    const currentCart = getDatabaseCart();
    delete currentCart[key];
    localStorage.setItem(getDataKey(), JSON.stringify(currentCart));
}

const processOrder = (cart) => {
    localStorage.removeItem(getDataKey());
}


export { updateToDatabaseCart, addToDatabaseCart, getDatabaseCart, removeFromDatabaseCart, processOrder, minusToDatabaseCart };


// polyfill to support older browser
const localStorage = window.localStorage || (() => {
    let store = {}
    return {
        getItem(key) {
            return store[key]
        },
        setItem(key, value) {
            store[key] = value.toString()
        },
        clear() {
            store = {}
        }
    };
})()

const sessionStorage = window.sessionStorage || (() => {
    let store = {}
    return {
        getItem(key) {
            return store[key]
        },
        setItem(key, value) {
            store[key] = value.toString()
        },
        clear() {
            store = {}
        }
    };
})()
// end of poly fill