<?php 

	$messages = [];
	//$messages["err"] = true;
	require_once("../ajustes/conexionDataBase.php");

	$receivedQuery = $_POST['queryType'];

	//echo $receivedQuery;

	if($receivedQuery == "S"){

		require_once("../consultas/select.php");
		$messages["resultMessage"] = $resultMessage;
		$messages["record"] = $registros;
	

	}else if($receivedQuery == "I"){

		require_once("../consultas/insert.php");
		$messages["resultMessage"] = $resultMessage;


	}else if($receivedQuery == "U"){

		require_once("../consultas/update.php");
		$messages["resultMessage"] = $resultMessage;
	

	}else if($receivedQuery == "D"){

		require_once("../consultas/delete.php");
		$messages["resultMessage"] = $resultMessage;
		

	}

	$messages["queryType"] = $_POST["queryType"];



	echo json_encode($messages);


 ?>	
