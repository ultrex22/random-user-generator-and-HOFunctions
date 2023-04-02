const main = document.getElementById('main')
const addUserBtn = document.getElementById('add-user')
const doubleBtn = document.getElementById('double')
const showMillionairesBtn = document.getElementById('show-millionaires')
const sortBtn = document.getElementById('sort')
const calculateWealthBtn = document.getElementById('calculate-wealth')

//initialize an empty array
// @ts-ignore
let data: { money: number; name: string }[] = []

//fetch random user and add money
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api')
    const data = await res.json()

    const user = data["results"][0]['name']
    const newUser = {
        name: `${user["first"]} ${user["last"]}`,
        money: Math.floor(Math.random() * 1000000)
    }
    addData(newUser);
}

//add new obj to data arr
function addData(newUser: { name: string; money: number }) {
    data.push(newUser)

    updateDOM()
}

// update DOM
function updateDOM(providedData = data) {
    //clear the main div, '!' is for TS to ignore that the main may be NULL
    main!.innerHTML = '<main id="main"><h2><strong>Person</strong> Wealth</h2></main>'

    providedData.forEach(item => {
        const element = document.createElement('div')
        element.classList.add('person')
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`
        main!.appendChild(element)
    })
}

//format number as currency
function formatMoney(number: number) {
    return '$' + number
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, `$&,`)
}

function doubleMoney() {
    data = data.map(
        user => {
            return {...user, money: (user.money * 2)}
        }
    )
    updateDOM()
}

//sorts users by richest
function sortByRichest() {
    data.sort((a,
               b) => {
        // console.log(`${b.name} ${a.name} ${b.money - a.money}`)
        return b.money - a.money
    })
    updateDOM()
}

//Filter by millionaires
function showMillionaires() {
    data = data.filter(
        user => user.money > 1000000
    )
    updateDOM()
}

// Calculate total wealth
function calculateWealth() {
    //my solution
    const total = data.reduce((acc,
                               next) => {
        return {name: 'Total', money: (acc.money + next.money)}
    })
    // data.push(total)
    // updateDOM()

    const wealthEl = document.createElement('div')
    wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(total.money)}</strong>`
    main!.appendChild(wealthEl)
}

//void is to remove the warning that the returned promise is not used
void getRandomUser()
void getRandomUser()
void getRandomUser()

console.log(data)

//event listeners
addUserBtn!.addEventListener('click', getRandomUser)
doubleBtn!.addEventListener('click', doubleMoney)
sortBtn!.addEventListener('click', sortByRichest)
showMillionairesBtn!.addEventListener('click', showMillionaires)
calculateWealthBtn!.addEventListener('click', calculateWealth)