<?php

date_default_timezone_set('Europe/London');

function milliseconds() {
    $mt = explode(' ', microtime());
    return ((int)$mt[1]) * 1000 + ((int)round($mt[0] * 1000));
}
  echo "{\"timestamp\":" . milliseconds() . ", \"timezone\":\"" .  date('T') . "\", \"dayofweek\":" . date('w') . "}\n";
?>