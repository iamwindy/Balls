/*jshint -W117*/
var musicVolume = 0;
var Menu_initialized = false;
var menu = null;
var layer;
        var MenuLayer = cc.Layer.extend({
            sprite:null,
            title: null,
            ctor:function () {
                cc.log("menu loading started");
                //////////////////////////////
                // 1. super init first
                this._super();
                
                var parent = this;
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
                
                title = new cc.Sprite(asset.Balls_png);
                title.attr({
                    x: size.width/2,
                    y: size.height/2,
                    scale: 0
                });
                this.addChild(title,5);
                var move_title_up_time = 0.5;
                var scale_title_up_time = 0.5;
                var delay_time = 1;
                var total_title_animation = move_title_up_time + scale_title_up_time + delay_time;
                var move_title_up = new cc.MoveTo.create(move_title_up_time,cc.p(size.width/2,size.height-90));
                var scale_title_up = new cc.ScaleTo.create(scale_title_up_time,1,1);
                var delay = new cc.DelayTime(delay_time);
                //var animation1 = new cc.Animation.create(0,5);
                
                var seq = new cc.Sequence(scale_title_up,delay,move_title_up);
                title.runAction(seq);
                if(window.music_enabled){
                    musicVolume = 1;    
                }else{
                    musicVolume = 0;
                }
                
                cc.audioEngine.setMusicVolume(musicVolume);
                //cc.audioEngine.playMusic(asset.Bg_music,true);
                
                //cc.audioEngine.setMusicVolume(num);
                
                //this.schedule(fadeInMusic,0.1);
                
                
                cc.log("is music playing? " + cc.audioEngine.isMusicPlaying());
                var menu_play = new cc.MenuItemFont.create("Play",function(){
                    cc.log("Play");
                    var action_fadeout = new cc.FadeOut.create(2.5);
                    this.runAction(action_fadeout);
                    this.schedule(fadeOutMusic,0.1);
                    cc.audioEngine.stopMusic();
                    var delay = new cc.DelayTime(0.5);
                    var playsound = new cc.CallFunc(function(){
                        cc.audioEngine.playEffect(asset.Game_start,false);
                    });
                    //var playsound = new cc.audioEngine.playEffect(asset.Game_start,false);
                    var sequence = new cc.Sequence(delay,playsound);
                    this.runAction(sequence);
                    //cc.director.pushScene(new cc.TransitionFade(0.5,new MenuScene()) );
                }.bind(this));
                var high_score = new cc.MenuItemFont.create("Highscores",function(){
                    cc.log("highscore");
                    cc.audioEngine.playEffect(asset.item_selected);
                    //this.schedule(fadeOutMusic,0.1);
                }.bind(this));
                var menu_settings = new cc.MenuItemFont.create("Settings",function(){
                    cc.log("settings");
                    cc.audioEngine.playEffect(asset.item_selected);
                    cc.director.pushScene(new cc.TransitionFade(0.5,new SettingsScene()) );
                });
                var exit_game = new cc.MenuItemFont.create("Exit",function(){
                    cc.director.end();
                });
                
                menu_play.setPosition(new cc.Point(size.width/2,size.height/10*5));
                high_score.setPosition(new cc.Point(size.width/2,size.height/10*4));
                menu_settings.setPosition(new cc.Point(size.width/2,size.height/10*3));
                exit_game.setPosition(new cc.Point(size.width/2,size.height/10*2));
                //menu_play.setColor(new cc.color(255,0,0,255));
                
                /*
                var menuItem1 = new cc.MenuItemFont.create("Play Sound",this);
                var menuItem2 = new cc.MenuItemFont.create("Play Song",this);
                var menuItem3 = new cc.MenuItemFont.create("Stop Playing Song",this);
                var menuItem4 = new cc.MenuItemFont.create("Exit",this);

                menuItem1.setPosition(new cc.Point(size.width/2,size.height/2+50));
                menuItem2.setPosition(new cc.Point(size.width/2,size.height/2));
                menuItem3.setPosition(new cc.Point(size.width/2,size.height/2-50));
                menuItem4.setPosition(new cc.Point(size.width/2,size.height/2-100));
                */
                menu = new cc.Menu(menu_play,high_score,menu_settings,exit_game);
                menu.setPosition(cc.p(size.width,0));
                this.addChild(menu);
                var move_in_from_right = new cc.EaseExponentialOut(new cc.MoveTo(1,cc.p(0,0)));
                var delay_menu = new cc.DelayTime(total_title_animation-0.25);
                var menu_seq = new cc.Sequence(delay_menu,move_in_from_right);
                menu.runAction(menu_seq);
                
                
                cc.eventManager.addListener({
                    event: cc.EventListener.TOUCH_ONE_BY_ONE,
                    onTouchBegan:function(touch,event){
                        //cc.log("Began X: "+touch.getLocationX()+"Y: "+touch.getLocationY());
                        return true;
                    },
                    onTouchMoved:function(touch,event){
                        //cc.log("Moved X: "+touch.getLocationX()+"Y: "+touch.getLocationY());
                        
                    },
                    onTouchEnded:function(touch,event){
                        //cc.log("Ended X: "+touch.getLocationX()+"Y: "+touch.getLocationY());
                        return true;
                    },
                    onTouchCancelled:function(touch, event){
                        //cc.log("Cancelled X: "+touch.getLocationX()+"Y: "+touch.getLocationY());
                    }
                },this);
                //this.scheduleOnce(stopMusic,30);
                
                cc.log("menu loading finished");
                return true;

            },fadeInAfterPop:function(){
                cc.log("after pop");
                var backgroundLayer = new cc.LayerColor.create();
                backgroundLayer.changeWidthAndHeight(cc.winSize.width, cc.winSize.height);
                backgroundLayer.setColor(cc.color(0, 0, 0,255));
                this.addChild(backgroundLayer,100);
                var nodeAction = new cc.FadeOut( 0.5 );
                backgroundLayer.runAction(nodeAction);
                
            }
            /*play:function(){
                cc.log("Play");
                var action_fadeout = new cc.FadeOut.create(2.5);
                menu.runAction(action_fadeout);
                cc.director.runScene(new cc.TransitionFade(0.5,new MenuScene()) );
                
                //this.removeChildByTag(1,true);
            }*/
        });
        /*
        var play=function(parent){
            cc.log("Play");
            var action_fadeout = new cc.FadeOut.create(2.5);
            menu.runAction(action_fadeout);
            parent.schedule(fadeOutMusic,0,1);
            cc.audioEngine.stopMusic();
            //this.schedule(fadeOutMusic,0,1);
            cc.director.pushScene(new cc.TransitionFade(0.5,new MenuScene()) );
        };
        */

        var highscore=function(){
            cc.log("HighScore");
            
        };

        var settings = function(){
            cc.log("Settings");
            
        };

        var exit=function(){
            cc.log("Exit");
            cc.log("Menu Initialized before pop: "+Menu_initialized);
            Menu_initialized = false;
            cc.log("Menu Initialized after pop: "+Menu_initialized);
            cc.director.popScene();
            
        };

        var fadeInMusic = function(){
            //cc.log(cc.audioEngine.isMusicPlaying());
            if(!cc.audioEngine.isMusicPlaying()){
                cc.audioEngine.resumeMusic();
            }
            
            cc.audioEngine.setMusicVolume(musicVolume);
            cc.log(musicVolume);
            musicVolume+=0.2;
            if(musicVolume>=1.0){
                musicVolume = 1;
                cc.audioEngine.setMusicVolume(musicVolume);
                this.unschedule(fadeInMusic);

            }

        };
        var fadeOutMusic = function(){
            
            cc.audioEngine.setMusicVolume(musicVolume);
            cc.log(musicVolume);
            musicVolume-=0.2;
            if(musicVolume<=0){
                musicVolume = 0;
                cc.audioEngine.setMusicVolume(musicVolume);
                cc.audioEngine.pauseMusic();
                    
                this.unschedule(fadeOutMusic);
            }

        };

        

        var stopMusic = function(){
          cc.audioEngine.stopMusic();  
        };

        var MenuScene = cc.Scene.extend({
            onEnter:function () {
                this._super();
                
                if(Menu_initialized===false){
                    Menu_initialized = true;
                    cc.log("Menu Initialized: "+Menu_initialized );
                    layer = new MenuLayer();

                    this.addChild(layer);    
                }
                if(window.isPopped){
                    window.isPopped = !window.isPopped;
                    layer.fadeInAfterPop();
                }
                cc.log(cc.director.getRunningScene());
                
            }
        });

