<?php
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

$sql = "SELECT * FROM wp_frmt_form_entry_meta ORDER BY entry_id desc";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
  
  $numResults = $result->num_rows;
  $counter = 0;
  
  echo "[";
  while($row = $result->fetch_assoc()) {
	  
    echo "{\"entry_id\":" . $row["entry_id"]. ",\n\"meta_key\":\"" . $row["meta_key"]. "\",\n\"meta_value\":\"" . $row["meta_value"] . "\",\n\"date_created\":\"" . $row["date_created"] ."\"}";
	if (++$counter != $numResults) {
       echo ",\n";
    }
  }
  echo "]";
} else {
  echo "[]";
}
$conn->close();
?>