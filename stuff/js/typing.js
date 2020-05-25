export default class Pause extends Phaser.Scene {
    constructor(){
        super({key: 'typing'});
    }

    init (data){
        this.lock = data.lock;
        this.dif = data.dif;
    }

    preload(){
        this.load.image('long_sign', './stuff/img/Assets/Sprites/longwoodframe.png');
        this.load.audio('transition', './stuff/img/Assets/Sounds/Sound_FX/choose_menu_general_sound_3.mp3');
        this.load.audio('error', './stuff/img/Assets/Sounds/Sound_FX/error.mp3');
        this.load.audio('correct', './stuff/img/Assets/Sounds/Sound_FX/correct.mp3');
    }

    getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }
    
    create(){
    //FRAME
    var sign = this.add.image(700,180, 'long_sign');
    sign.setScale(9.5);

    //REFERENCE TO GAME
    let myGame = this.scene.get('game');

    //Word groups. 84 words in each group
    this.easyWords = ['act','bay','cut','dry','era','few','gym','hit','hot','ice','job','kid','log','may','new','one','pro',
    'red','sis','tea','use','blog','boat','crew','data','diner','eyes','else','film',
    'feed','feet','gold','grew','hall','hill','into','iron','join','jump','king','knew','know','lion','like','moon','menu',
    'none','note','null','over','open','post','pool','tiny','tips','user','upon','visa',
    'vast','walk','weak','yard','year','zack','asset','birds','catch','drink','eight','fifth','games','happy','juice','knife',
    'label','mount','night','occur','panel','queen','range','ships','thick','done']
    this.mediumWords = ['agency','backup','crisis','figure','growth','joined','launch',
    'method','powder','affairs','average','disease','fashion','foreign','greatly','minimum','ongoing','analyst','bringing',
    'checking','eligible','directed','equipped','moment','reaction','straight','vacation','warranty','surprise','whatever',
    'internet','mountain','favourite','negative','election','division','calendar','action','friction','fiction','glorious',
    'homepage','lonely','monitor','secret','account','balance','capital','causing','brother','sister','factory','extreme',
    'sports','formula','initial','massive','located','tigers','picture','plastic','related','regular','language','twitter',
    'instagram','website','gravity','heating','soldier','skating','stating','vanilla','chocolate','coconut','cream','balloon',
    'bananas','aquatic','caption','needles', 'painting', 'sharpen','backpack']
    this.hardHords = ['acceptable','acquire','amateur','believe','conscience','column','conscious','definitely','drunkenness',
    'embarrassment','equipment','exceed','fiery','guarantee','gauge','harass','hierarchy','humorous','ignorance','immediate',
    'inoculate','jewelry','judgment','leisure','license','maintenance','miniature','maneuver','misspell','neighbor','noticeable',
    'occasionally','pastime','perseverance','pronunciation','privilege','questionnaire','receipt','recommend','rhyme','rhythm',
    'schedule','sergeant','threshold','twelfth','tyranny','vacuum','pharaoh','intelligence','handkerchief','necessary',
    'hypothetically','pneumonia','abolitionism','mortgage','awareness','establish','following','frequency','ourselves','pregnancy',
    'situation','somewhere','tradition','yesterday','addiction','wonderful','boyfriend','girlfriend','chemistry','mechanics',
    'objective','offensive','qualified','reactions','replacing','targeting','testament','volunteer','warehouse','workplace',
    'attractive','businesses','challenges']


    this.word = "";
    if (this.dif == 'easy'){
      this.word = this.easyWords[Math.floor(this.getRandomArbitrary(0, 83))];
    }
    else if (this.dif == 'medium'){
      this.word = this.mediumWords[Math.floor(this.getRandomArbitrary(0, 83))];
    }

    else if (this.dif == 'hard'){
      this.word = this.hardWords[Math.floor(this.getRandomArbitrary(0, 83))];
    }
    console.log(this.dif);
    }

    update(time, delta){
    
    }
}