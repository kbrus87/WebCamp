<?php
$conn = new mysqli('localhost', 'root', 'root', 'gdlwebcamp',8889);

if ($conn->connect_error){
    echo $error -> $conn->connect_error;
}
?>