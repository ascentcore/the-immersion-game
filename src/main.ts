import './style.css'
import { quickStart, Vector3, Engine } from 'surreal-engine';

const opts = {
  showFps: true,
};

const setupCameraAndLighting = (engine: Engine) => {
  engine.creator.directionalLight({
    color: '#ffffff',
    intensity: 1,
    pos: new Vector3(0, 30, 25),
    target: new Vector3(0, 0, 0),
    castShadow: true,
    shadowAreaHeight: 50,
    shadowAreaWidth: 40,
  })
  engine.creator.ambientLight({ color: '#ffffff', intensity: 0.5 });
  engine.setOrthographicCamera({
    distance: 12,
  });
}

quickStart("#app", opts,
  assets => {
    assets.setBasePath('/assets/');
    assets.addTexture('asphalt', 'asphalt/ASPHALT_001_COLOR.jpg');
    assets.addTexture('asphalt@normal', 'asphalt/ASPHALT_001_NRM.jpg');
    assets.addTexture('asphalt@bump', 'asphalt/ASPHALT_001_DISP.png');
    assets.addTexture('asphalt@ao', 'asphalt/ASPHALT_001_OCC.jpg');
  },
  engine => {
    setupCameraAndLighting(engine);

    engine.materials.addTexturedMaterial('asphalt', {
      texture: {
        map: 'asphalt',
        normalMap: 'asphalt@normal',
        bumpMap: 'asphalt@bump',
        aoMap: 'asphalt@ao',
      },
      repeat: { x: 10, y: 1 },
    });

    engine.creator.box({
      pos: new Vector3(0, -1, 0),
      size: new Vector3(80, 1, 8),
      mass: 0,
      rigid: true,
      receiveShadow: true,
      material: 'asphalt',
    });

    // Path
    engine.creator.box({
      pos: new Vector3(0, -1, 12),
      size: new Vector3(6, 1, 16),
      mass: 0,
      rigid: true,
      receiveShadow: true,
      material: 'yellow',
    });

    // Grass
    engine.creator.box({
      pos: new Vector3(15, -1, 12),
      size: new Vector3(24, 1, 16),
      mass: 0,
      rigid: true,
      receiveShadow: true,
      material: 'green',
    });
    engine.creator.box({
      pos: new Vector3(-15, -1, 12),
      size: new Vector3(24, 1, 16),
      mass: 0,
      rigid: true,
      receiveShadow: true,
      material: 'green',
    });

    engine.creator.box({
      pos: new Vector3(-20, 0, 0),
      size: new Vector3(1, 1, 1),
      mass: 1,
      rigid: true,
      castShadow: true,
      material: 'red',
    }).withOffsetCamera(new Vector3(-10, 10, -10))
    .withKeyboardMotion();
  }
);
