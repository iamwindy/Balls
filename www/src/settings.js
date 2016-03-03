/*jshint -W117*/
var musicVolume = 0;
var Settings_initialized = false;
var Settings = null;
var MusicButton;
var SFXButton;
var BackButton;
var title;
var sprite;
        var SettingsLayer = cc.Layer.extend({
            sprite:null,
            ctor:function () {
                cc.log("settings loading started");
                this._super();
                var parent = this;
                var size = cc.winSize;
                
                sprite = new cc.Sprite(asset.Menu_bg_red_png);
                sprite.setTag(2);
                sprite.attr({
                    x: size.width / 2,
                    y: size.height / 2,
                     
                
                });
                this.addChild(sprite,0);
                
                
                title = new cc.Sprite(asset.Balls_png);
                title.attr({
                    x: size.width/2,
                    y: size.height-90,
                });
                this.addChild(title,5);
                
                cc.audioEngine.setMusicVolume(musicVolume);
                //var musicLabel = new cc.LabelTTF("music", "Arial", 24);
                //var sfxLabel = new cc.LabelTTF("sound effects","Arial",24);
                var isMusicEnabledLabel = new cc.MenuItemFont.create("music");
                var isSFXenabledLabel = new cc.MenuItemFont.create("sound effects");
                isMusicEnabledLabel.setFontSize(36);
                isSFXenabledLabel.setFontSize(36);
                
                /*
                var exit_game = new cc.MenuItemFont.create("Back",function(){
                    cc.log("Back");
                    Settings_initialized = false;
                    var timeToPop = 0.5;
                    var nodeAction = new cc.FadeOut(timeToPop);
                    var nodeAction2 = new cc.FadeOut(timeToPop);
                    var nodeAction3 = new cc.FadeOut(timeToPop);
                    var nodeAction4 = new cc.FadeOut(timeToPop);
                    var nodeAction5 = new cc.FadeOut(timeToPop);
                    SFXButton.runAction(nodeAction5);
                    MusicButton.runAction(nodeAction4);
                    title.runAction(nodeAction3);
                    sprite.runAction(nodeAction2);
                    Settings.runAction(nodeAction);
                    window.isPopped = true;
                    
                    cc.log(cc.director.getRunningScene());
                    this.scheduleOnce(popFade,timeToPop);
                    
                    
                }.bind(this));
                */
                //isMusicEnabledLabel.setAnchorPoint(cc.p(0,0.5));
                //isSFXenabledLabel.setAnchorPoint(cc.p(0,0.5));
                isMusicEnabledLabel.setPosition(new cc.Point(size.width/8*3,size.height/2));
                isSFXenabledLabel.setPosition(new cc.Point(size.width/8*3,size.height/3));
                cc.log(isMusicEnabledLabel.getAnchorPoint());
                //isMusicEnabledLabel.anchorPoint = 0;
                //isSFXenabledLabel._setAnchorX=0;
                //exit_game.setPosition(new cc.Point(size.width/2,size.height/10*2));
                
                
                
                
                MusicButton = new ccui.CheckBox();
                MusicButton.loadTextures(asset.checkbox_off,asset.checkbox_pressed,asset.checkbox_on);
                MusicButton.x=size.width*1.8;
                MusicButton.y = size.height/2;
                if(window.music_enabled){
                     MusicButton.setSelectedState(true);
                }else{
                    
                    MusicButton.setSelectedState(false);   
                }
                
                SFXButton = new ccui.CheckBox();
                SFXButton.loadTextures(asset.checkbox_off,asset.checkbox_pressed,asset.checkbox_on);
                SFXButton.x=size.width*1.8;
                SFXButton.y = size.height/3;
                if(window.sound_enabled){
                     SFXButton.setSelectedState(true);
                }else{
                    
                    SFXButton.setSelectedState(false);   
                }
                
                BackButton = new ccui.Button();
                BackButton.scale = 0.5;
                BackButton.loadTextures( asset.back_button, asset.back_button );
                BackButton.setPosition(cc.p(size.width*0.8,45));
                
                //MusicButton.setPosition(size.width/2,size.height/2);
                MusicButton.addTouchEventListener(this.touchEvent, this);
                this.addChild(MusicButton);
                SFXButton.addTouchEventListener(this.touchEvent2, this);
                this.addChild(SFXButton);
                BackButton.addTouchEventListener(this.touchEventBack, this);
                this.addChild(BackButton);
                
                Settings = new cc.Menu(isMusicEnabledLabel,isSFXenabledLabel/*,exit_game*/);
                Settings.setPosition(cc.p(size.width,0));
                this.addChild(Settings);
                var move_in_from_right = new cc.EaseExponentialOut(new cc.MoveTo(1,cc.p(0,0)));
                var delay_Settings = new cc.DelayTime(0.25);
                var Settings_seq = new cc.Sequence(delay_Settings,move_in_from_right);
                Settings.runAction(Settings_seq);
                var move_in_from_right2 = new cc.EaseExponentialOut(new cc.MoveTo(1,cc.p(size.width*0.8,size.height/2)));
                var delay_Settings2 = new cc.DelayTime(0.5);
                var Settings_seq2 = new cc.Sequence(delay_Settings2,move_in_from_right2);
                var move_in_from_right3 = new cc.EaseExponentialOut(new cc.MoveTo(1,cc.p(size.width*0.8,size.height/3)));
                var delay_Settings3 = new cc.DelayTime(0.5);
                var Settings_seq3 = new cc.Sequence(delay_Settings3,move_in_from_right3);
                MusicButton.runAction(Settings_seq2);
                SFXButton.runAction(Settings_seq3);
						
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

            },touchEvent: function(sender, type){
                    switch(type){
                        case ccui.CheckBox.EVENT_SELECTED:
                            cc.log("sender "+sender);
                            cc.log("selected" + type);
                            cc.log("state: " + MusicButton.getSelectedState());
                            if(MusicButton.getSelectedState()){
                                //cc.audioEngine.pauseMusic();
                                this.schedule(fadeOutMusic,0.1);
                                window.music_enabled = 0;
                            }else{
                                //cc.audioEngine.resumeMusic();
                                //cc.audioEngine.playMusic(asset.Bg_music,true);
                                this.schedule(fadeInMusic,0.1);
                                window.music_enabled = 1;
                            }
                            break;
                        default:
                            break;
                    }
                },touchEvent2: function(sender, type){
                    switch(type){
                        case ccui.CheckBox.EVENT_SELECTED:
                            cc.log("sender "+sender);
                            cc.log("selected " + type);
                            cc.log("state: " + SFXButton.getSelectedState());
                            if(SFXButton.getSelectedState()){
                                cc.audioEngine.setEffectsVolume(0);
                                window.sound_enabled = 0;
                            }else{
                                cc.audioEngine.setEffectsVolume(1);
                                window.sound_enabled = 1;
                            }
                            break;
                        default:
                            break;
                    }
                },touchEventBack: function(sender,type){
                    switch(type){
                        case ccui.Widget.TOUCH_BEGAN:
                            cc.log("back button pressed");
                            BackButton.scale = 0.65;
                            BackButton.setPosition(cc.p(cc.winSize.width*0.8,59));
                            break;

                        case ccui.Widget.TOUCH_MOVED:
                            // code to handle when the user is moving their finger/cursor whilst clicking the button

                            break;

                        case ccui.Widget.TOUCH_ENDED:
                            // code to handle when the button click has ended (e.g. finger is lifted off the screen)        
                            cc.log("back button released");
                            BackButton.setPosition(cc.p(cc.winSize.width*0.8,45));
                            BackButton.scale = 0.5;
                            
                            
                            cc.log("Back");
                            Settings_initialized = false;
                            var timeToPop = 0.5;
                            var nodeAction = new cc.FadeOut(timeToPop);
                            var nodeAction2 = new cc.FadeOut(timeToPop);
                            var nodeAction3 = new cc.FadeOut(timeToPop);
                            var nodeAction4 = new cc.FadeOut(timeToPop);
                            var nodeAction5 = new cc.FadeOut(timeToPop);
                            var nodeAction6 = new cc.FadeOut(timeToPop);
                            BackButton.runAction(nodeAction6);
                            SFXButton.runAction(nodeAction5);
                            MusicButton.runAction(nodeAction4);
                            title.runAction(nodeAction3);
                            sprite.runAction(nodeAction2);
                            Settings.runAction(nodeAction);
                            window.isPopped = true;

                            cc.log(cc.director.getRunningScene());
                            cc.audioEngine.playEffect(asset.menu_back);
                            this.scheduleOnce(popFade,timeToPop);
                            
                            break;

                        case ccui.Widget.TOUCH_CANCELLED:
                            // code to handle when the button click has been cancelled,  this is usually handled the same way as ENDED in most applications (e.g. another application takes control of the device)

                            break;   
                    }
                }
            
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
                cc.log(cc.director.getRunningScene());
            }
        });

