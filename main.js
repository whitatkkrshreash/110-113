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

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/27h8WJPiI/model.json',modelLoaded);

function speak(){
    var synthis= window.speechSynthesis;
    //speak_data1= "The first Prediction is"+prediction1;
    //speak_data2= "The second Prediction is"+prediction2;
    var utterthis= new SpeechSynthesisUtterance(tospeak);
    synthis.speak(utterthis);
}

function modelLoaded()
{
    console.log("model loaded!");
}
function check(){
    img=document.getElementById('captured_image');
    classifier.classify(img,gotResult);
}
function gotResult(error,results){
    if (error) {
        console.error(error);
    }else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        gesture=results[0].label;
        if(gesture=="Bad"){
            tospeak= "This is Bad";
            document.getElementById("uptade_emoji").innerHTML="&#128542";
        }
        else if(gesture=="Good"){
            tospeak= "You are happy?";
            document.getElementById("uptade_emoji").innerHTML="&#128513";
    }
    else if(gesture=="Victory"){
        tospeak= "You are nice?";
        document.getElementById("uptade_emoji").innerHTML="&#9996;";
}}
    speak();
}