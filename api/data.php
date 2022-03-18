<?php
require_once('pseudocrypt.php');

date_default_timezone_set('Europe/London');

function milliseconds() {
    $mt = explode(' ', microtime());
    return ((int)$mt[1]) * 1000 + ((int)round($mt[0] * 1000));
}

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

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT entry_id, meta_key, meta_value, UNIX_TIMESTAMP(date_created) AS time_created FROM wp_frmt_form_entry_meta ORDER BY date_created desc";

$result = $conn->query($sql);

$posts = [];
$dcPosts = [];
$mwPosts = [];

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
				if($obj->hidden3 == "dc") {
					$obj->userhash = PseudoCrypt::hash($obj->hidden1, 6);
					$obj->x = $obj->number1;
					$obj->y = $obj->number2;
					unset($obj->number1);
					unset($obj->number2);
					unset($obj->hidden1);
					unset($obj->hidden2);
					unset($obj->hidden3);
					$dcPosts[$entryId] = $obj;
				} else if($obj->hidden3 == "mw") {
					$obj->userhash = PseudoCrypt::hash($obj->hidden1, 6);
					$obj->x = $obj->number1;
					$obj->y = $obj->number2;
					unset($obj->number1);
					unset($obj->number2);
					unset($obj->hidden1);
					unset($obj->hidden2);
					unset($obj->hidden3);
					$mwPosts[$entryId] = $obj;
				}
			}		
		}
	}

	$dcSumX = 0;
	$dcSumY = 0;
	$mwSumX = 0;
	$mwSumY = 0;
	
	// loop to remove older DC posts
	$filteredDCPosts = [];
	$resultDCPosts = [];
	foreach($dcPosts as $k=>$v) {
		$obj = $dcPosts[$k];
		$userKey = $obj->hidden1;
		if(!array_key_exists($userKey, $filteredDCPosts)) {
			$dcSumX += $obj->x;
			$dcSumY += $obj->y;
			$filteredDCPosts[$userKey] = $obj;
			array_push($resultDCPosts, $obj);
		}
	}
	
	// loop to remove older MW posts
	$filteredMWPosts = [];
	$resultMWPosts = [];
	foreach($mwPosts as $k=>$v) {
		$obj = $mwPosts[$k];
		$userKey = $obj->hidden1;
		if(!array_key_exists($userKey, $filteredMWPosts)) {
			$mwSumX += $obj->x;
			$mwSumY += $obj->y;
			$filteredMWPosts[$userKey] = $obj;
			array_push($resultMWPosts, $obj);
		}
	}
  
    $result = new stdClass();
	
	$dcResult = new stdClass();
	$dcResult->data = $resultDCPosts;
	$dcResult->count = count($filteredDCPosts);
	$dcResult->avgx = round($dcSumX/count($filteredDCPosts));
	$dcResult->avgy = round($dcSumY/count($filteredDCPosts));
	
	$mwResult = new stdClass();
	$mwResult->data = $resultMWPosts;
	$mwResult->count = count($filteredMWPosts);
	$mwResult->avgx = round($mwSumX/count($filteredMWPosts));
	$mwResult->avgy = round($mwSumY/count($filteredMWPosts));
	
	$result->time = milliseconds();
	$result->timezone =  date('T');
	$result->dayofweek = date('w');
	$result->dc = $dcResult;
	$result->mw = $mwResult;
	
	//print result
	$json_data = json_encode($result);
	print_r($json_data);
  
  
} else {
  echo "[]";
}
$conn->close();
?>