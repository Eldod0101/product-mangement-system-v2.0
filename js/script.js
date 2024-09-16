// Programmed by - Eldod - 2024
let title = document.getElementById("title");
let price = document.getElementById("price");
let tax = document.getElementById("tax");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("submit");
let tbody = document.getElementById("tbody");
let search = document.getElementById("search");
let searchTitle = document.getElementById("searchTitle");
let searchCategory = document.getElementById("searchCategory");
let deleteAll = document.getElementById("deleteAll");
let tbodySelled = document.getElementById("tbodySelled");
let mood = "create";
let updateIndex;
let searchMood = "title";

//Get Total
total.innerHTML = "0 $";

function getTotal() {
    console.log(price.value, tax.value, ads.value, discount.value);
    if (price.value != "") {
        let totalPrice = (+price.value + +tax.value + +ads.value) - +discount.value;
        total.style.background = "#040";
        total.innerHTML = totalPrice + " $";
        if (totalPrice.toString().length > 7) {
            total.style.marginLeft = "1.5%";
        }
        if (totalPrice.toString().length > 8) {
            total.style.marginLeft = "1%";
        }
    } else {
        total.innerHTML = "0 $";
        total.style.background = "#a00d02";
    }
}
//create product

let dataProduct;

if (localStorage.product != null) {
    dataProduct = JSON.parse(localStorage.product);
} else {
    dataProduct = [];
}

clearData = () => {
    title.value = "";
    price.value = "";
    tax.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "0 $";
    count.value = "";
    category.value = "";
}
create.onclick = function() {
    let newproduct = {
        title: title.value.toLowerCase(),
        price: price.value,
        tax: tax.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    };

    if (title.value != "" && price.value != "" && category.value != "" && count.value <= 100) {
        if (mood === "create") {

            dataProduct.push(newproduct);
            clearData();
            window.location.reload(true);
        } else {
            dataProduct[updateIndex] = newproduct;
            mood = "create";
            create.innerHTML = "create";
            count.style.display = "block";
            clearData();
            window.location.reload(true);
        }
    } else if (count.value > 100) {
        alert("The count must not be greater than 100!!")
    } else if (title.value == "") {
        alert("The title must not be empty!!")
    } else if (price.value == "") {
        alert("The price must not be empty!!")
    } else if (category.value == "") {
        alert("The category must not be empty!!")
    }

    localStorage.setItem("product", JSON.stringify(dataProduct));
    //clear data

    showData()

}

//show data
function showData() {
    getTotal()
    let table = '';
    for (let i = 0; i < dataProduct.length; i++) {
        table += `
        <tr>
            <td>${i + 1}</td>
            <td>${dataProduct[i].title}</td>    
            <td>${dataProduct[i].price}</td>
            <td>${dataProduct[i].tax}</td>
            <td>${dataProduct[i].ads}</td>
            <td>${dataProduct[i].discount}</td>
            <td>${dataProduct[i].total}</td>
            <td>${dataProduct[i].category}</td>
            <td>${dataProduct[i].count}
            <button onclick="countDown(${i})" id="countDown">-</button>
            <button onclick="countUp(${i})" id="countUp">+</button>
            </td>
            <td>
                <button onclick="deleteData(${i})" id="delete">Delete</button>
                <button onclick="updateData(${i})" id="update">Update</button>
            </td>
            <td><button onclick="sell(${i})" id="sell">Sell</button></td>
        </tr>
        `
    }
    tbody.innerHTML = table;
    if (dataProduct.length > 0) {
        deleteAll.innerHTML = `<button onclick="deleteAllProduct()">delete All (${dataProduct.length})</button>`
    } else {
        deleteAll.innerHTML = ``;
    }

}
showData()


//Delete product
function deleteData(i) {
    dataProduct.splice(i, 1);
    localStorage.product = JSON.stringify(dataProduct);
    showData();
}

// Count Up
function countUp(i) {
    dataProduct[i].count++;
    localStorage.product = JSON.stringify(dataProduct);
    showData();
}

// Count Down
function countDown(i) {
    dataProduct[i].count--;
    localStorage.product = JSON.stringify(dataProduct);
    showData();
}

//Delete All
function deleteAllProduct() {
    password = window.prompt("Enter your password (12345)");
    if (password == "12345") {
        //remove local storage (product)

        localStorage.removeItem("product");
        dataProduct.splice(0);
        showData();
    } else {
        window.alert("wrong password");
    }
}


//Update
function updateData(i) {
    title.value = dataProduct[i].title;
    price.value = dataProduct[i].price;
    tax.value = dataProduct[i].tax;
    ads.value = dataProduct[i].ads;
    discount.value = dataProduct[i].discount;
    getTotal();
    category.value = dataProduct[i].category;
    count.value = dataProduct[i].count;

    create.innerHTML = "update";
    updateIndex = i;
    mood = "update";
    scroll({
        top: 0,
        behavior: "smooth",
    });
}


