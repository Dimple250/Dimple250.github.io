<!DOCTYPE html>
<html>
<head>
	<title>Task1</title>
</head>
<body>
	<h1>Auth</h1>
<?php

ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

$days = array('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday',"Sunday");
$users = [1 => 
		["login" => "User1", "password" => "1111", "email" => "email@email.com" ]
		];

if($_SERVER['REQUEST_METHOD'] == 'POST'){
	
	list($form_errors, $input) = valid_form();
	$auth = 0;
	if($form_errors){
		show_form($form_errors);
	} else {
		foreach ($users as $user) {
			if( $user['login'] == $input['login'] && $user['password'] == $input['password'] && $user['email'] == $input['email']){
				echo "Auth success!<br><br>";
				echo "<a href='Form.php'>Back to form</a>";
				$fp = fopen('Success.log', 'a+'); //- а+ добавляет новые данные после существующих
				fwrite($fp, date("H:m:s")."  ".$user['login']."\r\n"); // а "r\n\" - вставляет их каждый рас с новой строки
				fclose($fp);
				$auth = 1;
			}
		}
		if($auth == 0){
			echo "Auth fail!";
		}
	}
} else {
	show_form();
}

function valid_form(){
	$errors = array();
	$inputs = array();

	$input['login'] = trim($_POST['login'] ?? '');
	if(strlen($input['login'])<4){
		$errors[] = "Your login must be at least 3 letters long";
	} 

	$input['password'] = $_POST['password'];
	if(strlen($input['password'])==0){
		$errors[] = 'You must enter a password';
	}

	//Проверка адресса почты
	$input['email'] = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
	if (! $input['email']) {
		$errors[] = 'Please enter a valid email address';
	}

	$input['day'] = $_POST['days'];
	if (! in_array($input['day'] , $GLOBALS['days'])) {
		$errors[] = 'Please choose a valid order.';
	}

	return array($errors, $input);
}

function generate_options($options){
	$html = '';
	foreach($options as $option){
		$html .= "<option>".$option."</option>\n";
	}
	return $html;
}

function show_form($errors = ''){
	if($errors){
		print 'Please correct these errors:<ul><li>';
		print implode('</li><li>', $errors);
		print '</li></ul>';
	}

	$days = generate_options($GLOBALS['days']);

print "<form method='POST' action='Form.php'>
Your login: <input type='text' name='login' />
<br><br>
	Your password: <input class='input-style' type='password' name='password' />
	<br><br>
	Your email: <input type='email' name='email'>
	<br><br>
	Day: <select name='days'>".$days."</select>
	<br><br>
	<input type='submit' name='submit' value='SING UP'>
</form>";


}



?>
</body>
</html>


