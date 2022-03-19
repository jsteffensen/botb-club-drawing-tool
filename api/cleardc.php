<?php
$param = htmlspecialchars($_GET["key"]);
function isComplete($obj) {
	$hasT = property_exists($obj, "time_created");
	$hasN1 = property_exists($obj, "number1");
	$hasN2 = property_exists($obj, "number2");
	$hasH1 = property_exists($obj, "hidden1");
	$hasH2 = property_exists($obj, "hidden2");
	$hasH3 = property_exists($obj, "hidden3");
	
	$isComplete = $hasT && $hasN1 && $hasN2 && $hasH1 && $hasH2 && $hasH3;

	return $isComplete;
}

if($param == "supersecretkey") {
	$servername = "localhost";
	$username = "api";
	$password = "2ijBL9BV2kRDSR2";
	$dbname = "1646837201_botb_club_com";

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);

	if ($conn->connect_error) {
	  die("Connection failed: " . $conn->connect_error);
	}

	$sql = "SELECT entry_id, meta_key, meta_value FROM wp_frmt_form_entry_meta WHERE meta_key=\"hidden-3\" AND meta_value=\"dc\"";

	$result = $conn->query($sql);

	$list = "";
	// loop to merge all fields from a user post into one object
	while($row = $result->fetch_assoc()) {
		$entryId = $row["entry_id"];
		
		$seperator = strlen($list) > 0 ? ", " : "";
		$list = $list . $seperator . $entryId;
	}

	$dsql = "DELETE FROM wp_frmt_form_entry_meta WHERE entry_id IN (" . $list . ")";
	$dresult = $conn->query($dsql);
	echo $dresult;

	$conn->close();	
}

?>