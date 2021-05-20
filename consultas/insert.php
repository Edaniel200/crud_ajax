<?php 


	$sql = "INSERT INTO usuario(USERS, CONTRASENA) VALUES(:US, :CONTRA)";
	$queryProcess = $CNX->prepare($sql);
	$passwordSecurity = password_hash($_POST["user_password"], PASSWORD_DEFAULT);

	$arguments = array(":US"=>$_POST["user_name"], ":CONTRA"=>$passwordSecurity);

	$queryProcess->execute($arguments);

	if($queryProcess->rowCount() > 0){

		$resultMessage = "<p class='good'> Registro Insertado</p>";

	}else{

		$resultMessage = "<p class='good'> Registro no Insertado</p>";

	}



 ?>