let mostrAtak;
let heroAtak;
console.log('Добро пожаловать в игру!!!\nСначало давай установим сложность игры выбрав начальное здаровье твоего персонажа!!');

const readlineSync = require('readline-sync');
let heroHealth = readlineSync.question();

//Функция генерации рандомного числа включая макс и мин значения диапозона
function getRandomInRange(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Объект монстра
const monster = {
	maxHealth: 10,
	name: "Лютый",
	moves: [
		{
			"name": "Удар когтистой лапой",
			"physicalDmg": 3, // физический урон
			"magicDmg": 0,    // магический урон
			"physicArmorPercents": 20, // физическая броня
			"magicArmorPercents": 20,  // магическая броня
			"cooldown": 0     // ходов на восстановление
		},
		{
			"name": "Огненное дыхание",
			"physicalDmg": 0,
			"magicDmg": 4,
			"physicArmorPercents": 0,
			"magicArmorPercents": 0,
			"cooldown": 3
		},
		{
			"name": "Удар хвостом",
			"physicalDmg": 2,
			"magicDmg": 0,
			"physicArmorPercents": 50,
			"magicArmorPercents": 0,
			"cooldown": 2
		},
	]
}
//Боевой маг Евстафий
const MAG = {
	maxHealth: heroHealth,
	name: "Евстафий",
	moves: [
		{
			"name": "Удар боевым кадилом",
			"physicalDmg": 2,
			"magicDmg": 0,
			"physicArmorPercents": 0,
			"magicArmorPercents": 50,
			"cooldown": 0
		},
		{
			"name": "Вертушка левой пяткой",
			"physicalDmg": 4,
			"magicDmg": 0,
			"physicArmorPercents": 0,
			"magicArmorPercents": 0,
			"cooldown": 4
		},
		{
			"name": "Каноничный фаербол",
			"physicalDmg": 0,
			"magicDmg": 5,
			"physicArmorPercents": 0,
			"magicArmorPercents": 0,
			"cooldown": 3
		},
		{
			"name": "Магический блок",
			"physicalDmg": 0,
			"magicDmg": 0,
			"physicArmorPercents": 100,
			"magicArmorPercents": 100,
			"cooldown": 4
		},
	]
}
console.log('Игра началась!!!');
//переменные для подсчета ходов востановления
let cooldownOne = MAG.moves[0].cooldown;//это переменная чисто символическая т к у первой атаки cooldown=0
let cooldownTwo = MAG.moves[1].cooldown;
let cooldownThree = MAG.moves[2].cooldown;
let cooldownFour = MAG.moves[3].cooldown;
let MonstRcooldownTwo = monster.moves[1].cooldown;
let MonstRcooldownThree = monster.moves[2].cooldown;
//Доступные варианты атак героя
function openAtak() {

	if ((cooldownOne - MAG.moves[0].cooldown) == 0) {
		console.log('1-' + MAG.moves[0].name);
	}
	if ((cooldownTwo - MAG.moves[1].cooldown) == 0) {
		console.log('2-' + MAG.moves[1].name);
	}
	if ((cooldownThree - MAG.moves[2].cooldown) == 0) {
		console.log('3-' + MAG.moves[2].name);
	}
	if ((cooldownFour - MAG.moves[3].cooldown) == 0) {
		console.log('4-' + MAG.moves[3].name);
	}
}
function battle() {
	if ((monster.moves[mostrAtak].magicArmorPercents - MAG.moves[heroAtak - 1].magicDmg) < 0) {
		monster.maxHealth = monster.maxHealth - MAG.moves[heroAtak - 1].magicDmg;
	}
	if ((monster.moves[mostrAtak].physicArmorPercents - MAG.moves[heroAtak - 1].physicalDmg) < 0) {
		monster.maxHealth = monster.maxHealth - MAG.moves[heroAtak - 1].physicalDmg;
	}
	if ((MAG.moves[heroAtak - 1].magicArmorPercents - monster.moves[mostrAtak].magicDmg) < 0) {
		MAG.maxHealth = MAG.maxHealth - monster.moves[mostrAtak].magicDmg;
	}
	if ((MAG.moves[heroAtak - 1].physicArmorPercents - monster.moves[mostrAtak].physicalDmg) < 0) {
		MAG.maxHealth = MAG.maxHealth - monster.moves[mostrAtak].physicalDmg;
	}
}
//Генерация удара монстра
function genAtakMonstra() {
	let numberTwo = false;
	let numberThree = false;
	//mostrAtak = getRandomInRange(0, 2);
	if ((MonstRcooldownTwo - monster.moves[1].cooldown) == 0) {
		numberTwo = true;
	}
	if ((MonstRcooldownThree - monster.moves[2].cooldown) == 0) {
		numberThree = true;
	}
	mostrAtak = getRandomInRange(0, 2);
	if (mostrAtak == 1 && numberTwo == false) { mostrAtak = 1; }
	if (mostrAtak == 2 && numberThree == false) { mostrAtak = 1; }
	switch (mostrAtak) {
		case '0':
			if (MonstRcooldownTwo != 3) { MonstRcooldownTwo++; }
			if (MonstRcooldownThree != 2) { MonstRcooldownThree++; }
			break;
		case '1':
			MonstRcooldownTwo = 0;
			if (MonstRcooldownThree != 2) { MonstRcooldownThree++; }
			break;
		case '2':
			MonstRcooldownThree = 0;
			if (MonstRcooldownTwo != 3) { MonstRcooldownTwo++; }
			break;
	}
}
let i = 1;
while (true) {
	console.log('Раунд ' + i); i++;
	//mostrAtak = getRandomInRange(0, 2);
	genAtakMonstra();
	console.log('Монстр атакует!!! ' + monster.moves[mostrAtak].name);
	console.log('Выбери один из возмолжный действий, вводя соответствующую цифру');
	openAtak();
	heroAtak = readlineSync.question();

	console.log(heroAtak + '-' + MAG.moves[heroAtak - 1].name);

	switch (heroAtak) {
		case '1':
			if (cooldownTwo != 4) { cooldownTwo++; }
			if (cooldownThree != 3) { cooldownThree++; }
			if (cooldownFour != 4) { cooldownFour++; }
			break;
		case '2':
			cooldownTwo = 0;
			if (cooldownThree != 3) { cooldownThree++; }
			if (cooldownFour != 4) { cooldownFour++; }
			break;
		case '3':
			cooldownThree = 0;
			if (cooldownTwo != 4) { cooldownTwo++; }
			if (cooldownFour != 4) { cooldownFour++; }
			break;
		case '4':
			cooldownFour = 0;
			if (cooldownTwo != 4) { cooldownTwo++; }
			if (cooldownThree != 3) { cooldownThree++; }
			break;
		default:
			console.log("Нет таких действий");
	}
	//console.log(cooldownOne, cooldownTwo, cooldownThree, cooldownFour);
	battle();
	console.log('Здоровье монстра ' + monster.maxHealth);
	console.log('Здоровье мага Евстафия ' + MAG.maxHealth);
	if (monster.maxHealth <= 0) { console.log('Монстр побежден!!! УРА!!!'); break; }
	if (MAG.maxHealth <= 0) { console.log('Ты проиграл, лузер!!'); break; }

}