function getSearchMood(id) {

    if (id == "searchTitle") {
        searchMood = "title";
        console.log(searchMood)
        search.placeholder = "search by title";
    } else {
        searchMood = "category";
        search.placeholder = "search by category";

    }
    search.focus();
}


function searchData(value) {
    console.log(value)
    let table = ``;
    value = value.toLowerCase(); // Ensure the search input is in lowercase
    if (searchMood == "title") {
        for (let i = 0; i < dataProduct.length; i++) {
            if (dataProduct[i] && dataProduct[i].title && dataProduct[i].title.includes(value)) {
                console.log(dataProduct[i].title)
                table += `
                <tr>
            <td>${i + 1}</td>
            <td>${dataProduct[i].title}</td>    
            <td>${dataProduct[i].price}</td>
            <td>${dataProduct[i].tax}</td>
            <td>${dataProduct[i].ads}</td>
            <td>${dataProduct[i].discount}</td>
            <td>${dataProduct[i].total}</td>
            <td>${dataProduct[i].category}</td>
            <td>${dataProduct[i].count}
            <button onclick="countDown(${i})" id="countDown">-</button>
            <button onclick="countUp(${i})" id="countUp">+</button>
            </td>
            <td>
                <button onclick="deleteData(${i})" id="delete">Delete</button>
                <button onclick="updateData(${i})" id="update">Update</button>
            </td>
            <td><button onclick="sell(${i})" id="sell">Sell</button></td>
        </tr>
                `;
            }
        }
    } else if (searchMood == "category") {
        for (let i = 0; i < dataProduct.length; i++) {
            if (dataProduct[i] && dataProduct[i].category && dataProduct[i].category.includes(value)) {
                table += `
                <tr>
            <td>${i + 1}</td>
            <td>${dataProduct[i].title}</td>    
            <td>${dataProduct[i].price}</td>
            <td>${dataProduct[i].tax}</td>
            <td>${dataProduct[i].ads}</td>
            <td>${dataProduct[i].discount}</td>
            <td>${dataProduct[i].total}</td>
            <td>${dataProduct[i].category}</td>
            <td>${dataProduct[i].count}
            <button onclick="countDown(${i})" id="countDown">-</button>
            <button onclick="countUp(${i})" id="countUp">+</button>
            </td>
            <td>
                <button onclick="deleteData(${i})" id="delete">Delete</button>
                <button onclick="updateData(${i})" id="update">Update</button>
            </td>
            <td><button onclick="sell(${i})" id="sell">Sell</button></td>
        </tr>
                `;
            }
        }
    }

    if (table === ``) {
        tbody.innerHTML = `<tr><td colspan="10">No products found</td></tr>`;
    } else {
        tbody.innerHTML = table;
    }
}

//Sell Product and send to Selled Products

let dataSelled;

if (localStorage.product != null) {
    dataSelled = JSON.parse(localStorage.selled);
} else {
    dataSelled = [];
}

function sell(i) {
    if (dataProduct[i].count > 0) {
        dataProduct[i].count--;
        dataSelled.push(dataProduct[i]);

        // تحديث البيانات في localStorage
        localStorage.product = JSON.stringify(dataProduct);
        localStorage.selled = JSON.stringify(dataSelled);

        // إذا كانت الكمية المتبقية من المنتج صفر، قم بحذفه وأظهر تنبيه
        if (dataProduct[i].count === 0) {
            alert(`Product ${dataProduct[i].title} is sold out!`);
            dataProduct.splice(i, 1); // حذف المنتج من المصفوفة
            localStorage.product = JSON.stringify(dataProduct); // تحديث localStorage بعد الحذف
        }

        showData(); // تحديث عرض البيانات
    }
}

// قائمة الفئات

document.addEventListener('DOMContentLoaded', function() {
    const categoryInput = document.getElementById('category');
    const categoryList = document.getElementById('categories');
    let categories = [];

    // تحميل الفئات من localStorage
    if (localStorage.getItem('product')) {
        const products = JSON.parse(localStorage.getItem('product'));
        categories = [...new Set(products.map(product => product.category))];
        updateCategoryList();
    }

    // تحديث قائمة الفئات
    function updateCategoryList() {
        categoryList.innerHTML = '';
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            categoryList.appendChild(option);
        });
    }

});


document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggleMode');
    const themeStylesheet = document.getElementById('themeStylesheet');

    // التحقق من تفضيل المستخدم المخزن في localStorage
    if (localStorage.getItem('theme') === 'night') {
        themeStylesheet.href = 'css/nightStyle.css';
    } else {
        themeStylesheet.href = 'css/style.css';
    }

    // وظيفة تبديل الوضع
    toggleButton.addEventListener('click', function() {
        if (themeStylesheet.href.includes('css/style.css')) {
            themeStylesheet.href = 'css/nightStyle.css';
            localStorage.setItem('theme', 'night');
        } else {
            themeStylesheet.href = 'css/style.css';
            localStorage.setItem('theme', 'day');
        }
    });
});