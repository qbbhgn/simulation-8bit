<?php  
$target_path = "";  
$target_path = $target_path.basename( $_FILES['fileToUpload']['name']);   

if(move_uploaded_file($_FILES['fileToUpload']['tmp_name'], $target_path)) {  
    echo "1";  
} else{  
    echo "0";  
}
?>