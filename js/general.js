var resultMessage, send, mainForm;//proposito general

startApp = () => { //comiezo de la app cargando datos a las variables generales

	const form = document.forms;

	resultMessage = document.getElementById("message");
	send = document.getElementById("send");	
	mainForm = form[0];


	send.addEventListener("click", sendProcess);

}

sendProcess = obj => { //proceso de envio de datos

	let userName = mainForm.user_name.value;
	let userPassword = mainForm.user_password.value;
	const messageInput = "<p class='danger'>Rellene los dos campos</p>";
	const dFD = defineFormData(obj);


	userName != "" && userPassword != ""?sendData(dFD):resultMessage.innerHTML = messageInput;
	

}

defineFormData = obj => { // se define la data y se agregan los datos a enviar

	const nameActual = obj.target.name;
	let dataForm = new FormData();

	dataForm.append("user_name", mainForm.user_name.value);
	dataForm.append("user_password", mainForm.user_password.value);

	defineOtherArguments(dataForm, nameActual);
	
	return dataForm;


}

defineOtherArguments = ($dataForm, nameActual) => { //define dependiendo del tipo de consulta otros argumentos a la data definida

		if(nameActual == "insertSend"){

			$dataForm.append("queryType", "I");

		}else if(nameActual == "updateSend"){

			$dataForm.append("queryType", "U");
			$dataForm.append("user_id", mainForm.user_id.value);

		}

		//return dataForm;
}


 sendData = (data, messageContent, URL = "proceso/process_form.php") => { //se envia la data

	fetch(URL, { method : "POST", body : data})
	.then(function(resProcess){

		return resProcess.json();

	}).then(function(res){

		if(res.queryType == "S"){
			printResult(messageContent, res.record);
		}else{
			resultMessage.innerHTML = "<p>" + res.resultMessage + "</p>";

			loadRecord();
		}

	});

}

printResult = (messageContent, record) => { //imprime el resultado de la consulta select

	let contentTable = "";

	contentTable = "<table>";
	contentTable += `<tr>
		<th>ID</th>
		<th>Usuario</th>
		<th>Contraseña</th>
	</tr>`;
	contentTable += getRecords(record);
	contentTable += "</table>";

	messageContent.innerHTML = contentTable;

}

getRecords = record => { //devuelve los registros recibidos como respuesta

	const cant = record.length;
	let records = "";

	for(let i = 0; i < cant; i++){

		records += `<tr>
			<td>` + record[i]["ID"] + `</td>
			<td>` + record[i]["USERS"] + `</td>
			<td>` + record[i]["CONTRASENA"] + `</td>
			<td><button onclick='updateUser(` + record[i]["ID"] + `)'>actualizar</button></td>
			<td><button onclick='deleteUser(` + record[i]["ID"] + `)'>eliminar</button></td>
		</tr>`;

	}

	return records;
}

updateUser = id => { //se realizan los cambios en el formulario ** se busca reutilizar el formulario actual para actualizar

	send.name = "updateSend";
	send.innerHTML = "Actualizar";
	mainForm.user_name.placeholder = "Usaurio a Actualizar";
	mainForm.user_password.placeholder = "Contraseña a Actualizar";
	mainForm.user_id.value = id;
	resultMessage.innerHTML = "<p class='warning'>Si no desea cambiar la contraseña inserte la actual</p>";

	startApp();//Se hace esta llamada para cargar los cambios en las variables de la funcion

}

 deleteUser = id => {

	let dataDelete = new FormData();

	dataDelete.append("user_id", id);
	dataDelete.append("queryType", "D");
	sendData(dataDelete);

	

}


/*------------------------------FUNCIONES AL CARGAR--------------------------------*/


loadRecord = () => {

	let generalContent = document.getElementById("generalContent");
	let dataStart = new FormData();

	dataStart.append("queryType", "S");
	sendData(dataStart, generalContent);

}


window.addEventListener("load", () => {

	loadRecord();
	startApp();

});



/*
class userSetting{

	nombre = 'jose';
	auth = "";
	credenciales = '';

	constructor(nombre){

		this.nombre = nombre;
		this.auth = new credencial(true);
		this.credenciales = this.auth.verifyCre();
		

	}

	getName(){
		return this.nombre;
	}

}


class credencial{

	setting = "";
	constructor(setting){

		this.setting = setting;

	}
	verifyCre(){

		if(this.setting){
			return true;
		}else{
			return false;
		}


	}
	getCrede(){
		return this.setting;
	}

}


var userS = new userSetting("erwing");


alert(userS.getName());
alert(userS.auth.setting);









var obj = {//creamos un objecto
	nombre : "erwing",
	apellido : "martinez",

	getNombre : function(){
		return this.nombre;
	}

}


var obj_2 = Object.create(obj);//creamos una copia
obj_2.nombre = "Daniel";//cambiamos el nombre de la copia

var obj_json = JSON.stringify(obj);//pasamos a formato JSON y se pierden los metodos
var json_obj = JSON.parse(obj_json);//pasamos a formato objecto pero ya no tenemos getName() 

console.log(obj_2.getNombre());//se imprime el nuevo nombre de la copia*/