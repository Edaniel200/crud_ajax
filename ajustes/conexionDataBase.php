<?php 

	try{

		$CNX = new PDO("mysql:host=localhost; dbname=usuarios", "root", "");
		$CNX->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$CNX->exec("SET CHARACTER SET UTF8");

		$messages["DBmessage"] = "Conectado";

	}catch(Eception $err){

		$messages["DBmessage"] = $err->getMessage();

	}



 ?>