///Game of clue version The office

//Variables of games

let containerCharacters;

let selectUser = 0;

const suspectsArray = [
	{ id: 0, nombre: "Michael Scott", name_image: "michael" },
	{ id: 1, nombre: "Jim Halpert", name_image: "jim" },
	{ id: 2, nombre: "Dwight Schrute", name_image: "dwight" },
	{ id: 3, nombre: "Pam Beesly", name_image: "pam" },
	{ id: 4, nombre: "Ryan Howard", name_image: "ryan" },
	{ id: 5, nombre: "Oscar Martinez", name_image: "oscar" },
	{ id: 6, nombre: "Angela Martin", name_image: "angela" },
	{ id: 7, nombre: "Andy Bernard", name_image: "andy" },
	{ id: 8, nombre: "Kevin Malone", name_image: "kevin" },
];

const roomsArray = ["Cocina", "Oficina", "Zona de Estacionamiento", "Bodega"];

const weaponsArray = [
	{ id: 0, nombre: "Olla", name_image: "olla" },
	{ id: 1, nombre: "Sai", name_image: "sai" },
	{ id: 2, nombre: "Pistola", name_image: "pistola" },
	{ id: 3, nombre: "Soplete", name_image: "soplete" },
	{ id: 4, nombre: "Engrapadora en gelatina", name_image: "engrapadora" },
];

//Function generate number random depending of size of array
let doRandom = (arrSearch) => {
	let x = Math.round(Math.random() * (arrSearch.length - 1));

	return x;
};

//Generate array without person die because he dont cant be the murder
let listWithoutMurder = (nameDiedPerson) => {
	newList = suspectsArray.filter((item) => item.nombre !== nameDiedPerson);
	return newList;
};

//Generate array only with assasin and person died

let genereAssesinMurder = () => {
	let arrayAssesinDied = [],
		numDiedPerson = parseInt(doRandom(suspectsArray)),
		listNew = listWithoutMurder(suspectsArray[numDiedPerson].nombre);
	arrayAssesinDied[1] = suspectsArray[numDiedPerson].id;
	arrayAssesinDied[0] = listNew;

	return arrayAssesinDied;
};

let oportunities = [false, false, false];

//Generate prompr for inputs values and validate if the user win or lose

