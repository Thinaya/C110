Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
})
camera=document.getElementById("camera");

Webcam.attach("#camera");

function take_snapshot()
{
    Webcam.snap(function(data_uri)
    {
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';
    })
}

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/BdORE9mGk/model.json",modelLoaded);

function speak()
{
    var Thinaya = window.speechSynthesis;
    speech_1 = "The first prediction is"+prediction_1;
  speech_2 = "The second prediction is"+prediction_2;

  var utterThis=new SpeechSynthesisUtterance(speech_1+speech_2);
  Thinaya.speak(utterThis);
}

function modelLoaded()
{
    console.log("model loaded!");
}

function check()
{
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results)
        document.getElementById("results_gesture_name").innerHTML = results[0].label;
        document.getElementById("results_gesture_name2").innerHTML = results[1].label;
      prediction_1 = results[0].label;
      prediction_2 = results[1].label;
        speak();
        if(results[0].label == "Thumbs Up")
        {
            document.getElementById("update_emoji").innerHTML = "&#128077;";
        }
        if(results[0].label == "Thumbs Down")
        {
            document.getElementById("update_emoji").innerHTML = "&#128078;";
        }
        if(results[0].label == "Peace Sign")
        {
            document.getElementById("update_emoji").innerHTML = "&#9996;";
        }
        if(results[1].label == "Thumbs Up")
        {
            document.getElementById("update_emoji").innerHTML = "";
        }
        if(results[1].label == "Thumbs Down")
        {
            document.getElementById("update_emoji").innerHTML = "";
        }
        if(results[1].label == "Peace Sign")
        {
            document.getElementById("update_emoji").innerHTML = "";
        }
    }
}