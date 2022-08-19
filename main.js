Status = "";
input_text = "";
objects = [];

function popUp() {
    alert("AI OBJECT FINDER")
} 

function setup() {
    canvas = createCanvas(480, 380);
    canvas.position(495, 220);
    video = createCapture(VIDEO);
    video.size(480, 380);
    video.hide();
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    }
    console.log(results);
    objects = results;
}

function start() {
    object_detector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    input_text = document.getElementById("input_box").value;
}

function modelLoaded() {
     console.log("Model Loaded!");
     Status = true;   
}

function draw() {
    image(video, 0, 0, 480, 380);
    if (Status != "") {
        object_detector.detect(video, gotResults);
        for (let i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            console.log(objects.length);
            fill("#ff0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#ff0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if (objects[i].label == input_text) {
                video.stop();
                object_detector.detect(gotResults);
                document.getElementById("object_found").innerHTML = input_text + " Found";
                var synth = window.speechSynthesis;
                var utterThis = new SpeechSynthesisUtterance(input_text + "found");
                synth.speak(utterThis); 
            }
            else{
                document.getElementById("object_found").innerHTML = input_text + " Not Found";
            }
        }
    }
 }