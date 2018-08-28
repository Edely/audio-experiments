var pedal = ctx.pedalBoard("Rock'n'Roll");


var mG = document.getElementById('mainGain');

mG.addEventListener('input', function(){
    mainGain.gain.value = this.value;
});