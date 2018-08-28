var pedal = ctx.pedalBoard("Rock'n'Roll", "#pedalBoard");

var mG = document.getElementById('mainGain');

var buttonTypes = document.querySelectorAll('[data-osc-type]');
//console.log(buttonTypes);

buttonTypes.forEach(function(ele){
    ele.addEventListener('click', function(){
        var typeOsc = this.getAttribute('data-osc-type');        
        console.log(typeOsc);
        console.log(pedal.oscillators);
    });
});

mG.addEventListener('input', function(){
    mainGain.gain.value = this.value;
});

