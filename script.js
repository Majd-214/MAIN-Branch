//--GLOBAL VARIABLES---------------------------------------------
let invVar = true;

// LEVEL
let level = 1;
let levelPoints = 1;
let maxXp = 100;


//Mob special attacks / Effects

let burn;
let playerBurn = 0;
let poison;
let playerPoison = 0;
let burnDmg = 5;
//Other globals
let mobIn;
let hpLv = ((level - 1) / 10 + 1)


//CLASSES-------------------------------------------------------
class user {
  constructor(
    //User values
    name, 
    hp, 
    maxHp,
    res,
    //Damage values
    dmg, 
    dmgMul,
    critMul,
    //level related values
    lv, 
    exp, 
    lvPoints,
    maxExp,
    //effects
    ) {
    this.name=name;
    this.hp=hp;
    this.maxHp=maxHp;
    this.res=res;
    this.dmg=dmg;
    this.dmgMul=dmgMul;
    this.critMul=critMul;
    this.lv=lv;
    this.exp=exp;
    this.lvPoints=lvPoints;
    this.maxExp=maxExp;

    this.dead=false;
    
  }
  displayInfo() {
    return 'Name:_' + this.name + '_HP:_' + this.hp +'_DAMAGE:_' + this.dmg +   
    '_LEVEL:_' + this.lv + '_EXP:_' + this.exp + '/' + this.maxExp + '_RES:_' + this.res + '_POISON:_' + playerPoison + '_BURN:_' + playerBurn
    }

  applyBurn() {
    playerBurn = (mobIn.effectStr + playerBurnCounters);
  }
  applyPoison() {
    playerPoison = (mobIn.effectStr + playerPoison); 
  }
  takePoison() {
    if (playerPoison > 0) { 
      player.hp = (player.hp - playerPoison);
      playerPoison--;
    }
  }
  takeBurn() {
    if (playerBurn > 0) {
      player.hp = (player.hp - burnDmg);
    playerBurn--;
    }
  }
  checkHp(){
    if (player.hp <= 0) {
      console.log("YOU LOSE");
    }
  }
  checkExp(){
    let maxExp;
    maxExp = ((player.lv / 10) +1) * player.maxExp;
    
    if (player.exp > player.maxExp) {
      player.exp = (player.exp - player.maxExp);
      player.lv++;
      player.lvPoints++;
      player.maxExp = maxExp; //Check globals for equation
    }
  }
  rest() {
    player.hp = player.maxHp;
  }
  lootGained() {
    mobIn.lootGained = new Array();
    if (!mobIn.dead) {
      for (let x = 0; x < mobIn.loot.length; x++) {
        if ((mobIn.lootChance() < mobIn.loot[x][1]) && (mobIn.loot[x][1] != null)) {
            mobIn.lootGained.push(mobIn.loot[x][0]);
          }
      }
      console.log(mobIn.lootGained);
      this.runInventory();
    }
  }
  runInventory() {
    if (mobIn.lootGained == null) return; 
      mobIn.lootGained.forEach((loot, index) => {
        console.log("index: " + index);
        console.log("loot: " + loot);
        const itembtns =     document.getElementById("itembtns");
    
        const div = document.createElement("div");
        const btn = document.createElement("button");
        const image = document.createElement("img");
    
        // Set up the image
        image.src = "/Icons/InvC";
        image.style.width = "20%";
        image.style.height = "100%";
    
        // Set up the button
        btn.innerHTML = mobIn.lootGained[index];
        btn.className = "btns";
        btn.style.flex = 1;
    
        btn.onclick = function click() {
          console.log(flr + " button clicked!");
          currentFloor = index + 1;
          console.log("Current Floor: " + currentFloor);
          Enter();
        };
  
      // Set up the div
  
      div.className = "divclass";
  
      div.appendChild(image);
      div.appendChild(btn);
  
      flbtns.appendChild(div);
    });
  }
}

class floor {
  constructor(num, mob, npc) {
    this.num=num;
    this.mob=mob;
    this.npc=npc;
  }
  
  getFloor() {
    return currentFloor = _1
  }
}

