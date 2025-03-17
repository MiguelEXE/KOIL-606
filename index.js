"use strict";
const SCREEN_FACTOR = 30;
const SCREEN_WIDTH = Math.floor(16 * SCREEN_FACTOR);
const SCREEN_HEIGHT = Math.floor(9 * SCREEN_FACTOR);
async function loadImage(url) {
    const image = new Image();
    image.src = url;
    return new Promise((resolve, reject) => {
        image.onload = () => resolve(image);
        image.onerror = reject;
    });
}
async function loadImageData(url) {
    const image = await loadImage(url);
    const canvas = new OffscreenCanvas(image.width, image.height);
    const ctx = canvas.getContext("2d");
    if (ctx === null)
        throw new Error("2d canvas is not supported");
    ctx.drawImage(image, 0, 0);
    return ctx.getImageData(0, 0, image.width, image.height);
}
let musicPlaying = false;
(async () => {
    const gameCanvas = document.getElementById("game");
    if (gameCanvas === null)
        throw new Error("No canvas with id `game` is found");
    const factor = 80;
    gameCanvas.width = 16 * factor;
    gameCanvas.height = 9 * factor;
    const ctx = gameCanvas.getContext("2d");
    if (ctx === null)
        throw new Error("2D context is not supported");
    ctx.imageSmoothingEnabled = false;
    const music = new Audio("assets/sounds/lavender.ogg");
    music.loop = true;
    music.load();
    const [typescript, enemy, pmWall1, pmWall6] = await Promise.all([
        loadImageData("assets/images/Typescript_logo_2020.png"),
        loadImageData("assets/images/custom/pm606_enemy1.png"),
        loadImageData("assets/images/custom/pm606_wall1.png"),
        loadImageData("assets/images/custom/pm606_wall6.png")
    ]);
    let game = await import("./game.js");
    const scene = game.createScene([
        [null, null, null, null, null, null, pmWall1, pmWall1, pmWall1, null, null, null, null, null, pmWall1, pmWall1, pmWall1, null, null, null, null, null, pmWall1, pmWall1, pmWall1, null, null, null, null, null, pmWall1, pmWall1, pmWall1, null, null, null, null, null, pmWall1, pmWall1, pmWall1, null, null, null, null, null, pmWall1, pmWall1, pmWall1, null, null, null, null, null, pmWall1, pmWall1, pmWall1, null, null, null, null, null, pmWall1, pmWall1, pmWall1, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, pmWall1, null, null, null, pmWall1, null, null, null, pmWall1, null, null, null, pmWall1, null, null, null, pmWall1, null, null, null, pmWall1, null, null, null, pmWall1, null, null, null, pmWall1, null, null, null, pmWall1, null, null, null, pmWall1, null, null, null, pmWall1, null, null, null, pmWall1, null, null, null, pmWall1, null, null, null, pmWall1, null, null, null, pmWall1, null, null, null, pmWall1, null, null, null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, pmWall1, pmWall1, null, pmWall1, null, null, null, null, pmWall1, pmWall1, null, pmWall1, null, null, null, null, pmWall1, pmWall1, null, pmWall1, null, null, null, null, pmWall1, pmWall1, null, pmWall1, null, null, null, null, pmWall1, pmWall1, null, pmWall1, null, null, null, null, pmWall1, pmWall1, null, pmWall1, null, null, null, null, pmWall1, pmWall1, null, pmWall1, null, null, null, null, pmWall1, pmWall1, null, pmWall1, null, null, null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, pmWall1, pmWall1, pmWall1, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, pmWall1, null, null, null, pmWall1, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, pmWall1, pmWall1, null, pmWall1, pmWall1, pmWall1, pmWall1, pmWall1, pmWall1, pmWall1, null],
        [null, null, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, pmWall1, null, pmWall1, null, pmWall1, null, null, null, pmWall1, null],
        [null, null, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, pmWall1, null, pmWall1, null, pmWall1, null, pmWall1, null, pmWall1, null],
        [null, pmWall1, pmWall1, pmWall1, pmWall1, pmWall1, pmWall1, pmWall1, null, pmWall1, pmWall1, pmWall1, pmWall1, pmWall1, pmWall1, pmWall1, null, pmWall1, pmWall1, pmWall1, pmWall1, pmWall1, pmWall1, pmWall1, null, pmWall1, pmWall1, pmWall1, pmWall1, pmWall1, pmWall1, pmWall1, null, pmWall1, pmWall1, pmWall1, pmWall1, pmWall1, pmWall1, pmWall1, null, pmWall1, pmWall1, pmWall1, pmWall1, pmWall1, pmWall1, pmWall1, null, pmWall1, pmWall1, pmWall1, pmWall1, pmWall1, pmWall1, pmWall1, null, pmWall1, pmWall1, pmWall1, pmWall1, pmWall1, pmWall1, pmWall1, null, pmWall1, pmWall1, pmWall1, pmWall1, pmWall1, null, pmWall1, null, null, null, pmWall1, null, pmWall1, null],
        [pmWall1, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, pmWall1, null, pmWall1, null, pmWall1, null, pmWall1, null, pmWall1, null],
        [null, pmWall1, pmWall1, pmWall1, pmWall1, pmWall1, pmWall1, pmWall1, null, pmWall1, pmWall1, pmWall1, pmWall1, pmWall1, pmWall1, pmWall1, null, pmWall1, pmWall1, pmWall1, pmWall1, pmWall1, pmWall1, pmWall1, null, pmWall1, pmWall1, pmWall1, pmWall1, pmWall1, pmWall1, pmWall1, null, pmWall1, pmWall1, pmWall1, pmWall1, pmWall1, pmWall1, pmWall1, null, pmWall1, pmWall1, pmWall1, pmWall1, pmWall1, pmWall1, pmWall1, null, pmWall1, pmWall1, pmWall1, pmWall1, pmWall1, pmWall1, pmWall1, null, pmWall1, pmWall1, pmWall1, pmWall1, pmWall1, pmWall1, pmWall1, null, pmWall1, null, pmWall1, null, pmWall1, null, pmWall1, null, null, pmWall1, null, pmWall1, null, pmWall1],
        [null, null, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, pmWall1, null, pmWall1, null, null, null, pmWall1, null, null, pmWall1, null, pmWall1],
        [null, null, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, pmWall1, null, pmWall1, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, pmWall1, null, pmWall1, pmWall1, pmWall1, null, null, pmWall1, null, pmWall1, null, pmWall1],
        [null, null, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, pmWall1, null, pmWall1, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, pmWall1, pmWall1, pmWall1, pmWall1, pmWall1, null, pmWall1, pmWall1, pmWall1, pmWall1, null, pmWall1],
        [null, null, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, pmWall1, null, pmWall1, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, null, null, null, null, null, null, null, pmWall1],
        [null, null, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, pmWall1, null, pmWall1, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, pmWall1, pmWall1, pmWall1, pmWall1, pmWall1, pmWall1, pmWall1, pmWall1, pmWall1, pmWall1, pmWall1, pmWall1, pmWall1],
        [null, null, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, pmWall1, null, pmWall1, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, pmWall1, null, pmWall1, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, pmWall1, null, pmWall1, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, pmWall1, null, pmWall1, null, null, null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, pmWall1, pmWall1, pmWall1, null, pmWall1, null, null, null, pmWall1, pmWall1, pmWall1, null, pmWall1, null, null, null, pmWall1, pmWall1, pmWall1, null, pmWall1, null, pmWall1, pmWall1, pmWall1, pmWall1, pmWall1, null, pmWall1, null, null, null, pmWall1, pmWall1, pmWall1, null, pmWall1, null, null, null, pmWall1, pmWall1, pmWall1, null, pmWall1, null, null, null, pmWall1, pmWall1, pmWall1, null, pmWall1, null, null, null, pmWall1, pmWall1, pmWall1, null, pmWall1, null, null, null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, pmWall1, null, null, null, null, pmWall1, null, null, pmWall1, null, null, null, null, pmWall1, null, null, pmWall1, null, null, null, null, pmWall1, null, null, null, null, null, null, null, pmWall1, null, null, pmWall1, null, null, null, null, pmWall1, null, null, pmWall1, null, null, null, null, pmWall1, null, null, pmWall1, null, null, null, null, pmWall1, null, null, pmWall1, null, null, null, null, pmWall1, null, null, null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, pmWall1, pmWall1, pmWall1, pmWall1, null, null, null, null, pmWall1, pmWall1, pmWall1, pmWall1, null, null, null, null, pmWall1, pmWall1, pmWall1, pmWall1, null, pmWall1, pmWall1, pmWall1, pmWall1, pmWall1, pmWall1, pmWall6, null, null, null, null, pmWall1, pmWall1, pmWall1, pmWall1, null, null, null, null, pmWall1, pmWall1, pmWall1, pmWall1, null, null, null, null, pmWall1, pmWall1, pmWall1, pmWall1, null, null, null, null, pmWall1, pmWall1, pmWall1, pmWall1, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
    ]);
    const sprites = [];
    const player = game.createPlayer(new game.Vector2(76.5, 12.5), Math.PI * 1.5);
    const isDev = window.location.hostname === "localhost";
    if (isDev) {
        const ws = new WebSocket("ws://localhost:6970");
        ws.addEventListener("message", async (event) => {
            if (event.data === "hot") {
                console.log("Hot reloading module");
                game = await import("./game.js?date=" + new Date().getTime());
            }
            else if (event.data === "cold") {
                window.location.reload();
            }
        });
    }
    const backImageData = new ImageData(SCREEN_WIDTH, SCREEN_HEIGHT);
    backImageData.data.fill(255);
    const backCanvas = new OffscreenCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
    const backCtx = backCanvas.getContext("2d");
    if (backCtx === null)
        throw new Error("2D context is not supported");
    backCtx.imageSmoothingEnabled = false;
    const display = {
        ctx,
        backCtx,
        backImageData,
        zBuffer: Array(SCREEN_WIDTH).fill(0),
    };
    window.addEventListener("keydown", (e) => {
        if (!musicPlaying) {
            musicPlaying = true;
            music.play();
        }
        if (!e.repeat) {
            switch (e.code) {
                case 'ArrowUp':
                case 'KeyW':
                    player.movingForward = true;
                    break;
                case 'ArrowDown':
                case 'KeyS':
                    player.movingBackward = true;
                    break;
                case 'ArrowLeft':
                case 'KeyA':
                    player.turningLeft = true;
                    break;
                case 'ArrowRight':
                case 'KeyD':
                    player.turningRight = true;
                    break;
            }
        }
    });
    window.addEventListener("keyup", (e) => {
        if (!e.repeat) {
            switch (e.code) {
                case 'ArrowUp':
                case 'KeyW':
                    player.movingForward = false;
                    break;
                case 'ArrowDown':
                case 'KeyS':
                    player.movingBackward = false;
                    break;
                case 'ArrowLeft':
                case 'KeyA':
                    player.turningLeft = false;
                    break;
                case 'ArrowRight':
                case 'KeyD':
                    player.turningRight = false;
                    break;
            }
        }
    });
    let prevTimestamp = 0;
    const frame = (timestamp) => {
        const deltaTime = (timestamp - prevTimestamp) / 1000;
        prevTimestamp = timestamp;
        game.renderGame(display, deltaTime, player, scene, sprites);
        window.requestAnimationFrame(frame);
    };
    window.requestAnimationFrame((timestamp) => {
        prevTimestamp = timestamp;
        window.requestAnimationFrame(frame);
    });
})();
//# sourceMappingURL=index.js.map