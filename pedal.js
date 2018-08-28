;(function(global, $){
    
    
    //cria o contexto de áudio
    var ctx = new AudioContext();
  
    //cria oscillator e liga ao destination    
    
    // var osc1 = ctx.createOscillator();
    // var osc1Gain = ctx.createGain();
    // osc1.connect(osc1Gain);
    // osc1.frequency.value = 220;
    // osc1.start();
    // osc1Gain.gain.value = 0.5;
    // osc1Gain.connect(mainGain);
    
    var mainGain = ctx.createGain();
    
    
    mainGain.gain.value = 0;
    mainGain.connect(ctx.destination);
    
    // 'new' Pedal
    var pedalBoard = function(effectName, element){
        return new pedalBoard.init(effectName, element); 
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
    pedalBoard.init = function(pedalBoardName, element){

        var self = this;
        self.pedalBoardName = pedalBoardName;        
        console.log('Pedal Board '+ self.pedalBoardName  +' created.');

        // create oscillators
        var oscillators = {};
        self.oscillators = oscillators;

        if($(element).length > 0){
            console.log( $(element) );
        }
        
        for(var i = 0; i <= 2; i++){
            oscillators['osc' + i] = ctx.createOscillator(); 
            oscillators['osc' + i].connect(mainGain);      
            oscillators['osc' + i].start();
            switch( i ){
                case 0:
                    oscillators['osc' + i].frequency.value = 220; 
                    break;
                case 1:
                    oscillators['osc' + i].frequency.value = 261.63; 
                    break;
                default:
                    oscillators['osc' + i].frequency.value = 329.63; 
                    break;                    
            }                   
           
        }       

    }

    

    // console.log(pedalBordoscillators);
    // trick borrowed from jQuery so we don't have to use the 'new' keyword
    pedalBoard.init.prototype = pedalBoard.prototype;

    // attach our Pedal to the global object, and provide a shorthand '$P'
    ctx.pedalBoard = pedalBoard;

    //coloca o contexto de áudio, oscillator e gains no escopo global
    global.ctx = ctx;
    global.mainGain = mainGain;
    
}(window, jQuery));