class mob {
  constructor(name, hp, maxHp, dmg, loot, exp, effect, effectStr, effectC, spDmg) {
    this.name=name;
    this.hp=hp;
    this.maxHp=maxHp;
    this.dmg=dmg;
    this.loot=loot;
    this.exp=exp;
    this.effect=effect;
    this.effectStr=effectStr;
    this.effectC=effectC;
    this.spDmg=spDmg;
    this.dead = false;
    this.lootGained;
  }
  turn() {
  let ai = Math.random() * 100;
  if (ai < 10) {
    player.hp = (player.hp - this.spDmg)
    this.checkEffect();
    console.log("DEBUG: MOB_SPECIAL")
  } else {
    player.hp = (player.hp - this.dmg)
    console.log('DEBUG: MOB_ATTACK')
  }
  console.log('DEBUG POST-DAMAGE', player.displayInfo())
  player.checkHp();
  }
  checkEffect() {
    if (this.effect == 'burn') {
      player.applyBurn();
    } else if (this.effect == 'poison') {
      player.applyPoison();
    }
  }
  checkHp() {
    if (this.hp <= 0) {
 document.getElementById("CFS").style = "display: none";
  document.getElementById("DFSN").style = "display: none";
  document.getElementById("CombatDecision").style = "display: block";
      console.log('YOU WIN!');
      player.exp = (player.exp + this.exp)
      player.checkExp();
      player.lootGained();
      this.dead = true;
      this.reset();
    }
  }
   lootChance() {
    return Math.random() * 100;
  }
  //Check for effect on (status true) weapon
  applyPoison() {
    let mobPoison = (weapon.effect + mobPoison)
  }
  applyBurn() {
    let mobBurn = (weapon.effect + mobBurn) 
  }
  takePoison() {
    
  }
  takeBurn() {
    
  }
  reset() {
    this.hp=this.maxHp;
  }
//   checkDamageDiff() {
//     let mobHpDiff = (mobHpPre - mobHpPost);
// //Targets variables created before damage and after damage in the attck function 
    
//     // let damageDiff = (this.maxHp - this.hp);
//     console.log("Mob Hp Difference:_", mobHpDiff);
//   }
}
class melee {
  constructor(name, dmg, effect, status) {
    this.name=name;
    this.dmg=dmg;
    this.effect=effect;
    this.status=status; 
    //equiped or not (true, false)
  }
}
class armor {
  constructor(name, res, effect, status) {
    this.name=name;
    this.res=res;
    this.effect=effect;
    this.status=status;
  }
}
class skill{
  constructor(name, sCost, mCost, effect, status) {
    this.name=name;
    this.sCost=sCost;
    this.mCost=mCost;
    this.effect=effect;
    this.status=status;
  }
  checkEffect() {
  //   USE THIS FOR CHECK CONDITION
  //   if (this.effect != null)
  }
}
class rune {
  constructor(name, skill, damage, effect, status) {
    this.name=name;
    this.skill=skill;
  }
  
}
//-----------------------------------------------------------------


//melee weapons
const woodClub = new melee('Wood club', 7.5, null, true);

// VSCODE TRIAL Hello there buddi

const rustySpike = new melee('REALLY rusty spike', 5, 'poison', false);

const knife = new melee('Knife', 10, 'none', false);

const longSword = new melee('Long Sword', 20, null, false);

const adminSword = new melee('God sword', 1000, null, false);

const BFS = new melee('Big Friendly Sword', 25, null, false);

const clawClamore = new melee("Claw Clamore", 30, null, false);

const fireSword = new melee('Fire Sword', 20, 'burn', false);

//ARMOR
const leatherArmor = new armor('Leather Armor', 5, null, false);
const chainmail = new armor('Chainmail', 10, null, false);
const darkCoat = new armor('Dark Coat', 30, 'dark', false)


//---------------------------------------------
//MOBS
  //theif
const thief = new mob('Theif', 100 * hpLv, 100 * hpLv, 5, [
  ['knife', 20],
  ['mysterious Ring', 1.75],
  ['Potion of BIG-ENING', 1.75],
], 5, null, null, 10, 10)

  //SLIME
