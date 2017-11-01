 function cameraControl() {
        camera(camX, camY, 0)
     camX = player.position.x - 200;
     camY = player.position.y;
     console.log(camX)
    }