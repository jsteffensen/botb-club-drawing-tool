<?php
require_once('pseudocrypt.php');

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

$servername = "localhost";
$username = "api";
$password = "2ijBL9BV2kRDSR2";
$dbname = "1646837201_botb_club_com";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT entry_id, meta_key, meta_value, UNIX_TIMESTAMP(date_created) AS time_created FROM wp_frmt_form_entry_meta ORDER BY date_created desc";

$result = $conn->query($sql);

$posts = [];

if ($result->num_rows > 0) {
  
	// loop to merge all fields from a user post into one object
	while($row = $result->fetch_assoc()) {
		if($row["meta_key"] != "_forminator_user_ip") {

			$entryId = "key_" . $row["entry_id"];
			
			if(array_key_exists($entryId, $posts)) {
				$obj = $posts[$entryId];
				$key = $row["meta_key"];
				$key = str_replace("-", "", $key);
				$obj->{$key} = $row["meta_value"];
				$posts[$entryId] = $obj;	
			} else {
				$obj = new stdClass();
				$key = $row["meta_key"];
				$key = str_replace("-", "", $key);
				$obj->time_created = $row["time_created"];
				$obj->{$key} = $row["meta_value"];
				$posts[$entryId] = $obj;	
			}
			
			if(isComplete($obj)) {
				if($obj->hidden3 == "mw") {
					unset($posts[$entryId]);
				} else {
					$obj->userhash = PseudoCrypt::hash($obj->hidden1, 6);
					$obj->x = $obj->number1;
					$obj->y = $obj->number2;
					unset($obj->number1);
					unset($obj->number2);
					unset($obj->hidden1);
					unset($obj->hidden2);
					unset($obj->hidden3);
					$posts[$entryId] = $obj;
				}
			}		
		}
	}

	// loop to remove older posts
	$filteredPosts = [];
	foreach($posts as $k=>$v) {
		$obj = $posts[$k];
		$userKey = $obj->hidden1;
		if(!array_key_exists($userKey, $filteredPosts)) {
			$filteredPosts[$userKey] = $obj;
		}
	}
  
  
	$index = 0;
	echo "[";
	foreach($filteredPosts as $k=>$v) {
	  $json_data = json_encode((array) $filteredPosts[$k]);
	  print_r($json_data);
	  if(++$index != count($filteredPosts)) {
		echo ", ";
	  }
	}
	echo "]";
  
  
} else {
  echo "[]";
}
$conn->close();
?>