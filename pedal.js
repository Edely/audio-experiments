;(function(global, $){
    
    //cria o contexto de áudio
    var ctx = new AudioContext();

    //cria oscillator e liga ao destination
    var osc1 = ctx.createOscillator();
    var osc1Gain = ctx.createGain();
    osc1.connect(osc1Gain);
    osc1.frequency.value = 220;
    osc1.start();
    osc1Gain.gain.value = 0.5;

    var osc2 = ctx.createOscillator();
    var osc2Gain = ctx.createGain();
    osc2.connect(osc2Gain);
    osc2.frequency.value = 261.63;
    osc2.start();
    osc2Gain.gain.value = 0.5;

    var osc3 = ctx.createOscillator();
    var osc3Gain = ctx.createGain();
    osc3.connect(osc3Gain);
    osc3.frequency.value = 329.63;
    osc3.start();
    osc3Gain.gain.value = 0.5;

    
    var mainGain = ctx.createGain();
    osc1Gain.connect(mainGain);
    osc2Gain.connect(mainGain);
    osc3Gain.connect(mainGain);
    mainGain.gain.value = 0;
    mainGain.connect(ctx.destination);
    
    // 'new' Pedal
    var pedalBoard = function(effectName){
        return new pedalBoard.init(effectName); 
    }

    // prototype holds methods (to save memory space)
    pedalBoard.prototype = {

        // 'this' refers to the 
        infoPedal: function(){            
            console.log(this);
            return this;
        },

        choosePedal: function(typePedal){

            switch( typePedal ){    
                case 'OverDrive': 
                    if( !ctx.overDrive ){
                        ctx.overDrive = 'OverDrive';
                    }else{
                        throw('OverDrive already connected');
                    }                         
                break;
                case 'Delay':                
                    if( !ctx.delay ){
                        ctx.delay = 'Delay';
                    }else{
                        throw('Delay already connected');
                    }
                    
                break;
                default:
                    if( !ctx.booster ){
                        ctx.booster = 'Booster';
                    }else{
                        throw('Booster already connected');
                    }
    
            }

            
        }

    }

    // the actual object is created here, allowing us to 'new' an object without calling 'new'
    pedalBoard.init = function(pedalBoardName){
        var self = this;
        self.pedalBoardName = pedalBoardName;        
        console.log('Pedal Board '+ self.pedalBoardName  +' created.');
    }
    
    // trick borrowed from jQuery so we don't have to use the 'new' keyword
    pedalBoard.init.prototype = pedalBoard.prototype;

    // attach our Pedal to the global object, and provide a shorthand '$P'
    ctx.pedalBoard = pedalBoard;

    //coloca o contexto de áudio, oscillator e gains no escopo global
    global.ctx = ctx;
    global.osc1 = osc1;
    global.osc1Gain = osc1Gain;
    global.osc2 = osc2;
    global.osc2Gain = osc2Gain;
    global.osc3 = osc3;
    global.osc3Gain = osc3Gain;
    global.mainGain = mainGain;

}(window, jQuery));