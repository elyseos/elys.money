let startDate = new Date('22 Aug 2021')
let now = Date.now()
let daysPassed = parseInt((now - startDate.getTime())/(24*3600*1000))

const _seed = 1736266
const _team =  700000
const _foundation = 10000000
const _land = 10000000

let getLocked = (orig,days) => orig-(orig/days)*daysPassed

let seedLocked = getLocked(_seed,20)  //20 days
let teamLocked = getLocked(_team,100)  //100 days
let foundationLocked = getLocked(_foundation,100)  //100 days

let land = (daysPassed<365)?_land:0 //365 days

console.log('--------------------------------------------------')
console.log("Seed:")
console.log("Initial lock: " + _seed)
console.log("Locked after " + daysPassed + " days: " + seedLocked)
console.log("Unlocked: " + (_seed-seedLocked))
console.log('--------------------------------------------------')
console.log("Team:")
console.log("Initial lock: " + _team)
console.log("Locked after " + daysPassed + " days: " + teamLocked)
console.log("Unlocked: " + (_team-teamLocked))
console.log('--------------------------------------------------')
console.log("Foundation:")
console.log("Initial lock: " + _foundation)
console.log("Locked after " + daysPassed + " days: " + foundationLocked)
console.log("Unlocked: " + (_foundation-foundationLocked))
console.log('--------------------------------------------------')
console.log("'Land':")
console.log("Initial lock: " + _land)
console.log("Locked after " + daysPassed + " days: " + land)
console.log("Unlocked: " + (_land-land))
console.log('--------------------------------------------------')
console.log("Total:")
console.log("Initial locked: " + (_seed + _team + _foundation + _land))
console.log('Unlocked: ' + parseInt(seedLocked + teamLocked + foundationLocked + land))
