/*jshint -W117*/
        
    

var SplashLayer = cc.Layer.extend({
            sprite:null,
            ctor:function () {
                cc.log("splash loading starting");
                this._super();
                var size = cc.winSize;
                var s = size;
                
                
                var backgroundLayer = new cc.LayerColor.create();
                backgroundLayer.changeWidthAndHeight(cc.winSize.width, cc.winSize.height);
                backgroundLayer.setColor(cc.color(0, 0, 0,255));
                backgroundLayer.setTag(1);
                this.addChild(backgroundLayer,1);
                
                

                /*
                var sprite = new cc.Sprite(asset.Menu_bg_png);
                sprite.setTag(2);
                sprite.attr({
                    x: size.width / 2,
                    y: size.height / 2,
                     
                
                });
                this.addChild(sprite,0);
                */
                //var action_hide = cc.Hide.create();
                //sprite.runAction(action_hide);
                
                //var delay = cc.DelayTime(1.0);
        
                //var action = new cc.FadeTo.create(2.0,0);
                //backgroundLayer.runAction(seq);
                
                var helloLabel = new cc.LabelTTF("WindyCorp\nProductions", "Arial", 48);
                helloLabel.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
                helloLabel.setColor(cc.color(255,255,255,255));
                helloLabel.x = size.width / 2;
                helloLabel.y = size.height /2;
                this.addChild(helloLabel,5);
                this.scheduleOnce(this.animate,3);
                cc.log("splash loading finished");
                
                return true;
            },
            animate:function(){
                var action_fadeout = new cc.FadeOut.create(2.5);
                //var delay = new cc.DelayTime(4);
                //var action_fadein = new cc.FadeIn.create(1);
                this.getChildByTag(1).runAction(action_fadeout);
                //this.getChildByTag(2).runAction(action_fadein);
                cc.director.runScene(new cc.TransitionFade(0.5,new MenuScene()) );
                
                //this.removeChildByTag(1,true);
            }
        });


var SplashScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
       
        var layer = new SplashLayer();
        this.addChild(layer);
    }
});