let menu = (asseMurder) => {
	let coins = 0;

	let arrWitMurd = asseMurder[0];
	let copyArrWitMurd = asseMurder[0];

	for (element in arrWitMurd) {
		console.log(
			`original "${arrWitMurd[element].id}  ${arrWitMurd[element].nombre}`
		);
	}
	let numAssesin = parseInt(doRandom(arrWitMurd));

	let numWeapon = parseInt(doRandom(weaponsArray));
	let numRoom = parseInt(doRandom(roomsArray));
	let gameWin = 0;

	//Me ayuda a encontrar el misterio y ganar
	// alert(`numAssesin ${numAssesin}`);
	// alert(`numWeapon ${numWeapon}`);
	// alert(`numnumRoomWeapon ${numRoom}`);

	do {
		// alert(`oportunities ${oportunities}`);
		// alert(`coins ${coins}`);

		let selectUser = parseInt(
			prompt(
				`"Bienvenido a Clue version the Office mataron a: "
				${
					asseMurder[1]
				} "es tu deber adivinar en 5 oportunidades, quién lo mato, con que lo mató y donde lo mató\n\n "${
					oportunities[0] == true
						? "Asesino adivinado \n"
						: "1.-Adivinar el nombre del asesino\n"
				} ${
					oportunities[1] == true ? "Arma adivinada\n" : "2. Adivinar Arma\n"
				}	${
					oportunities[2] == true
						? "Habitación adivinada"
						: " 3. Adivinar Habitación\n"
				}  `
			)
		);

		for (i = 0; i < 3; i++) {
			if (oportunities[i] === true) {
				gameWin++;
			}
		}

		switch (selectUser) {
			case 1:
				let instructions = "",
					optiAssesin = 0;
				counter = 0;

				console.log("numero asesino", asseMurder[0]);

				do {
					instructions = generateInstru(arrWitMurd);

					optiAssesin = parseInt(prompt(`${instructions}`));
					coins++;
					gene;
					console.log("numAssesin", numAssesin);
					console.log("optiAssesin", optiAssesin);

					if (copyArrWitMurd[numAssesin].id !== optiAssesin) {
						for (element in arrWitMurd) {
							console.log(
								`antes cut "${arrWitMurd[element].id}  ${arrWitMurd[element].nombre}`
							);
						}

						matchSuspects([arrWitMurd[element].id]);

						arrWitMurd = arrWitMurd.filter((item) => item.id !== optiAssesin);

						for (element in arrWitMurd) {
							console.log(
								`despues cut "${arrWitMurd[element].id}  ${arrWitMurd[element].nombre}`
							);
						}

						paintingCharacters(arrWitMurd);
						console.log("entro a borrar arrWitMurd", arrWitMurd);
					}

					// alert(`coins=${coins}`);
				} while (numAssesin !== optiAssesin && coins < 7);

				if (optiAssesin === numAssesin) {
					alert(`Correcto fue ${copyArrWitMurd[optiAssesin].nombre}`);

					// matchSuspects([numAssesin]);
					selectUser = 0;
					oportunities[0] = true;
				} else if (coins === 5) {
					alert(`Perdiste fue ${arrWitMurd[numAssesin].nombre}`);
					selectUser = "s";
				}

				break;

			case 2:
				const TXT2 = "Adivina el arma del asesino";
				let instructions2 = "",
					optiWeapons = 0;
				counter2 = 0;

				for (element in weaponsArray) {
					instructions2 =
						instructions2 + `${counter2}.- ${weaponsArray[element]}\n`;
					counter2++;
				}

				instructions2 + TXT2;

				do {
					optiWeapons = parseInt(prompt(`${instructions2}`));
					coins++;
				} while (numWeapon !== optiWeapons && coins < 7);

				if (numWeapon === optiWeapons) {
					alert(`Ganaste el arma usada fue ${weaponsArray[numWeapon]}`);
					selectUser = "s";
					oportunities[1] = true;
				} else if (coins === 7) {
					alert(`Perdiste el arma usada era ${weaponsArray[numWeapon]}`);
					selectUser = "s";
				}

				break;

			case 3:
				const TXT3 = "Adivina donde fue el asesinato";
				let instructions3 = "",
					optiPlace = 0;
				counter3 = 0;

				for (element in roomsArray) {
					instructions3 =
						instructions3 + `${counter3}.- ${roomsArray[element]}\n`;
					counter3++;
				}

				instructions3 + TXT3;

				do {
					optiPlace = parseInt(prompt(`${instructions3}`));

					coins++;
				} while (numRoom !== optiPlace && coins < 7);

				if (numRoom === optiPlace) {
					alert(`Ganaste el lugar es la ${roomsArray[numRoom]}`);
					selectUser = "s";
					oportunities[2] = true;
				} else if (coins === 5) {
					alert(`Perdiste el lugar era ${roomsArray[numRoom]}`);
					selectUser = "s";
				}

				break;

			default:
				alert("Opción inválida");
				break;

			case "s":
				break;
		}

		// alert(`gameWin ${gameWin}`);
		alert(`coins ${coins}`);
	} while (selectUser !== "s" && coins !== 7 && gameWin !== 3);

	if (coins === 7) {
		let text_lose = `Perdiste el juego, fue  \n <b> ${copyArrWitMurd[numAssesin].nombre} </b> mato a
			<b>  ${asseMurder[1]} </b>  con la <b> ${weaponsArray[numWeapon]} </b>   en <b>   ${roomsArray[numRoom]} </b> `;

		labelModal = document.getElementById("exampleModalLabel");
		labelModal.innerHTML = "GAMEEEEE OVERRRRR";

		getModal = document.getElementById("exampleModal");

		txtModal = document.getElementById("txt-modal");

		getModal.classList.add("show");
		getModal.classList.add("bg-danger");

		getModal.style.display = "block";

		txtModal.innerHTML = text_lose;
	} else if (gameWin == 3) {
		let text_win = `Felicidades ganaste el juego, fue <b>  \n ${arrWitMurd[numAssesin].nombre} </b>   mato a
			<b>  ${asseMurder[1]} </b> con la <b> ${weaponsArray[numWeapon]} </b>  en <b> ${roomsArray[numRoom]} </b> `;

		labelModal = document.getElementById("exampleModalLabel");
		labelModal.innerHTML = "WIIIIIN";

		getModal = document.getElementById("exampleModal");

		txtModal = document.getElementById("txt-modal");

		getModal.classList.add("show");
		getModal.classList.add("bg-success");

		getModal.style.display = "block";

		txtModal.innerHTML = text_win;
	}
};

//init

let initElements = () => {
	containerCharacters = document.getElementById("containerCharacters");
	containerListSuspects = document.getElementById("containerListSuspects");
	containerListWeapons = document.getElementById("containerListWeapons");
	containerWeapons = document.getElementById("containerWeapons");
	containerMurder = document.getElementById("containerMurder");
	points = document.getElementById("points");
	name_suspect = document.getElementById("name_suspect");
	name_weapon = document.getElementById("name_weapon");
	person_murder = document.getElementById("person_murder");
	// localStorage.clear();
};

let generateListSuspects = (arrSuspects) => {
	containerListSuspects.innerHTML = "";
	arrSuspects.forEach((character) => {
		let list = document.createElement("li");

		list.innerHTML = `<p > ${character.id}.- ${character.nombre} \n </p> `;

		containerListSuspects.appendChild(list);
	});
};

