const fruitForm = document.querySelector("#inputSection form")
fruitForm.addEventListener("submit", extractFruit)

function extractFruit(e) {
    e.preventDefault()
    fetchFruitData(e.target[0].value)
    e.target[0].value = ""
}

function fetchFruitData(fruit){
    fetch(`https://fruity-api.onrender.com/fruits/${fruit}`)
        .then(processResponse)
        .then(data => addFruit(data))
        .catch(err => console.log(err))
}

function processResponse(resp) {
    if(resp.ok){
        return resp.json()
    } else {
        throw "Error: http status code = " + resp.status
    }
}

const fruitList = document.querySelector("#fruitSection ul")
const fruitNutrition = document.querySelector("#nutritionSection p")

let calories = 0
const fruitCal = {}

function addFruit(fruit) {
    if(!fruit){
        console.log("Invalid fruit")
    } else {
    const li = document.createElement("li")
    li.addEventListener("click", removeFruit, {once:true})
    li.textContent = fruit['name']
    fruitList.appendChild(li)

    fruitCal[fruit.name] = fruit.nutritions.calories

    calories += fruit.nutritions.calories
    fruitNutrition.textContent = calories
    } 
}

function removeFruit(e){
    const fruitName = e.target.textContent
    calories -= fruitCal[fruitName]
    fruitNutrition.textContent = calories

    delete fruitCal[fruitName]


    e.target.remove()
}


