var arr = [];

document.addEventListener("DOMContentLoaded", function () {
  console.log("loaded");
  searchByName("");
});
function showLoadingScreen() {
  document.getElementById("loadingScreen").style.opacity = "1";
  document.getElementById("loadingScreen").style.visibility = "visible";
}

function hideLoadingScreen() {
  document.getElementById("loadingScreen").style.opacity = "0";
  document.getElementById("loadingScreen").style.visibility = "hidden";
}

function openNav() {
  $(".side-nav-menu").animate(
    {
      left: 0,
    },
    500
  );

  $(".open-close-icon").removeClass("fa-align-justify");
  $(".open-close-icon").addClass("fa-x");

  for (let i = 0; i < 5; i++) {
    $(".links li").eq(i).animate(
      {
        top: 0,
      },
      500
    );
  }
}

function closeNav() {
  let boxWidth = $(".side-nav-menu .tabs").outerWidth();
  $(".side-nav-menu").animate(
    {
      left: -boxWidth,
    },
    500
  );

  $(".open-close-icon").addClass("fa-align-justify");
  $(".open-close-icon").removeClass("fa-x");

  $(".links li").animate(
    {
      top: 300,
    },
    500
  );
}

closeNav();
$(".side-nav-menu .open-close-icon").click(() => {
  if ($(".side-nav-menu").css("left") == "0px") {
    closeNav();
  } else {
    openNav();
  }
});

async function searchByName(searchvalue) {
  showLoadingScreen();
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchvalue}`
  );
  response = await response.json();

  if (response) {
    hideLoadingScreen();
  }

  // console.log(response.meals);
  displayMeals(response.meals);
}

function displayMeals(arr) {
  let box = ``;
  for (let i = 0; i < arr.length; i++) {
    box += `
        <div class="col-md-3">
            <div  onclick="getDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer ">
                <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                <div class="meal-layer position-absolute d-flex align-items-center justify-content-center text-black p-2">
                    <h3>${arr[i].strMeal}</h3>
                </div>
            </div>
        </div>
    `;
  }
  document.querySelector(".container .rowDisplay").innerHTML = box;
}

// function showSearchInputs() {
//     document.getElementById("searchIN").innerHTML = `
//     <div class="row py-4 ">
//         <div class="col-md-6 ">
//             <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
//         </div>
//         <div class="col-md-6">
//             <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
//         </div>
//     </div>`

//     document.querySelector('.container .rowDisplay').innerHTML = "";
// }
let searchInput = document.getElementById("searchIN");
searchInput.addEventListener("keyup", function (e) {
  // console.log(e)
  let inputValue = e.target.value;

  if (inputValue.length && inputValue != "") {
    searchByName(inputValue);
  }
  // console.log(inputValue)
});
$("#searchBtn").click(() => {
  closeNav();
  $(".inputss").toggleClass("d-none d-block");
  document.querySelector(".container .rowDisplay").innerHTML = "";
  document.querySelector(".displayy").classList.replace("d-none", "d-block");
  document.querySelector(".contactUs").classList.replace("d-block", "d-none");
  document.getElementById("detailsssss").classList.replace("d-block", "d-none");
});

async function getDetails(id) {
  showLoadingScreen();
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  response = await response.json();
  // displayIngredient(response.meals.slice(0, 20));
  // displayMeals(response.meals);
  if (response) {
    hideLoadingScreen();
  }
  console.log(response.meals);
  displayDetails(response.meals[0]);
  document.querySelector(".displayy").classList.replace("d-block", "d-none");
  document.getElementById("detailsssss").classList.replace("d-none", "d-block");
}

function displayDetails(meal) {
  let box = ``;
  let ingredients = ``;

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients += `<li class="alert alert-info m-2 p-1">${
        meal[`strMeasure${i}`]
      } ${meal[`strIngredient${i}`]}</li>`;
    }
  }

  let tags = meal.strTags?.split(",");
  if (!tags) tags = [];

  let tagsStr = "";
  for (let i = 0; i < tags.length; i++) {
    tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`;
  }

  box += `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
      
        
            </div>`;

  document.querySelector(".details").innerHTML = box;
}
async function searchByFLetter(term) {
  if (term === "") {
  } else {
    let Letter = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`
    );
    Letter = await Letter.json();
    displayMeals(Letter.meals);
  }
}

let searchInn = document.getElementById("Letter");
searchInn.addEventListener("keyup", function (e) {
  // console.log(e)
  let searchInn = e.target.value;
  searchByFLetter(searchInn);
});

async function getCategories() {
  showLoadingScreen();
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  response = await response.json();
  if (response) {
    hideLoadingScreen();
  }
  // console.log(response.categories);
  displayCategories(response.categories);
}
document.getElementById("filterBtn").addEventListener("click", function () {
  getCategories();
  document.querySelector(".displayy").classList.replace("d-none", "d-block");
  document.querySelector(".contactUs").classList.replace("d-block", "d-none");
  document.querySelector(".inputss").classList.add("d-none");
  document.getElementById("detailsssss").classList.replace("d-block", "d-none");
});

