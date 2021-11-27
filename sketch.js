let video;
let button1;
let button2;
let button3;
let button4;
let trainButton;
let saveButton;
let classifier;
let label = "";


function setup() {
  createCanvas(windowWidth, windowHeight - 50);
  video = createCapture(VIDEO);
  video.size(64, 64);
  video.hide();

  let options = {
    numLabels:4,
    epochs: 50,
  }
  // classifier = ml5.neuralNetwork(options);
  featureExtractor = ml5.featureExtractor('MobileNet', options, modelLoaded);
  classifier = featureExtractor.classification(video, videoReady)

  button1 = createButton("A Major");
  button1.mousePressed(function() {
    classifier.addImage("A Major");
  });
  button2 = createButton("C Major");
  button2.mousePressed(function() {
    classifier.addImage("C Major");
  });
  button3 = createButton("D Major");
  button3.mousePressed(function() {
    classifier.addImage("D Major");
  });
  button4 = createButton("E Major");
  button4.mousePressed(function() {
    classifier.addImage("E Major");
  });
  saveButton = createButton("Save");
  saveButton.mousePressed(function() {
    classifier.saveData();
  })
  trainButton = createButton("Train");
  trainButton.mousePressed(function() {
    classifier.train((lossValue) => {
      if (lossValue == null) {
        console.log("Training Complete!");
        classifier.classify(gotResults);
      } else {
        console.log(lossValue);
      }
    });
  });
}


function gotResults(error, results) {
  if (error) {
    console.log(error);
  } else {
    label = results[0].label;
    classifier.classify(gotResults);
  }
}

function modelLoaded() {
  console.log('Model is Loaded!');
}

function videoReady() {
  console.log('Video is Loaded!');
}

function draw() {
  
  background(220);
  imageMode(CENTER);
  image(video, width/2, height/2 - 50, 250, 250);
  fill(0);
  textSize(64);
  textAlign(CENTER, CENTER);
  text(label, width/2, height/2 + 120);
}
