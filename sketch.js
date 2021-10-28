let video;
let button1;
let button2;
let button3;
let button4;
let trainButton;
let featureExtractor;
let classifier;
let label = "";


function setup() {
  createCanvas(400, 400);
  video = createCapture(VIDEO);
  video.size(350,350);
  video.position(400,0);

  let options = {
    numLabels: 4,
    epochs: 50,
  }
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
    print("test d");
  });
  button4 = createButton("E Major");
  button4.mousePressed(function() {
    classifier.addImage("E Major");
  });

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
    console.log(results);
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
  fill(0);
  textSize(64);
  textAlign(CENTER, CENTER);
  text(label, width/2, height/2);
}