function displayCategories(arr) {
  let box = " ";

  for (let i = 0; i < arr.length; i++) {
    box += `
        <div class="col-md-3">
                <div onclick="getClickOnCategories('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strCategoryThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${arr[i].strCategory}</h3>
                        <p>${arr[i].strCategoryDescription}</p>
                    </div>
                </div>
        </div>
        `;
  }

  document.querySelector(".container .rowDisplay").innerHTML = box;
}

async function getClickOnCategories(get) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${get}`
  );
  response = await response.json();
  // console.log(response.categories);
  // displayCategories(response.categories);
  // console.log(response.meals)
  displayMeals(response.meals);
}

async function getIngredient() {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  response = await response.json();
  console.log(response.meals);
  displayIngredient(response.meals.slice(0, 20));
}

function displayIngredient(arr) {
  let box = " ";

  for (let i = 0; i < arr.length; i++) {
    box += `
        <div class="col-md-3">
                <div onclick="getMainGredient('${
                  arr[i].strIngredient
                }')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x " style="color:white;"></i>
                        <h3 class="text-white">${arr[i].strIngredient}</h3>
                        <p class="text-white">${arr[i].strDescription
                          .split(" ")
                          .slice(0, 20)
                          .join(" ")}</p>
                </div>
        </div>
        `;
  }

  document.querySelector(".container .rowDisplay").innerHTML = box;
}

async function getMainGredient() {
  showLoadingScreen();
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast`
  );
  response = await response.json();
  if (response) {
    hideLoadingScreen();
  }
  // console.log(response.meals);
  // displayIngredient(response.meals.slice(0, 20));
  displayMeals(response.meals);
}
// getMainGredient();
document.getElementById("ingredient").addEventListener("click", function () {
  document.querySelector(".displayy").classList.replace("d-none", "d-block");
  document.querySelector(".contactUs").classList.add("d-none");
  document.querySelector(".inputss").classList.add("d-none");
  document.getElementById("detailsssss").classList.replace("d-block", "d-none");
  getIngredient();

  // document.getElementById('').classList.remove('');
});

async function getArea() {
  showLoadingScreen();
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  response = await response.json();
  if (response) {
    hideLoadingScreen();
  }
  console.log(response.meals);
  displayArea(response.meals);
}
function displayArea(arr) {
  let box = " ";

  for (let i = 0; i < arr.length; i++) {
    box += `
        <div class="col-md-3">
        <div onclick="getMealArea('${arr[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                <i class="fa-solid fa-house-laptop fa-4x"style="color:white;"></i>
                <h3 style="color:white;">${arr[i].strArea}</h3>
        </div>
        </div>
        `;
  }

  document.querySelector(".container .rowDisplay").innerHTML = box;
}
async function getMealArea(located) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${located}`
  );
  response = await response.json();
  console.log(response.meals);
  // displayArea(response.meals)
  displayMeals(response.meals);
}
document.getElementById("areaBtn").addEventListener("click", function () {
  document.querySelector(".displayy").classList.replace("d-none", "d-block");
  document.querySelector(".contactUs").classList.add("d-none");
  document.querySelector(".inputss").classList.add("d-none");
  document.getElementById("detailsssss").classList.replace("d-block", "d-none");
  getArea();
  closeNav();
});

function Validation() {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var phone = document.getElementById("phone").value;
  var age = document.getElementById("age").value;
  var password = document.getElementById("password").value;
  var rePassword = document.getElementById("repassword").value;

  var isNameValid = /^[a-zA-Z\s]*$/.test(name);
  var isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  var isPhoneValid = /^\d{10}$/.test(phone);
  var isAgeValid = /^\d+$/.test(age);
  var isPasswordValid = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(password);
  var isRePasswordValid = password === rePassword;

  document.getElementById("nameA").classList.toggle("d-none", isNameValid);
  document.getElementById("emailA").classList.toggle("d-none", isEmailValid);
  document.getElementById("phoneA").classList.toggle("d-none", isPhoneValid);
  document.getElementById("ageA").classList.toggle("d-none", isAgeValid);
  document.getElementById("pass").classList.toggle("d-none", isPasswordValid);
  document
    .getElementById("repass")
    .classList.toggle("d-none", isRePasswordValid);

  var isFormValid =
    isNameValid &&
    isEmailValid &&
    isPhoneValid &&
    isAgeValid &&
    isPasswordValid &&
    isRePasswordValid;
  document.getElementById("submitBtn").disabled = !isFormValid;
}
document.getElementById("Contact").addEventListener("click", function () {
  document.getElementById("detailsssss").classList.replace("d-block", "d-none");
  document.querySelector(".displayy").classList.replace("d-block", "d-none");
  document.querySelector(".contactUs").classList.replace("d-none", "d-block");
  closeNav();
});
