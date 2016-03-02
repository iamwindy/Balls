var asset = {
    HelloWorld_png : "asset/HelloWorld.jpg",
    CloseNormal_png : "asset/CloseNormal.png",
    CloseSelected_png : "asset/CloseSelected.png",
    Menu_bg_png: "asset/background.png",
    LoaderImg_png: "asset/loader_img.png",
    Balls_png: "asset/balls.png"
};

var g_resources = [];
for (var i in asset) {
    g_resources.push(asset[i]);
}
