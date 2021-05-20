<?php 

	$sql = "SELECT * FROM usuario";
	$queryProcess = $CNX->query($sql);
	$registros = [];

	while($registro = $queryProcess->fetch(PDO::FETCH_ASSOC)){

		$registros[] = $registro;

	}
	if($queryProcess->rowCount() > 0){

		$resultMessage = "<p class='good'> Existen " . $queryProcess->rowCount() . " registros</p>";

	}else{

			$resultMessage = "<p class='warning'> No existen registros</p>";

	}



 ?>