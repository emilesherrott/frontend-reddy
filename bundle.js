(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const fruitForm = document.querySelector("#inputSection form")
fruitForm.addEventListener("submit", extractFruit)

function extractFruit(e) {
    e.preventDefault()
    fetchFruitData(e.target[0].value)
    e.target[0].value = ""
}

function fetchFruitData(fruit){
    fetch(`https://fruity-api.onrender.com/fruits/${fruit}`)
        // .then(processResponse)
        .then(resp => resp.json())
        .then(data => addFruit(data))
        .catch(err => console.log(err))
}

function processResponse(resp) {
    console.log(resp, "hello")
    if(resp.ok){
        return resp.json()
    } else {
        throw "Error: http status code = " + resp.status
    }
}

const fruitList = document.querySelector("#fruitSection ul")
const fruitNutrition = document.querySelector("#nutritionSection p")

let calories = 0

function addFruit(fruit) {
    console.log(fruit)
    if(!fruit){
        console.log("Invalid fruit")
    } else {
    const li = document.createElement("li")
    li.addEventListener("click", removeFruit, {once:true})
    li.textContent = fruit['name']
    fruitList.appendChild(li)

    calories += fruit.nutritions.calories
    fruitNutrition.textContent = calories
    } 
}

function removeFruit(e){
    e.target.remove()
}



},{}]},{},[1]);
