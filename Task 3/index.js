//Функция генерации рандомного числа включая макс и мин значения диапозона
function getRandomInRange(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
let length = getRandomInRange(3, 6);//длина загаданного числа
let live = 3;// Количество попыток
let mass = []; //массив числа
let number = '';
//Генерация числа
for (let i = 0; i < length; i++) {
	let newNumber = getRandomInRange(1, 9);
	mass.push(newNumber);
	number += newNumber;
}
// console.log(mass);
console.log('Привет я загадал число состоящее из ' + length + ' различающихся цифр.\nПопробуй отгодать...\n У тебя 3 попытки');

for (let i = 0; i < live; i++) {
	let prov = proverka(mass);
	if (prov) { console.log('Поздравляю ты ПОБЕДИЛ!!!'); break; }
	else if (i < live - 1) { console.log('Попробуй еще раз'); }
	else { console.log('ПОТРАЧЕНО\nЗагаданное число -' + number); break; }
}
//Функция для проверки массива
function proverka(Mass) {
	const readlineSync = require('readline-sync');
	const userNumber = readlineSync.question();
	//console.log(userNumber);
	let usermass = String(userNumber).split('');

	//Условие для неправильного ввода
	if (usermass.length != length) {
		console.log('Ошибка! Количество чисел не совподает!!!');
		return false;
	}
	else {
		let numberPlace = 0; //переменная для кол цифр на своих местах
		let numberNotPlace = 0;//переменная для кол совпавших цифр не на своих местах
		//Сравнение массивов
		for (let i = 0; i < length; i++) {
			for (let j = 0; j < length; j++) {
				if (i == j && Mass[i] == usermass[j]) { numberPlace++; }
				if (i != j && Mass[i] == usermass[j]) { numberNotPlace++; }
			}
		}
		console.log('цифр на своих местах -' + numberPlace);
		console.log('совпавших цифр не на своих местах - ' + numberNotPlace);
		if (numberPlace == length) { return true; }
		else { return false; }
	}


}