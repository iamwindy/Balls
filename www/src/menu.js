/*jshint -W117*/
        var MenuLayer = cc.Layer.extend({
            sprite:null,
            ctor:function () {
                cc.log("menu loading started");
                //////////////////////////////
                // 1. super init first
                this._super();
                var size = cc.winSize;
                
                var sprite = new cc.Sprite(asset.Menu_bg_png);
                sprite.setTag(2);
                sprite.attr({
                    x: size.width / 2,
                    y: size.height / 2,
                     
                
                });
                this.addChild(sprite,0);

                /*
                var helloLabel = new cc.LabelTTF("Balls!", "Arial", 70);
                helloLabel.setColor(cc.color(255,255,0,255));
                // position the label on the center of the screen
                helloLabel.x = size.width / 2;
                helloLabel.y = size.height*0.9;
                // add the label as a child to this layer
                this.addChild(helloLabel, 5);
                */
                
                var title = new cc.Sprite(asset.Balls_png);
                title.attr({
                    x: size.width/2,
                    y: size.height/2,
                    scale: 0
                });
                this.addChild(title,5);
                var move_title_up = new cc.MoveTo.create(0.5,cc.p(size.width/2,size.height-90));
                var scale_title_up = new cc.ScaleTo.create(0.5,1,1);
                var delay = new cc.DelayTime(1);
                var animation1 = new cc.Animation.create(0,5);
                var seq = new cc.Sequence(scale_title_up,delay,move_title_up);
                //title.runAction(scale_title_up);
                //title.runAction(cc.animate(animation1));
                //title.runAction(move_title_up);
                title.runAction(seq);
                cc.log("menu loading finished");
                return true

            }
        });

        var MenuScene = cc.Scene.extend({
            onEnter:function () {
                this._super();
                var layer = new MenuLayer();
                this.addChild(layer);
            }
        });

