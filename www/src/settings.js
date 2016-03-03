/*jshint -W117*/
var musicVolume = 0;
var Settings_initialized = false;
var Settings = null;
        var SettingsLayer = cc.Layer.extend({
            sprite:null,
            ctor:function () {
                cc.log("settings loading started");
                //////////////////////////////
                // 1. super init first
                this._super();
                var parent = this;
                var size = cc.winSize;
                
                var sprite = new cc.Sprite(asset.Menu_bg_red_png);
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
                
                cc.audioEngine.setMusicVolume(musicVolume);
                
                //cc.audioEngine.setMusicVolume(num);
                
                this.schedule(fadeInMusic,0.1);
                
                var Settings_play = new cc.MenuItemFont.create("Play",function(){
                    cc.log("Play");
                    var action_fadeout = new cc.FadeOut.create(2.5);
                    this.runAction(action_fadeout);
                    this.schedule(fadeOutMusic,0.1);
                    cc.audioEngine.stopMusic();
                    musicVolume = 0;
                    cc.director.pushScene(new cc.TransitionFade(0.5,new SettingsScene()) );
                }.bind(this));
                var high_score = new cc.MenuItemFont.create("Highscores",function(){
                    cc.log("fadeout starting");
                    this.schedule(fadeOutMusic,0.1);
                }.bind(this));
                var Settings_settings = new cc.MenuItemFont.create("Settings",function(){
                    cc.log("fadein starting");
                    parent.schedule(fadeInMusic,0.1);
                });
                var exit_game = new cc.MenuItemFont.create("Back",function(){
                    cc.log("Back");
                    Settings_initialized = false;
                    //cc.director.popScene();
                    //cc.director.runScene(new cc.TransitionFade(0.5, cc.director.popSceneBack()));
                    var nodeAction = new cc.FadeOut( 0.5 );
                    var nodeAction2 = new cc.FadeOut(0.5);
                    var nodeAction3 = new cc.FadeOut(0.5);
                    //this.runAction( nodeAction );
                    title.runAction(nodeAction3);
                    sprite.runAction(nodeAction2);
                    Settings.runAction(nodeAction);
                    //this.removeAllChildren();
                    window.isPopped = true;
                    /*var move_in_from_right = new cc.EaseExponentialOut(new cc.MoveTo(1,cc.p(0,0)));
                var delay_Settings = new cc.DelayTime(total_title_animation-0.25);
                var Settings_seq = new cc.Sequence(delay_Settings,move_in_from_right);
                Settings.runAction(Settings_seq);
                    
                    */
                    
                    
                    cc.log(cc.director.getRunningScene());
                    this.scheduleOnce(popFade,0.5);
                    
                    
                    //cc.director.pushScene(new cc.TransitionFade(0.5,new SettingsScene()) );
                }.bind(this));
                
                Settings_play.setPosition(new cc.Point(size.width/2,size.height/10*5));
                high_score.setPosition(new cc.Point(size.width/2,size.height/10*4));
                Settings_settings.setPosition(new cc.Point(size.width/2,size.height/10*3));
                exit_game.setPosition(new cc.Point(size.width/2,size.height/10*2));
                //Settings_play.setColor(new cc.color(255,0,0,255));
                
                /*
                var SettingsItem1 = new cc.MenuItemFont.create("Play Sound",this);
                var SettingsItem2 = new cc.MenuItemFont.create("Play Song",this);
                var SettingsItem3 = new cc.MenuItemFont.create("Stop Playing Song",this);
                var SettingsItem4 = new cc.MenuItemFont.create("Exit",this);

                SettingsItem1.setPosition(new cc.Point(size.width/2,size.height/2+50));
                SettingsItem2.setPosition(new cc.Point(size.width/2,size.height/2));
                SettingsItem3.setPosition(new cc.Point(size.width/2,size.height/2-50));
                SettingsItem4.setPosition(new cc.Point(size.width/2,size.height/2-100));
                */
                Settings = new cc.Menu(Settings_play,high_score,Settings_settings,exit_game);
                Settings.setPosition(cc.p(size.width,0));
                this.addChild(Settings);
                var move_in_from_right = new cc.EaseExponentialOut(new cc.MoveTo(1,cc.p(0,0)));
                var delay_Settings = new cc.DelayTime(total_title_animation-0.25);
                var Settings_seq = new cc.Sequence(delay_Settings,move_in_from_right);
                Settings.runAction(Settings_seq);
                
						
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
                
                cc.log("settings loading finished");
                return true;

            },
            
        });
        
        var popFade=function(){
            cc.director.popScene();
        };
        var highscore=function(){
            cc.log("HighScore");
            
        };

        var settings = function(){
            cc.log("Settings");
            
        };

        var exit=function(){
            cc.log("Back");
            cc.log("Settings Initialized before pop: "+Settings_initialized);
            Settings_initialized = false;
            cc.log("Settings Initialized after pop: "+Settings_initialized);
            cc.director.popScene();
            //cc.director.pushScene(new cc.TransitionFade(0.5,new SettingsScene()) );
        };


        var SettingsScene = cc.Scene.extend({
            onEnter:function () {
                this._super();
                if(Settings_initialized===false){
                    Settings_initialized = true;
                    cc.log("Settings Initialized: "+Settings_initialized );
                    var layer = new SettingsLayer();
                    
                    this.addChild(layer);    
                }
                
            }
        });

