class DrumKit{
  constructor(){
    this.pads = document.querySelectorAll(".pad")
    this.currentKick = "./sounds/kick-classic.wav";
    this.currentSnare = "./sounds/snare-acoustic01.wav";
    this.currentHihat = "./sounds/hihat.acoustic01.wav";
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    this.playbtn = document.querySelector(".play");
    this.mutebtns = document.querySelectorAll(".mute")
    this.select = document.querySelectorAll("select")
    this.tempo = document.querySelector(".tempo-slider")
    this.index = 0;
    this.bpm = 150;
    this.isPlaying = null;
  }
  start(){
      const interval = (60/this.bpm)*1000;
      if(this.isPlaying){
        clearInterval(this.isPlaying);
        this.isPlaying = null;
      }
      else{
        this.isPlaying = setInterval(()=>{
          this.repeat();
        }, interval);
      }
      
  }

  repeat(){
    const step = this.index % 8;
    const bars = document.querySelectorAll(`.b${step}`);

    bars.forEach((bar)=>{
        bar.style.animation = 'none';
        bar.offsetWidth;
        bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
        if (bar.classList.contains("active")){
          if (bar.classList.contains("kick-pad")) {
            this.kickAudio.currentTime = 0;
            this.kickAudio.play();
          }
          if (bar.classList.contains("snare-pad")) {
            this.snareAudio.currentTime = 0;
            this.snareAudio.play();
          }
          if (bar.classList.contains("hihat-pad")) {
            this.hihatAudio.currentTime = 0;
            this.hihatAudio.play();
          }
        }
    });
    this.index++;
  }

  activepad(){
    this.classList.toggle("active")
  }

  updateBtn(){
    if (!this.isPlaying){
      this.playbtn.innerText = "Pause"
      this.playbtn.classList.add("active");
    }
    else{
      this.playbtn.innerText = "Play"
      this.playbtn.classList.remove("active");
    }
  }

  mute(e){
    const target = e.target.getAttribute("data-track");
    e.target.classList.toggle("active");
    if (e.target.classList.contains("active")){
      switch(target){
        case "0":
          this.kickAudio.volume = 0;
          break;
        case "1":
          this.snareAudio.volume = 0;
          break;
        case "2":
          this.hihatAudio.volume = 0;
          break;
      }
    }
    else{
      switch(target){
        case "0":
          this.kickAudio.volume = 1;
          break;
        case "1":
          this.snareAudio.volume = 1;
          break;
        case "2":
          this.hihatAudio.volume = 1;
          break;
      }
    }
  }
  selector(e){
    const name = e.target.name;
    const value = e.target.value;

    if (name === "kick-select"){
      this.kickAudio.src = value;
    }
    else if (name === "snare-select"){
      this.snareAudio.src = value;
    }
    else{
      this.hihatAudio.src = value;
    }
  }
  changeTempo(e){
    this.bpm = e.target.value;
    clearInterval(this.isPlaying);
    this.isPlaying = null;
    const play = document.querySelector(".play");
    if (play.classList.contains("active")){
      this.start();
    }
  }
  updateTempo(e){
    const val = document.querySelector(".tempoval");
    const value = e.target.value;

    val.innerText = value;
  }
}

const drumKit = new DrumKit();

drumKit.pads.forEach(pad =>{
  pad.addEventListener('click', drumKit.activepad);
});

drumKit.playbtn.addEventListener('click',function(){
  drumKit.updateBtn();
  drumKit.start();
});

drumKit.mutebtns.forEach(muti =>{
  muti.addEventListener("click" , function(e){
    drumKit.mute(e);
  });
});

drumKit.select.forEach(selecti =>{
  selecti.addEventListener('click', function(e){
    drumKit.selector(e);
  });
} );

drumKit.tempo.addEventListener("input", function(e){
  drumKit.updateTempo(e);
});
drumKit.tempo.addEventListener("change", function(e){
  drumKit.changeTempo(e);
});