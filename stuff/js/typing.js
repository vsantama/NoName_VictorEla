export default class Pause extends Phaser.Scene {
    constructor(){
        super({key: 'type'});
    }

     /* init (data){
    this.difficulty = char.dif;
}*/

    preload(){
        this.load.image('sign', './stuff/img/Assets/Sprites/woodframe.png');
        this.load.audio('error', './stuff/img/Assets/Sounds/Sound_FX/error.mp3');
        this.load.audio('correct', './stuff/img/Assets/Sounds/Sound_FX/correct.mp3');
        this.load.audio('snake_dies', './stuff/img/Assets/Sounds/Sound_FX/snake_Hiss.mp3');
        this.load.audio('snake_attack', './stuff/img/Assets/Sounds/Sound_FX/snake_attack.mp3');
    }

    getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    
    create(){
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

        var sign = this.add.image(700,400, 'sign');
        sign.setScale(12);

        if (this.dif == 'easy'){
           for (i = 0; i < 3; i++){
            this.words[i] = this.easyWords[this.getRandomArbitrary(0, 83)];
           }
        }
        else if (this.dif == 'medium'){
            this.words[i] = this.mediumWords[this.getRandomArbitrary(0, 83)];
        }

        else if (this.dif == 'hard'){
            this.words[i] = this.hardWords[this.getRandomArbitrary(0, 83)];
        }
        
    }

    update(time, delta){
        
    }
}