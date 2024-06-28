const FOOD_URL = "https://www.themealdb.com/api/json/v1/1/random.php"

let foodArray = []
const button = document.getElementById('btn')
const inputVal = document.getElementById('input')
inputVal.min = 1
inputVal.value = 1

inputVal.addEventListener('input', () => {
    button.innerText = `Get ${inputVal.value} random yum yums`
})

document.getElementById('btn').addEventListener('click', async () => {
    //clear foodArray
    foodArray = []
    //clear the div
    const cardHolder = document.getElementById('cardHolder')
    while (cardHolder.firstChild) {
        cardHolder.removeChild(cardHolder.lastChild)
    }
    //fetch data
    fetchFoodData(inputVal.value)
    fetchFoodDataWithPromiseAll(inputVal.value)
    //reset input val
    inputVal.value = 1
    button.innerText = `Get 1 random yum yum`

})

const fetchFoodData = async (numOfFoods) => {
    const start = new Date()
    //add loading
    const loadingDiv = document.createElement("div");
    loadingDiv.textContent = "Loading...";
    document.getElementById('cardHolder').appendChild(loadingDiv);
    //get x foods
    for (let i = 0; i < numOfFoods; i++) {

        try {
            const response = await fetch(FOOD_URL)
            const data = await response.json()
            foodArray.push(data)
        }
        catch {
            e => {
                console.log(e)
            }
        }
    }
    const end = new Date()
    console.log(`with for loop: ${end - start}`)
    displayFoodCards()
    loadingDiv.remove();
}

const fetchFoodDataWithPromiseAll = async (numOfFoods) => {
    const start = new Date()
    //add loading
    const loadingDiv = document.createElement("div");
    loadingDiv.textContent = "Loading...";
    document.getElementById('cardHolder').appendChild(loadingDiv);

    const promises = []
    for (let i = 0; i < numOfFoods; i++) {
        promises.push(FOOD_URL)
    }
    foodArray = await Promise.all(promises.map(async (url) => {
        const response = await fetch(url);
        return response.json();
    }));

    const end = new Date()
    console.log(`with for promise.all: ${end - start}`)

    displayFoodCards()
    loadingDiv.remove();
}

const displayFoodCards = () => {
    const foodGallery = document.getElementById('cardHolder')
    //looks in populated foodarray, appends cards to the foodGallery
    foodArray.forEach(el => {
        const foodDiv = document.createElement("div");
        foodDiv.className = 'foodCard'
        const foodImage = document.createElement("img");
        foodImage.height = 200
        foodImage.width = 200
        foodImage.src = el.meals[0].strMealThumb;
        const foodDescription = document.createElement("p");
        foodDescription.textContent = el.meals[0].strMeal
        foodDiv.appendChild(foodImage);
        foodDiv.appendChild(foodDescription);
        foodGallery.appendChild(foodDiv);
    })
}


//wrap in form so you get the tooltips
// use promise.all
//error handling











