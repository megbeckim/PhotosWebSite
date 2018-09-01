<?php

    $album = $_REQUEST['album'];
    $fileName = $_REQUEST['fileName'];
    $thumbnailWidth = $_REQUEST['width'];
    $thumbnailHeight = 300;

    $thumbnailImage = imagecreatetruecolor($thumbnailWidth, $thumbnailHeight);

    $fullOriginalImagePath = 'albums/'.$album.'/'.$fileName;

    $lastModifiedTime = filemtime($fullOriginalImagePath);
    $eTag = md5($album.$fileName.$thumbnailWidth);

    header("Last-Modified: ".gmdate("D, d M Y H:i:s", $lastModifiedTime)." GMT");
    header("ETag: \"{$eTag}\"");

    $originalImage = imagecreatefromjpeg($fullOriginalImagePath);
    $originalWidth = imagesx($originalImage);
    $originalHeight = imagesy($originalImage);

    $thumbnailAspectRatio = $thumbnailWidth / $thumbnailHeight;

    if ( $originalWidth / $originalHeight > $thumbnailAspectRatio ) {
        $originalCropHeight = $originalHeight;
        $originalCropTop = 0;
        $originalCropWidth = $originalHeight * $thumbnailAspectRatio;
        $originalCropLeft = ($originalWidth - $originalCropWidth) / 2;
    } else {
        $originalCropHeight = $originalWidth / $thumbnailAspectRatio;;
        $originalCropTop = ($originalHeight - $originalCropHeight) / 2;
        $originalCropWidth = $originalWidth;
        $originalCropLeft = 0;
    }

    // Resize
    imagecopyresized($thumbnailImage, $originalImage, 0, 0, $originalCropLeft, $originalCropTop, $thumbnailWidth, $thumbnailHeight, $originalCropWidth, $originalCropHeight);

    // Content type
    header('Content-type: image/jpeg');
    
    // Output to the browser for this time
    imagejpeg($thumbnailImage);

?>