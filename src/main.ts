import './style.css'
import { quickStart, Vector3, Engine, DirectionalLight, GlobalLight, Box, offsetCameraMod, keyboardMotionMod, MotionPlugin } from 'surreal-engine';
import { EngineOpts } from 'core/engine';

const opts: EngineOpts = {
  showFps: true,
};

const setupCameraAndLighting = (engine: Engine) => {
  engine.new(DirectionalLight, {
    color: '#ffffff',
    intensity: 1,
    pos: new Vector3(0, 30, 25),
    target: new Vector3(0, 0, 0),
    castShadow: true,
    shadowAreaHeight: 50,
    shadowAreaWidth: 40,
  });
  engine.new(GlobalLight, { color: '#ffffff', intensity: 0.5 });
  engine.setOrthographicCamera({
    distance: 12,
  });
}

quickStart("#app", opts,
  (assets) => {
    assets.setBasePath("/assets/");
    assets.addTexture("grass", "grass/Stylized_Grass_001_basecolor.jpg");
    assets.addTexture("grass@normal", "grass/Stylized_Grass_001_normal.jpg");
    assets.addTexture("grass@roughness", "grass/Stylized_Grass_001_roughness.jpg");
    assets.addTexture("grass@ao", "grass/Stylized_Grass_001_ambientOcclusion.jpg");
    assets.addTexture("grass@height", "grass/Stylized_Grass_001_height.png");
  },
  engine => {
    engine.registerPlugin(new MotionPlugin());
    engine.materials.addTexturedMaterial("grass", {
      texture: {
        map: "grass",
        bumpMap: "grass@height",
        normalMap: "grass@normal",
        aoMap: "grass@ao",
        // roughnessMap: "grass@roughness", TODO: This is not implemented in the engine yet
      },
      repeat: {
        x: 8,
        y: 8,
      }
    });
    setupCameraAndLighting(engine);

    // Grass
    engine.new(Box, {
      size: new Vector3(100, 1, 100),
      mass: 0,
      rigid: true,
      receiveShadow: true,
      material: 'grass',
    });

    engine.new(Box, {
      pos: new Vector3(0, 5, 0),
      size: new Vector3(1, 1, 1),
      mass: 1,
      rigid: true,
      castShadow: true,
      material: 'red',
      mods: [
        offsetCameraMod(new Vector3(-10, 10, -10)),
        keyboardMotionMod(1, 1, 1),
      ],
    });
  }
);