let generateListWeapons = (arrWeapons) => {
	console.log("arrWeapons---list", arrWeapons);

	containerListWeapons.innerHTML = "";
	arrWeapons.forEach((weapons) => {
		let list = document.createElement("li");
		list.innerHTML = `<p class="list-weapons" > ${weapons.id}.- ${weapons.nombre} \n </p> `;
		containerListWeapons.appendChild(list);
	});
};

let checkAssasin = (asseMurder, idSuspect) => {
	let arrWitMurd = asseMurder;
	const copyArrWitMurd = asseMurder;

	for (element in copyArrWitMurd) {
		console.log(
			`despues cut "${copyArrWitMurd[element].id}  ${copyArrWitMurd[element].nombre}`
		);
	}

	id_assasin = localStorage.getItem("id_assasin");
	console.log("id_assasin", id_assasin);

	let gameWin = 0;

	console.log(
		"---asesino rela",
		suspectsArray[id_assasin].nombre,
		"--- sospechosos",
		idSuspect
	);

	if (suspectsArray[id_assasin].id !== idSuspect) {
		arrWitMurd = arrWitMurd.filter((item) => item.id !== idSuspect);

		paintingCharacters(arrWitMurd);
		generateListSuspects(arrWitMurd);

		name_suspect.innerHTML = `No es el asesino ${suspectsArray[idSuspect].nombre}`;
		name_suspect.classList = "name_incorrect";

		// alert(`no es el asesino ${suspectsArray[idSuspect].nombre}`);
	} else if (suspectsArray[id_assasin].id == idSuspect) {
		console.log("-------------------------- entro");

		name_suspect.innerHTML = `Si es el asesino ${suspectsArray[idSuspect].nombre}`;
		name_suspect.classList = "name_correct";
		// alert(`si es el asesino ${suspectsArray[idSuspect].nombre}`);

		showAssasin();
		// localStorage.clear();
	}
};

let showAssasin = () => {
	let column = document.createElement("div");
	id_assasin = localStorage.getItem("id_assasin");

	containerCharacters.innerHTML = "";

	column.className = "col-md-4 mt-3";
	column.id = `character-${suspectsArray[id_assasin].id}`;
	column.innerHTML = `<div class="card" style="width: 18rem;">
  <img src="./characters/${suspectsArray[id_assasin].name_image}.png" id="imgId-${suspectsArray[id_assasin].id}" class="card-img-top " alt="...">
  <div class="card-body">
    <h5 class="card-title">${suspectsArray[id_assasin].nombre}</h5>
    <a href="#" id="btn-possAssesin-${suspectsArray[id_assasin].id}" class="btn btn-primary">tú fuiste</a>
  </div>
</div>`;

	containerCharacters.append(column);
};

let showWeapon = () => {
	let column = document.createElement("div");
	id_weapon = localStorage.getItem("id_weapon");

	console.log("id_weapon===========>", id_weapon);

	containerWeapons.innerHTML = "";

	console.log("containerWeapons", containerWeapons);

	console.log("weapon id----------------------", weaponsArray[id_weapon].id);
	console.log(
		"weapon name----------------------",
		weaponsArray[id_weapon].nombre
	);

	column.className = "col-md-4 mt-3";
	column.id = `weapon-${weaponsArray[id_weapon].id}`;
	column.innerHTML = `<div class="card" style="width: 18rem;">
  <img src="./weapons/${weaponsArray[id_weapon].name_image}.jpg" id="imgId-${weaponsArray[id_weapon].id}" class="card-img-top " alt="...">
  <div class="card-body">
    <h5 class="card-title">${weaponsArray[id_weapon].nombre}</h5>
    <a href="#" id="btn-poss-weapon-${weaponsArray[id_weapon].id}" class="btn btn-primary">con está arma</a>
  </div>
</div>`;

	containerWeapons.append(column);
};

let paintingCharacters = (arrSuspects) => {
	containerCharacters.innerHTML = "";

	arrSuspects.forEach((character) => {
		let column = document.createElement("div");

		column.className = "col-md-4 mt-3";
		column.id = `character-${character.id}`;
		column.innerHTML = `<div class="card" style="width: 18rem;">
  <img src="./characters/${character.name_image}.png" id="imgId-${character.id}" class="card-img-top " alt="...">
  <div class="card-body">
    <h5 class="card-title">${character.nombre}</h5>
    <a href="#" id="btn-possAssesin-${character.id}" class="btn btn-primary">tú fuiste</a>
  </div>
</div>`;

		containerCharacters.append(column);

		let btnAccuse = document.getElementById(`btn-possAssesin-${character.id}`);

		btnAccuse.onclick = () => checkAssasin(arrSuspects, character.id);
	});
};

