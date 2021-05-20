<?php 


	$sql = "DELETE FROM usuario WHERE ID = :ID";
	$queryProcess = $CNX->prepare($sql);

	$arguments = array(":ID"=>$_POST["user_id"]);

	$queryProcess->execute($arguments);

	if($queryProcess->rowCount() > 0){

		$resultMessage = "<p class='good'> Registro Borrado</p>";

	}else{

		$resultMessage = "<p class='warning'> Registro no Borrado</p>";

	}



 ?>