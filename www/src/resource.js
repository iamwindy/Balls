var asset = {
    HelloWorld_png : "asset/HelloWorld.jpg",
    CloseNormal_png : "asset/CloseNormal.png",
    CloseSelected_png : "asset/CloseSelected.png",
    Menu_bg_png: "asset/background.png",
    Menu_bg_red_png: "asset/background_red.png",
    LoaderImg_png: "asset/loader_img.png",
    Balls_png: "asset/balls.png",
    Bg_music: "asset/energy_drink_bg.mp3",
    Game_start: "asset/button_sounds/game-start.ogg",
    checkbox_off: "asset/icons/checkbox_off.png",
    checkbox_pressed: "asset/icons/checkbox_pressed.png",
    checkbox_on: "asset/icons/checkbox_on.png",
    back_button: "asset/icons/back_button_new_square-01.png",
    start_sound: "asset/button_sounds/alert_2.mp3",
    menu_back: "asset/button_sounds/menu_back_1.mp3",
    item_selected: "asset/button_sounds/beep_1.wav",
    
    
};

var g_resources = [];
for (var i in asset) {
    g_resources.push(asset[i]);
}
