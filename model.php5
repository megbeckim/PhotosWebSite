<?php

if ($_SERVER['REQUEST_METHOD']==='POST') {
  copy("php://input", "model.json");
} else {
  $file = fopen("model.json", "r") or die("Unable to open file!");
  echo fread($file,filesize("model.json"));
  fclose($file);
}

?>