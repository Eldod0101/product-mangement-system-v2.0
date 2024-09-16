let tbodySelled = document.getElementById("tbodySelled");
let dataSelled;
let numberOfProducts;
let searchMood = "title";
// check if local storage (selled) is empty
if (localStorage.selled != null) {
    dataSelled = JSON.parse(localStorage.selled);
    numberOfProducts = dataSelled.length

} else {
    dataSelled = [];
}

// Show data in table from local storage
function showData() {
    let table = ``;
    for (let i = 0; i < dataSelled.length; i++) {
        table += `
        <tr>
            <td>${i + 1}</td>
            <td>${dataSelled[i].title}</td>
            <td>${dataSelled[i].price}</td>
            <td>${dataSelled[i].tax}</td>
            <td>${dataSelled[i].ads}</td>
            <td>${dataSelled[i].discount}</td>
            <td>${dataSelled[i].total}</td>
            <td>${dataSelled[i].category}</td>

        </tr>
        `;
    }

    if (table === ``) {
        tbodySelled.innerHTML = `<tr><td colspan="10">No products found</td></tr>`;
    } else {
        tbodySelled.innerHTML = table;
    }
}
showData()

//if local storage (selled) has any changes after page reload then show data like previous in loop
window.addEventListener('storage', function(event) {
    if (event.key === 'selled') {
        dataSelled = JSON.parse(event.newValue);
        numberOfProducts = dataSelled.length;
        showData();
    }
});



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
    let table = ``;
    value = value.toLowerCase(); // Ensure the search input is in lowercase
    if (searchMood == "title") {
        for (let i = 0; i < dataSelled.length; i++) {
            if (dataSelled[i] && dataSelled[i].title && dataSelled[i].title.includes(value)) {
                table += `
                <tr>
                        <td>${i + 1}</td>
                        <td>${dataSelled[i].title}</td>
                        <td>${dataSelled[i].price}</td>
                        <td>${dataSelled[i].tax}</td>
                        <td>${dataSelled[i].ads}</td>
                        <td>${dataSelled[i].discount}</td>
                        <td>${dataSelled[i].total}</td>
                        <td>${dataSelled[i].category}</td>  
                </tr>
                `;
            }
        }
    } else if (searchMood == "category") {
        for (let i = 0; i < dataSelled.length; i++) {
            if (dataSelled[i] && dataSelled[i].category && dataSelled[i].category.includes(value)) {
                table += `
                <tr>
                        <td>${i + 1}</td>
                        <td>${dataSelled[i].title}</td>
                        <td>${dataSelled[i].price}</td>
                        <td>${dataSelled[i].tax}</td>
                        <td>${dataSelled[i].ads}</td>
                        <td>${dataSelled[i].discount}</td>
                        <td>${dataSelled[i].total}</td>
                        <td>${dataSelled[i].category}</td>  
                </tr>
                `;
            }
        }
    }

    if (table === ``) {
        tbodySelled.innerHTML = `<tr><td colspan="10">No products found</td></tr>`;
    } else {
        tbodySelled.innerHTML = table;
    }
}


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