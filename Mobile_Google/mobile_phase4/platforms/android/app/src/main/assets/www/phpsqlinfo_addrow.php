<?php
$username="t6ngtr00";
$password="gR5bhCd8ZnNkSpKE";
$database="opisk_t6ngtr00";

// Gets data from URL parameters.
$name = $_GET['name'];
$address = $_GET['address'];
$lat = $_GET['lat'];
$lng = $_GET['lng'];
$des = $_GET['descripton'];

// Opens a connection to a MySQL server.
$connection=mysqli_connect ("mysli.oamk.fi", $username, $password, "opisk_t6ngtr00");
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

// Sets the active MySQL database.
//$db_selected = mysql_select_db($database, $connection);
//if (!$db_selected) {
//  die ('Can\'t use db : ' . mysql_error());
//}

// Inserts new row with place data.
$query = sprintf("INSERT INTO markershuy" .
         " (id, name, address, lat, lng, des ) " .
         " VALUES (NULL, '%s', '%s', '%s', '%s', '%s');",
         //mysql_real_escape_string($name),
         //mysql_real_escape_string($address),
         //mysql_real_escape_string($lat),
         //mysql_real_escape_string($lng),
         //mysql_real_escape_string($type));

         $name,
         $address,
         $lat,
         $lng,
         $type);

$result = mysqli_query($connection,$query);

if (!$result) {
  die('Invalid query: ' . mysql_error());
}

if($result){
            echo "<div class='form'>
<h3>Your location was submitted and is waiting to be checked.</h3></div>";
        }


?>
