<?php

if ($_SERVER['REQUEST_METHOD']==='POST') {
  copy("php://input", "mapData.json");
}

?>