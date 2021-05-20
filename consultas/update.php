<?php 


	$sql = "UPDATE usuario SET USERS = :US , CONTRASENA = :CONTRA WHERE ID = :ID";
	$queryProcess = $CNX->prepare($sql);
	$passwordSecurity = password_hash($_POST["user_password"], PASSWORD_DEFAULT);

	$arguements = array(":US"=>$_POST["user_name"], ":CONTRA"=>$passwordSecurity, ":ID"=>$_POST["user_id"]);

	$queryProcess->execute($arguements);

	if($queryProcess->rowCount() > 0){

		$resultMessage = "<p class='good'> Registro Actualizado</p>";

	}else{

		$resultMessage = "<p class='warning'> Registro no Actualizado</p>";

	}


 ?>