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
let hpLv = ((level - 1) / 10 + 1);
let loot;
//Skill notes: Strength, Dexterity, Constitution, Wisdom, Intelligence, Luck


//CLASSES-------------------------------------------------------
class user {
  constructor(
    //User values
    name, 
    hp, 
    maxHp,
    stamina,
    maxStamina,
    mp,
    maxMp,
    res,
    //Damage values
    dmg, 
    dmgMul,
    critMul,
    critC,
    //level related values
    lv, 
    exp, 
    lvPoints,
    maxExp,
    equiped,
    loot
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
    this.loot=new Array(loot);
    this.equiped=new Array(equiped)
    this.dead=false;
    
  }
  
  displayInfo() {
    return 'Name:_' + this.name + '_HP:_' + this.hp +'_DAMAGE:_' + this.dmg +   
    '_LEVEL:_' + this.lv + '_EXP:_' + this.exp + '/' + this.maxExp + '_RES:_' + this.res + '_POISON:_' + playerPoison + '_BURN:_' + playerBurn
    }

  //element logic----------------------------
  applyBurn() {
    playerBurn = (mobIn.effectStr + playerBurn);
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
  //---------------------------------------
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

  collectLoot() {
    mobIn.lootGained.forEach((label, index) => {
      if (mobIn.lootGained[index] != null && mobIn.lootGained[index] != undefined) {
        this.loot.push(mobIn.lootGained[index]);
      }
    });
  }

  runInventory() { //inventory elements
    const div = document.getElementById("InventoryPage");
      this.loot.forEach((lootIn, index) => {
      if (this.loot[index] === undefined) return; 
        console.log("index: " + index);
        console.log("loot: " + lootIn);
        
        const id = this.loot[index];
        const element = document.getElementById(id);
        const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
        const instances = countOccurrences(this.loot, id);
        if (element != null) {
          element.innerHTML = element.innerHTML.replace(element.innerHTML.slice(-1), instances);
          return;
        }
        const itembtns = document.getElementById("itembtns");
        const btn = document.createElement("button");
        // const image = document.createElement("img");

        btn.className = "btns";
        // image.className = "images";

        btn.id = id;
        
        // Set up the image
        // image.src = "/Icons/InvC.png";
        // image.style.width = "20%";
        // image.style.height = "100%";
    
        // Set up the button
        btn.innerHTML = id + " x" + instances;
        btn.className = "btns";
        btn.style.flex = 1;
    
        btn.onclick = function click() {
          console.log(id + " button clicked!");
          currentFloor = index + 1;
          console.log("Current Floor: " + currentFloor);
          Enter();
        };
  
      // Set up the div
      // div.appendChild(image);
      div.appendChild(btn);
      // flbtns.appendChild(div);
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
  constructor(
name,
hp,
maxHp,
dmg,
loot,
exp,
effect,
effectStr,
effectC,
spDmg,
poison,
burn) {
    this.name=name;
    this.hp=hp;
    this.maxHp=maxHp;
    this.dmg=dmg;
    this.loot=loot;
    this.exp=exp;
    this.effect=effect; //Element applied on special attack
    this.effectStr=effectStr; //Amount of counters for effect
    this.effectC=effectC; //Chance to apply
    this.spDmg=spDmg; //Damage from special attack
    this.poison=poison; //Keeping track of poison counters on mob In
    this.burn=burn; //Keeping track of burn counters on mob In
    this.dead = false;
    this.lootGained;
  }

  displayStats() {
    console.log(
  
    )
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
    console.log('DEBUG POST-DAMAGE', player.displayInfo());
    updateBars();
    player.checkHp();
    preTurn();
  }
  
  dropLoot() {
    this.lootGained = new Array();
    if (!this.dead) {
      for (let x = 0; x < this.loot.length; x++) {
        if ((this.lootChance() < this.loot[x][1]) && (this.loot[x][1] != null)) {
            this.lootGained.push(this.loot[x][0]);
          }
      }
      console.log(this.lootGained);
      player.runInventory();
    }
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
      this.dropLoot();
      player.collectLoot();
      mobIn.dead = true;
      Report.reset();
      Report.setValues();
      Report.update();
      this.reset();
    }
  }
  
  lootChance() {
    return Math.random() * 100;
  }
  
  // Check for effect on (status true) weapon
  checkWeapon() {
    if (player.equipped[0].effect = 'burn') applyBurn(); 
    if (player.equipped[0].effect =   'poison') applyPoison();
  }
  applyPoison() {
    // let mobPoison = (player.equipped[0].effectStr + mobPoison)
  }
  
  applyBurn() {
    // let mobBurn = (weapon.effectStr + mobBurn) 
  }
  
  takePoison() {
    if (this.poison > 0) { 
      this.hp = (this.hp - this.poison);
      this.poison--;
    }
  }
  takeBurn() {
    if (this.burn > 0) {
      this.hp = (this.hp - burnDmg);
      this.burn--;
    }
  }
  reset() {
    this.hp=this.maxHp;
    this.dead=false;
    this.lootGained = null;
    console.log('--DEBUG RESET!!!--')
  }
//   checkDamageDiff() {
//     let mobHpDiff = (mobHpPre - mobHpPost);
// //Targets variables created before damage and after damage in the attck function 
    
//     // let damageDiff = (this.maxHp - this.hp);
//     console.log("Mob Hp Difference:_", mobHpDiff);
//   }
}
class melee {
  constructor(name, dmg, effect, effectStr, status ) {
    this.name=name;
    this.dmg=dmg;
    this.effect=effect;
    this.effectStr=effectStr;
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
  constructor(name, sCost, mCost, damage, effect, status) {
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
const woodClub = new melee('Wood club', 7.5, null, null, false);

const rustySpike = new melee('Really rusty spike', 5, 'poison', 5, false);

const knife = new melee('Knife', 10, null, null, false);

const longSword = new melee('Long Sword', 20, null, null, true);

const adminSword = new melee('God sword', 1000, null, null, true);

const BFS = new melee('Big Friendly Sword', 25, null, null, false);

const clawClamore = new melee("Claw Claymore", 30, null, null, false);

const fireSword = new melee('Fire Sword', 20, 'burn', 5, false);

//ARMOR
const leatherArmor = new armor('Leather Armor', 5, null, false);
const chainmail = new armor('Chainmail', 10, null, false);
const darkCoat = new armor('Dark Coat', 30, 'dark', false)
//---------------------------------------------
//MOBS
  //theif
const thief = new mob('Theif', 100 * hpLv, 100 * hpLv, 5, [
  ['Knife', 100],
  ['Mysterious Ring', 100],
  ['Potion of BIG-ENING', 100],
], 5, null, null, 10, 100)

  //SLIME
const slime = new mob('Slime', 200 * hpLv, 200 * hpLv, 2.5, [
  ['Slime ball', 100], 
  ['Chainmail', 100],
], 5, 'poison', 2, 10, 5);

  //SKELETON
const skeleton = new mob('Skeleton', 100 * hpLv, 100 * hpLv, 10, [
  ['Bone', 100],
  ['Long Sword', 100]
], 5, null, null, 10, 20);

  //FIRESPIRIT
const fireSpirit = new mob('Fire Spirit', 50 * hpLv, 50 * hpLv, 15, [
  ['Essence', 100],
], 5, 'burn', 2, 25, 5);

  //GOBLIN
const goblin = new mob('Goblin', 75 * hpLv, 75 * hpLv, 10, [
  ['Leather Armor', 100],
  ['Goblin Ears', 100],
], 10, null, null, 10, 20);

//BOSSES
const skeletonBoss = new mob('Skeleton King', 350 * hpLv, 350 * hpLv, 20, [
  ['Big Friendly Sword', 100],
  ['Cursed bones', 100],
  ['Dark Coat', 100],
], 100, null, null, 10, 35);

const crab = new mob('CRAB?', 1 * hpLv, 10 * hpLv, 1000, [
  ['Claw Claymore',100],
  ['Expensive Food', 100],
]);
//----------------------------------------------
//RUNES

  //skillname, effect, damage, effectStr
const fireRune = new rune('Fire Rune', [
  ['Fire Ball', 'burn', 10, 2, false],
]);

//SKILLS
const execute = new skill('Execute', 20, null, 'effect', false);

//Skill logic
function executeEffect() {
  let executeC = Math.random() * 100;
  if (mobIn.hp < (mobIn.maxHp * 0.2)) {
    if (executeC < 25) {
      skill.execute.dmg=mobIn.hp
    }
  }
}

//FLOORS
const _1 = new floor('Floor 1', 
[slime, thief], 0);
const _2 = new floor('Floor 2', 
[slime, thief, skeleton],);
const _3 = new floor('Floor 3', 
[skeleton, slime, thief, fireSpirit],);
const _4 = new floor('Floor 4', 
                   [null],);
const _5 = new floor('Floor 5', 
[skeletonBoss], 0);

//player
const player = new user(
  "PLAYER",
  100, //Hp
  100, //maxHp (Value to reset to)
  100,//stamina
  100,//max stamina
  100,//mp
  100,//max mp
  0, //resistance
  5, //Dmg
  1, //dmgMul
  0.25, //CritMul
  10, //Crit Chance (critC)
  1, //Lv
  0, //Exp
  0, //Lv Points
  100, //Max Xp
  new Array(),
);

//------------------------------------------------------------------------
//EQUIPMENT SWITCH STATEMENTS
    //Make more effecient
  //sword
if (woodClub.status) {
  player.dmg = woodClub.dmg;
}
if (rustySpike.status) {
  player.dmg = woodClub.dmg;
}
if (knife.status) {
  player.dmg = knife.dmg;
}
if (longSword.status) {
  player.dmg = longSword.dmg;
}
if (adminSword.status) {
  player.dmg = adminSword.dmg;
}
if (BFS.status) {
  player.dmg = knife.dmg;
}
if (clawClamore.staus) {
  player.dmg = clawClamore.dmg;
}
if (fireSword.status) {
  player.dmg = fireSword.dmg;
}
  //armor
if (leatherArmor.status) {
  player.res = (player.res + leatherArmor.res);
} 
if (chainmail.status) {
  player.res = (player.res + chainmail.res);
}
if (darkCoat.status) {
  player.res = (player.res + darkCoat.res);
}
//--------------------------------------------------------------------


//mob randomizer
function getMob() {
  currentFloor = _3
 //!!!FOR NOW!!!
  
  //randomizes mob-in-battle by possible mobs
  const possibleMob = currentFloor.mob
  let randomMob = Math.floor(Math.random() * possibleMob.length);
  mobIn = possibleMob[randomMob];
  console.log('DEBUG:', mobIn.name);
}

function preTurn() {
  mobIn.takePoison();
  mobIn.takeBurn();
  player.takePoison(); //poison damage "before" turn
  player.takeBurn(); // burn damage "before" turn
  // let mobHpPre = mobIn.hp; //stores mob hp pre damage
}
//attack function
function basicAttack() {
  // console.log('DEBUG PRE-DAMAGE:', player.displayInfo())
  
  //calculates damage and crit
  let cc = Math.random() * 100;
  let damage;
  if (cc < player.critC) { //0-10
    console.log('DEBUG: CRIT_TRUE');
    damage = (player.dmg * player.dmgMul + (player.dmg * player.critMul)); //Dmg + Crit
  } else { // 11-100
    console.log('DEBUG: CRIT_FALSE');
    damage = (player.dmg * player.dmgMul); //Dmg without crit
  }

  mobIn.hp = Math.max((mobIn.hp - damage), 0);
  console.log('DEBUG MOB-HP:',mobIn.hp)
  mobIn.applyPoison();
  mobIn.applyBurn();
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

function endTurn() {
  
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

function Rest()  { 
document.getElementById('CombatDecision').classList.toggle('fade');
document.getElementById('CombatDecision').addEventListener('transitionend', () => {
document.getElementById('CombatDecision').style = "display: none";  
document.getElementById('RS').style = "display: block"; document.getElementById("RS").classList.toggle('fadein'); 
});
  setTimeout(function(){
    RS.onclick = function Restend() {
    document.getElementById('RS').style = "display:   none";
    document.getElementById('CombatDecision').style = "display: block";
    document.getElementById('CombatDecision').classList.toggle('fade');
  
    player.hp = player.maxHp;
    player.stamina = player.maxStamina;
    player.mp = player.maxMp
    updateBars();
    };
}, 2000);
};
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
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
document.getElementById("Attackbtns").style = "display: none";
document.getElementById("Magicbtns").style = "display: none";
document.getElementById("Skillbtns").style = "display: none";

function Backpg() {
  document.getElementById("Attackbtns").style = "display: none";
  document.getElementById("CFbtns").style = "display: bloack";
}
function Backpg1() {
  document.getElementById("Magicbtns").style = "display: none";
    document.getElementById("Skillbtns").style = "display: none";
  document.getElementById("Attackbtns").style = "display: bloack";
}

function Attackpg() {
  document.getElementById("CFbtns").style = "display: none";
document.getElementById("Attackbtns").style = "display: flex";
}
function Magicpg() {
  document.getElementById("Attackbtns").style = "display: none";
document.getElementById("Magicbtns").style = "display: flex";
}
function Skillpg() {
  document.getElementById("Attackbtns").style = "display: none";
document.getElementById("Skillbtns").style = "display: flex";
}

function updateBars() {
  
if (player.stamina < player.maxStamina) {
    player.stamina =+ (player.maxStamina *0.05);
  } 
  if (player.stamina > player.maxStamina) {
      player.stamina = player.maxStamina
}
  if (player.mp < player.maxMp) {
    player.mp =+ (player.maxMp *0.05);
  } 
  if (player.mp > player.maxMp) {
      player.mp = player.maxMp
}
  document.getElementById("HP").style.paddingLeft = parseInt((player.hp / player.maxHp) * 100) + "%";
document.getElementById("EmptyHP").style.paddingLeft = (100 - parseInt(document.getElementById("HP").style.paddingLeft)) + "%";
  document.getElementById("EXP").style.paddingLeft = parseInt((player.exp / player.maxExp) * 100) + "%";
document.getElementById("EmptyEXP").style.paddingLeft = (100 - parseInt(document.getElementById("EXP").style.paddingLeft)) + "%";
  document.getElementById("MP").style.paddingRight = parseInt((player.mp / player.maxMp) * 100) + "%";;
document.getElementById("EmptyMP").style.paddingRight = (100 - parseInt(document.getElementById("MP").style.paddingRight)) + "%"; document.getElementById("Stamina").style.paddingRight = parseInt((player.stamina / player.maxStamina) * 100) + "%";;
document.getElementById("EmptyStamina").style.paddingRight = (100 - parseInt(document.getElementById("Stamina").style.paddingRight)) + "%";
  document.getElementById("EHP").style.paddingLeft = parseInt((mobIn.hp / mobIn.maxHp) * 100) + "%";
document.getElementById("EmptyEHP").style.paddingLeft = (100 - parseInt(document.getElementById("EHP").style.paddingLeft)) + "%";
};

class Report {

  static reset() {
    this.exp = 0;
    this.loot = 0;
    this.coins = 0;
  }

  static setValues() {
    this.exp = mobIn.exp;
    this.loot = player.loot;
    this.coins = 0;
  }
  
  static update() {
    document.getElementById("comRep").innerHTML = mobIn.dead ? "BATTLE WON" : "BATTLE LOST";
  document.getElementById("comRep1").innerHTML = "EXP GAINED : " + this.exp;
  document.getElementById("comRep2").innerHTML = "COINS GAINED : " + this.coins;
  document.getElementById("comRep3").innerHTML = "LOOT OBTAINED : " + this.loot;
  }
}
