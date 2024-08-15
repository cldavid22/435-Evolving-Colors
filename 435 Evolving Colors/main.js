const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

const dimension = 100;

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	gameEngine.entities = [];
	let automata = new Automata();
	gameEngine.addEntity(automata);

	document.getElementById("plant").addEventListener("click", () => {
		automata.addPlant();
	});

	document.getElementById("animat").addEventListener("click", () => {
		gameEngine.addEntity(new Animat({x:randomInt(dimension),y:randomInt(dimension),hue:randomInt(360)}, automata));
	});

	document.getElementById("clear").addEventListener("click", () => {
		gameEngine.clearAnimats();
		automata.clearPlants();
	});

	gameEngine.init(ctx);

	gameEngine.start();
});


