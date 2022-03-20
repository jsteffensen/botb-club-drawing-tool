<?php

$ip = $_SERVER['REMOTE_ADDR'];

if($ip == "2a00:6020:15fc:7c00:f141:7be7:965a:f4f") {
	
	$comp = htmlspecialchars($_GET["comp"]);
	$x = htmlspecialchars($_GET["x"]);
	$y = htmlspecialchars($_GET["y"]);

	$servername = "localhost";
	$username = "api";
	$password = "2ijBL9BV2kRDSR2";
	$dbname = "1646837201_botb_club_com";

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);

	if ($conn->connect_error) {
	  die("Connection failed: " . $conn->connect_error);
	}

	$sql = "UPDATE user_results set dist = SQRT((POWER((user_results.x - " . $x . "), 2)) + (POWER((user_results.y - " . $y . "), 2)))  WHERE competition = \"" . $comp . "\"";

	$result = $conn->query($sql);

	$conn->close();		
} else {
	echo "--->" . $ip . "<---";
}
?>