const slime = new mob('Slime', 200 * hpLv, 200 * hpLv, 2.5, [
  ['Slime ball', 75], 
  ['Chainmail', 5],
], 5, 'poison', 2, 10, 5);

  //SKELETON
const skeleton = new mob('Skeleton', 100 * hpLv, 100 * hpLv, 10, [
  ['Bone', 100],
  ['Long Sword', 10]
], 5, null, null, 10, 20);

  //FIRESPIRIT
const fireSpirit = new mob('Fire Spirit', 50 * hpLv, 50 * hpLv, 15, [
  ['Essence', 15],
], 5, 'burn', 2, 25, 5);

  //GOBLIN
const goblin = new mob('Goblin', 75 * hpLv, 75 * hpLv, 10, [
  ['Leather Armor', 10],
  ['goblin ears', 100],
], 10, null, null, 10, 20);

//BOSSES
const skeletonBoss = new mob('Skeleton King', 350 * hpLv, 350 * hpLv, 20, [
  ['Big Friendly Sword', 75],
  ['Cursed bones', 100],
  ['Dark Coat', 25],
], 100, null, null, 10, 35);

const crab = new mob('CRAB?', 1 * hpLv, 10 * hpLv, 1000, [
  ['claw claymore', 1],
  ['expensive food', 1],
]);
//----------------------------------------------
//RUNES

  //skillname, effect, damage, effectStr
const fireRune = new rune('Fire Rune', [
  ['Fire Ball', 'burn', 10, 2, false],
]);

//SKILLS
const execute = new skill('Execute', 20, null, null, false);

//FLOORS
const _1 = new floor('Floor 1', 
[slime, thief], 0);
const _2 = new floor('Floor 2', 
[slime, thief, skeleton],);
const _3 = new floor('Floor 3', 
[skeleton, slime, thief, fireSpirit],);
const _4 = new floor('Floor 4', 
                   ['SAFEZONE'],);
const _5 = new floor('Floor 5', 
                   ["BOSS"], 0);

//player
const player = new user(
  "PLAYER",
  100, //Hp
  100, //maxHp (Value to reset to)
  0, //resistance
  5, //Dmg
  1, //dmgMul
  0.25, //CritMul
  1, //Lv
  0, //Exp
  0, //Lv Points
  100 //Max Xp
);

//------------------------------------------------------------------------
//EQUIPMENT SWITCH STATEMENTS
    //Make more effecient
  //sword
if (woodClub.status) {
  player.dmg = woodClub.dmg;
}
if (longSword.status) {
  player.dmg = longSword.dmg;
}
if (adminSword.status) {
  player.dmg = adminSword.dmg;
}
  //armor
if (leatherArmor.status) {
  player.res = (player.res + leatherArmor.res);
}
//--------------------------------------------------------------------


//mob randomizer
function getMob() {
  
  let currentFloor = _1; //!!!FOR NOW!!!
  
  //randomizes mob-in-battle by possible mobs
  const possibleMob = currentFloor.mob
  let randomMob = Math.floor(Math.random() * possibleMob.length);
  mobIn = possibleMob[randomMob];
  console.log('DEBUG:', mobIn.name);
}

