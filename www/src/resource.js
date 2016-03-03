var asset = {
    HelloWorld_png : "asset/HelloWorld.jpg",
    CloseNormal_png : "asset/CloseNormal.png",
    CloseSelected_png : "asset/CloseSelected.png",
    Menu_bg_png: "asset/background.png",
    Menu_bg_red_png: "asset/background_red.png",
    LoaderImg_png: "asset/loader_img.png",
    Balls_png: "asset/balls.png",
    Bg_music: "asset/energy_drink_bg.mp3",
    Game_Start: "asset/button_sounds/game-start.ogg"
};

var g_resources = [];
for (var i in asset) {
    g_resources.push(asset[i]);
}
