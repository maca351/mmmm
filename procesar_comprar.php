<?php
// Incluir el archivo de conexión
include("conex.php");

error_reporting(E_ALL);
ini_set('display_errors', 1);

// Obtener los datos del formulario
$nombre = $_POST['nombre'];
$email = $_POST['email'];
$direccion = $_POST['direccion'];
$metodoPago = $_POST['metodoPago'];
$totalCompra = $_POST['totalCompra'];

if(empty($totalCompra)) {
    echo "Error: El total de la compra está vacío";
    exit;
}
// Insertar los datos en la base de datos
$sql = "INSERT INTO compras (nombre, email, direccion, metodoPago, totalCompra) VALUES ('$nombre', '$email', '$direccion', '$metodoPago', '$totalCompra')";
echo $sql;

if ($conex->query($sql) === TRUE) {
    echo "Compra realizada con éxito";
} else {
    echo "Error al realizar la compra:: " . $sql . "<br>" . $conex->error;
}

$conex->close();
print_r($_POST);
?>
procesar_comprar.php
Mostrando procesar_comprar.php
<?php
// Incluir el archivo de conexión
include("conex.php");

error_reporting(E_ALL);
ini_set('display_errors', 1);

// Obtener los datos del formulario
$nombre = $_POST['nombre'];
$email = $_POST['email'];
$direccion = $_POST['direccion'];
$metodoPago = $_POST['metodoPago'];
$totalCompra = $_POST['totalCompra'];

if(empty($totalCompra)) {
    echo "Error: El total de la compra está vacío";
    exit;
}
// Insertar los datos en la base de datos
$sql = "INSERT INTO compras (nombre, email, direccion, metodoPago, totalCompra) VALUES ('$nombre', '$email', '$direccion', '$metodoPago', '$totalCompra')";
echo $sql;

if ($conex->query($sql) === TRUE) {
    echo "Compra realizada con éxito";
} else {
    echo "Error al realizar la compra:: " . $sql . "<br>" . $conex->error;
}

$conex->close();
print_r($_POST);
?>