let paintingWeapons = (arrWeapons) => {
	containerWeapons.innerHTML = "";
	let id_weapon = 0;

	arrWeapons.forEach((weapon) => {
		let column = document.createElement("div");

		// console.log("weapon id----------------------", weapon.id);
		// console.log("weapon name----------------------", weapon.nombre);

		column.className = "col-md-4 mt-3";
		column.id = `weapon-${weapon.id}`;
		column.innerHTML = `<div class="card" style="width: 18rem;">
  	<img src="./weapons/${weapon.name_image}.jpg" id="imgId-${weapon.id}" class="card-img-top " alt="...">
  	<div class="card-body">
    <h5 class="card-title">${weapon.nombre}</h5>
    <a href="#" id="btn-poss-weapon-${weapon.id}" class="btn btn-primary">tú fuiste</a>
		</div>
		</div>`;

		containerWeapons.append(column);
		let btnWeapons = document.getElementById(`btn-poss-weapon-${weapon.id}`);

		btnWeapons.onclick = () => checkWeapons(arrWeapons, weapon.id);
	});
};

let checkWeapons = (arrayWeapons, idWeapon) => {
	console.log("arrya llega ", arrayWeapons, "id de arma", idWeapon);

	console.log("---arma tecleada id", weaponsArray[idWeapon].nombre);

	const copyArrWeapons = arrayWeapons;

	for (element in copyArrWeapons) {
		console.log(
			`despues cut "${copyArrWeapons[element].id}  ${copyArrWeapons[element].nombre}`
		);
	}

	id_weapon = localStorage.getItem("id_weapon");

	let gameWin = 0;

	if (weaponsArray[id_weapon].id !== idWeapon) {
		arrayWeapons = arrayWeapons.filter((item) => item.id !== idWeapon);

		paintingWeapons(arrayWeapons);
		generateListWeapons(arrayWeapons);

		name_weapon.innerHTML = `No es el arma ${weaponsArray[idWeapon].nombre}`;
		name_weapon.classList = "name_incorrect";

		// alert(`no es el asesino ${suspectsArray[idSuspect].nombre}`);
	} else if (weaponsArray[id_weapon].id == idWeapon) {
		console.log("-------------------------- entro");

		name_weapon.innerHTML = `Si es el arma ${weaponsArray[id_weapon].nombre}`;
		name_weapon.classList = "name_correct";
		// alert(`si es el asesino ${suspectsArray[idSuspect].nombre}`);

		showWeapon();
		// localStorage.clear();
	}
};

let matchSuspects = (idCharacter) => {
	let num = String(idCharacter);

	let idLlega = `imgId-${num}`;

	console.log("dide", idLlega);

	let blurCharacter = "";

	blurCharacter = document.getElementById(idLlega);

	console.log("elemento sostenido", blurCharacter);
	blurCharacter.classList = "blur-image";
};

let play = (arrToPlay) => {
	btn = document.getElementById("btnStarPlay");

	btn.onclick = () => menu(arrToPlay);
};

let genereMistery = (arrCompleteDied) => {
	let numAssesin = parseInt(doRandom(arrCompleteDied[0]));

	// console.log(
	// 	"numAssesin",
	// 	numAssesin,
	// 	"arrCompleteDied[1].id",
	// 	arrCompleteDied[1]
	// );

	numAssesin == arrCompleteDied[1]
		? (numAssesin = parseInt(doRandom(arrCompleteDied[0])))
		: console.log("no son iguales");

	console.log(
		"numAssesin 2",
		numAssesin,
		"arrCompleteDied[1].id 2",
		arrCompleteDied[1]
	);

	let numWeapon = parseInt(doRandom(weaponsArray));
	let numRoom = parseInt(doRandom(roomsArray));

	localStorage.setItem("id_assasin", numAssesin);
	localStorage.setItem("id_died", arrCompleteDied[1]);
	localStorage.setItem("id_weapon", numWeapon);
	localStorage.setItem("id_room", numRoom);
};

let paintMurder = (id_murder) =>
	(person_murder.innerHTML = `Mataron a <span> ${suspectsArray[id_murder].nombre} </span> tienes que adivinar quien fue, con que lo mataron y donde lo mato`);

let main = () => {
	arrToPlay = genereAssesinMurder();
	// console.log("arrToPlay", arrToPlay[0], "arrToPlay-1", arrToPlay[1]);
	// console.log("=====A", arrToPlay[1]);

	paintMurder(arrToPlay[1]);
	paintingWeapons(weaponsArray);
	genereMistery(arrToPlay);

	// menu(arrToPlay);

	initElements();

	generateListSuspects(arrToPlay[0]);
	generateListWeapons(weaponsArray);

	paintingCharacters(arrToPlay[0]);

	play(arrToPlay[0]);

	// blur();
};

main();
