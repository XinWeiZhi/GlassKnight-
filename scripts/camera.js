 function cameraControl() {
        camera(camX, camY, 0)
     camX = player.position.x - width / 2;
     
     camY = player.floorY - 800;

    }