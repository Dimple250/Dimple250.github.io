<!DOCTYPE html>
<html>
<head>
	<title>Taks1</title>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
<link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body>

<?php

ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

session_start();



$days = array('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday',"Sunday");
$users = [1 => 
    ["login" => "User1", "password" => "1111", "email" => "email@email.com" ]
    ];

if($_SERVER['REQUEST_METHOD'] == 'POST'){

  $failCount = 0;
  $successCount = 0;

  setup($failCount, $successCount);
  
  list($form_errors, $input) = valid_form();
  $auth = 0;
  if($form_errors){
    show_form($form_errors);
  } else {
    foreach ($users as $user) {
      if( $user['login'] == $input['login'] && $user['password'] == $input['password'] && $user['email'] == $input['email']){
        print "<div id='container'>
        <h1 style='margin-top:100px;'>Auth success!</h1>
        <a class='sub' href='index.php'>Back to form</a>
        </div>";
        $fp = fopen('Success.log', 'a+'); //- а+ добавляет новые данные после существующих
        fwrite($fp, date("H:m:s")."  ".$user['login']."\r\n"); // а "r\n\" - вставляет их каждый рас с новой строки
        fclose($fp);
        $auth = 1;
        $_SESSION["count_success"]++; 
      }
    }
    if($auth == 0){
      print "<div id='container'>
        <h1 style='margin-top:100px;'>Auth fail!</h1>
        <a class='sub' href='index.php'>Back to form</a>
        </div>";

        $_SESSION["count_fail"]++;
        
        $fp = fopen('Fail.log', 'a+'); //- а+ добавляет новые данные после существующих
        fwrite($fp, date("H:m:s")."  ".$input['login']."  ". $input['password'] ."  ".$input['email']."  ".$input['day']."  ".$_SESSION["count_fail"]."\r\n");
        fclose($fp);
    }
  }
} else {
  show_form();
}

function setup(&$failCount, &$successCount){

       if(isset($_SESSION["count"])){
            $_SESSION["count"]++; 
            $failCount = $_SESSION["count_fail"];
            $successCount = $_SESSION["count_success"];
        } else {
          $successCount = count(file('Success.log'));
          $failCount = count(file('Fail.log'));
          $count = $failCount + $successCount; 
          if($count == 0) $count = 1;
          $_SESSION["count"] = $count;
          $_SESSION["count_success"] = $successCount;
          $_SESSION["count_fail"] = $failCount;
        }
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
  $str = "";
  if($errors){
    $str .= '<ul><li>';
    $str .= implode('</li><li>', $errors);
    $str .= '</li></ul>';
  }

  $days = generate_options($GLOBALS['days']);

  $coef = 0;

  $successCount = "";
  $failCount = "";
  $count = ""; 

  if(isset($_SESSION["count_success"]) && isset($_SESSION["count"]) ){
   $coef = ($_SESSION["count_success"]/$_SESSION["count"])*100;
  } else {
    $successCount = count(file('Success.log'));
    $failCount = count(file('Fail.log'));
    $count = $failCount + $successCount; 
    if($count == 0) $count = 1;
    $coef = ($successCount/$count)*100;
  }
print "<div id='container'>
  <h1>Log In</h1>
  <div id='errors'>
  {$str}
  </div>
<form method='POST' action='index.php'>
<input type='text' name='login' placeholder='Login'>
<input type='email' name='email' placeholder='E-mail'>
<input type='password' name='password' placeholder='Password'>
 <div class='days'>
 Day: <select name='days'>".$days."</select>
 </div>
  <input class='sub' type='submit' name='submit' value='Log in'>
</form>
<div class='ratio'>Success ratio: ".number_format($coef, 2, '.', '')."% 
<button type='button' class='btn btn-primary stat' data-toggle='modal' data-target='#exampleModal'>
  Statistic
</button>
</div>
</div>

<div class='modal fade' id='exampleModal' tabindex='-1' role='dialog' aria-labelledby='exampleModalLabel' aria-hidden='true'>
  <div class='modal-dialog' role='document'>
    <div class='modal-content'>
      <div class='modal-header'>
        <h5 class='modal-title' id='exampleModalLabel'>Statistic</h5>
        <button type='button' class='close' data-dismiss='modal' aria-label='Close'>
          <span aria-hidden='true'>&times;</span>
        </button>
      </div>
      <div class='modal-body'>
      <ul>
        <li>Number of auth: {$count};</li>
        <li>Number of success auth: {$successCount};</li>
        <li>Number of fail auth: {$failCount};</li>
        </ul>
      </div>
      <div class='modal-footer'>
        <button type='button' class='btn btn-secondary' data-dismiss='modal'>Close</button>
      </div>
    </div>
  </div>
</div>

";


}



?>

<!-- Forgotten Password Container -->
<!-- <div id="forgotten-container">
   <h1>Forgotten</h1>
  <span class="close-btn">
    <img src="https://cdn4.iconfinder.com/data/icons/miu/22/circle_close_delete_-128.png"></img>
  </span>

  <form>
    <input type="email" name="email" placeholder="E-mail">
    <a href="#" class="orange-btn">Get new password</a>
</form>
</div> -->
<script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>
<script src='http://cdnjs.cloudflare.com/ajax/libs/gsap/1.16.1/TweenMax.min.js'></script>
<script src="js/index.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
</body>
</html>