function preAction() {
  player.takePoison(); //poison damage "before" turn
  player.takeBurn(); // burn damage "before" turn
  // let mobHpPre = mobIn.hp; //stores mob hp pre damage
  attack(); 
}
//attack function
function attack() {
  // console.log('DEBUG PRE-DAMAGE:', player.displayInfo())
  
  //calculates damage and crit
  let cc = Math.random() * 100;
  let damage;
  if (cc < 10) { //0-10
    console.log('DEBUG: CRIT_TRUE');
    damage = (player.dmg * player.dmgMul + (player.dmg * player.critMul)); //Dmg + Crit
  } else { // 11-100
    console.log('DEBUG: CRIT_FALSE');
    damage = (player.dmg * player.dmgMul); //Dmg without crit
  }

  mobIn.hp = (mobIn.hp - damage);
  console.log('DEBUG MOB-HP:',mobIn.hp)
  mobIn.checkHp();
  mobIn.mobHpPost = mobIn.hp; //Stores mob hp post damage
  // mobIn.checkDamageDiff();
  if (mobIn.hp > 0) mobIn.turn();
  
}
//creat dungeon floors
a = "Floor ";
const flrs = [a + 1, a + 2, a + 3, a + 4, a + 5];
currentFloor = 0;
function DungeonFlsetup() {
  flrs.forEach((flr, index) => {
    console.log("index: " + index, flr);
    
    const flbtns = document.getElementById("flbtns");

    const div = document.createElement("div");
    const btn = document.createElement("button");
    const image = document.createElement("img");

    // Set up the image
    image.src = "Icons/Floor.png";
    image.style.width = "20%";
    image.style.height = "100%";

    // Set up the button
    btn.innerHTML = flrs[index];
    btn.className = "btns";
    btn.style.flex = 1;

    btn.onclick = function click() {
      console.log(flr + " button clicked!");
      currentFloor = index + 1;
      console.log("Current Floor: " + currentFloor);
      Enter();
    };

    // Set up the div

    div.className = "divclass";

    div.appendChild(image);
    div.appendChild(btn);

    flbtns.appendChild(div);
  });
}
DungeonFlsetup();
function Enter() {
  document.getElementById("Floors").style = "display: none";
  document.getElementById("Enterfl").style = "display: block";
    
    if (currentFloor == 1) {
      document.getElementById("DFT").innerHTML = currentFloor;
    } else if (currentFloor == 2) {
  document.getElementById("DFT").innerHTML = "hello";
  }
}
//Change screen Functions
function Return()  { document.getElementById("CombatDecision").style = "display: none";
document.getElementById("InventorySc").style = "display: none";
document.getElementById("StatsSc").style = "display: none";
  document.getElementById("Starting").style = "display: block"; 
}
function ReturnCD()  { 
  document.getElementById("RS").style = "display: none";
  document.getElementById("DFSN").style = "display: none";
document.getElementById("Enterfl").style = "display: none";
document.getElementById("Floors").style = "display: block";
document.getElementById("CombatDecision").style = "display: block";

}

function Starting() { document.getElementById("Starting").style = "display: block"; 
}

function Combat() { document.getElementById("Starting").style = "display: none"; 
  document.getElementById("CombatDecision").style = "display: block";
}

function updateCombatSideBars() {
  
}

function applySideBars(div, space, left, percentage) {
  if (left) {
    document.getElementById(div).style.paddingLeft = (percentage + "%");
    document.getElementById(space).style.paddingLeft = (parseInt(100 - percentage) + "%");
  } else {
    document.getElementById(div).style.paddingRight = (percentage + "%");
    document.getElementById(space).style.paddingRight = (parseInt(100 - percentage) + "%");
  }
}

function Rest()  { 
document.getElementById('CombatDecision').classList.toggle('fade');
   document.getElementById('CombatDecision').addEventListener('transitionend', () => {
    document.getElementById('CombatDecision').style = "display: none";  
   document.getElementById('RS').style = "display: block"; document.getElementById("RS").classList.toggle('fadein');

  });
}
//call player.rest();
function DungeonF() {
  document.getElementById("Enterfl").style = "display: none";
  document.getElementById("CombatDecision").style = "display: none";
  document.getElementById("DFSN").style = "display: block";
  document.getElementById("Floors").style = "display: block";
  
}

function Fight() { 
document.getElementById("CombatDecision").style = "display: none";
  document.getElementById("DFSN").style = "display: none";
  document.getElementById("CFS").style = "display: block"; 
  
  getMob();
}
function Inventory(state) {
  if (state) {
    invVar = true;
    document.getElementById("Starting").style = "display: none"; 
    document.getElementById("InventorySc").style = "display: block";
  } else {
    invVar = false;
    document.getElementById("CFS").style = "display: none"; 
    document.getElementById("InventorySc").style = "display: block";
  }
  player.runInventory();
}

function invReturn() {
  document.getElementById("InventorySc").style = "display: none";
if (invVar) {
  document.getElementById("Starting").style = "display: block";
} else {
  document.getElementById("CFS").style = "display: block";
}
}
function StatsSc() {
  document.getElementById("Starting").style = "display: none";
  document.getElementById("StatsSc").style = "display: block";
}