let result;
let sketchrunning=1;
let button;
let piece;
let promptText;
var Anzahl=['100g', '1tsp', '2kg', '500g', '225ml', '0,5l','a pack', 'a pinch'];
var Zutaten=['milk','mushrooms', 'butter', 'lemon juice', 'tomatoes', 'spinach','water', 'beans'];
var Adjektiv=['soft', 'raw','white','thin','thick','rich','hot','slightly old'];
var Verb=['chop very fine', 'pour in', 'boil', 'blend','fill with', 'put in a kettle over the oven', 'bake','roll out'];
var Verb2=['boil', 'bake','fry','stew in broth','let cool down']
var Würze=['salt', 'pepper','red onions', 'curry powder','cheese','chilli','sage', 'spring onions'];
var Zustand=['crispy', 'creamy','tender', 'a good smell emerges', 'bubbles start to form','you get tired','it gets hot','done']
var Zusatz=['immediatly', 'with an alcoholic beverage of your choice', 'with a tall glass of milk', 'a big portion', 'with a soda', 'on wafers','with a nice salad','as cold as possible']
//setTimeout(stoprunning, 5000);

let foodColor={
  //Zutaten:
  "milk": {r: 255,g: 255,b: 255},
  "mushrooms": {r: 150,g: 115,b: 60},
  "butter": {r: 255,g: 250,b: 230},
  "lemon juice": {r: 250,g: 255,b: 180},
  "tomatoes": {r: 230,g: 10,b: 20},
  "spinach": {r: 30,g: 115,b: 30},
  "water": {r: 215,g: 235,b: 235},
  "beans": {r: 120,g: 50,b: 15},
  //Würze:
  "salt": {r: 245,g: 245,b: 245},
  "pepper": {r: 45,g: 30,b: 25},
  "red onions": {r: 235,g: 170,b: 180},
  "curry powder": {r: 255,g: 160,b: 0},
  "cheese": {r: 240,g: 215,b: 115},
  "chilli": {r: 220,g: 45,b: 0},
  "sage": {r: 145,g: 170,b: 145},
  "spring onions": {r: 160,g: 205,b: 105},
}

function preload() {
  fontslim = loadFont('EuropaLight.otf');
  fontfat = loadFont('EuropaBold.otf')
  result = loadStrings('cookbook.txt');
}

function setup() {
  textAlign(CENTER);
  createCanvas(windowWidth,windowHeight);
  fill(20);
  let button=createButton('try again');
  let button1=createButton('choose a recipe');
  button1.position(windowWidth/2-button1.width/2,windowHeight-350);
  button.position(windowWidth/2-button.width/2,windowHeight-200);
  button1.mousePressed(stoprunning);
  button.mousePressed(startrunning);
  button1.size(200,100);
  button.size(150,80);
  button1.style('background', color(0));
  button.style('background', color(0));
  button1.style('font-size', '35px')
  button.style('font-size', '25px')
  button1.style('color',color(230));
  button.style('color',color(230));
}

function draw() {
  if(sketchrunning==1){
    rand=floor(random(8));
    rand1=floor(random(8));
    rand2=floor(random(8));
    rand3=floor(random(8));
    rand4=floor(random(5));
    
    let resultA=join(result);
    piece=match(resultA, /\w[A-Z]\w{1,}/g);
    promptText = random(piece)+ ' ' + random(piece);
  }
  
  frameRate(15);
  background(230);
  noStroke();
  textFont=fontfat;
  textStyle(BOLD);
  textSize(70);
  text("WHAT ARE YOU EATING?" + "\n" + "\n" ,20,100,windowWidth,windowHeight);
  textSize(35);
  text("do you accept or refuse the meal?", 20,200,windowWidth,windowHeight);
  textFont=fontslim;
  textStyle(NORMAL)
  textSize(35);
  //if(frameCount%40==0){
    text(promptText + "\n" + ' ' + "\n" + 
    'Take '+ Anzahl[rand] +' of '+ Zutaten[rand] + ' and add '+ Anzahl[rand2]+' of '+ Adjektiv[rand] +' '+ Zutaten[rand2]+', mix them very well in a big bowl, '+ Verb[rand]+ ' some ' + Zutaten[rand3] + ' and '+ Anzahl[rand3] +' of '+ Würze[rand]+ '. Take the mixture and '+ Verb2[rand4] +' until ' + Zustand[rand] +'. Now serve and enjoy ' + Zusatz[rand]+ '!' +"\n" + ' '+ "\n", windowWidth/2-300,370,600,windowHeight);
  //}
}

function stoprunning(){
  if(sketchrunning==1){
    //noLoop();
    sketchrunning=0;
  }
}  

function startrunning(){
  if(sketchrunning==0){
    //noLoop();
    sketchrunning=1;
  }
}  