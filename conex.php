<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "tu_base_de_datos";

// Crear conexión
$conex = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conex->connect_error) {
    die("Conexión fallida: " . $conex->connect_error);
} else {
    echo "Conexión exitosa";
}
?>