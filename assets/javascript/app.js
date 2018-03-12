$(document).ready(function() {

// hide 'over' content to start
$('#over').hide();

// create intervalId variable
var intervalId;

// timer
var countDown = {
    time: 120,

    start: function () {
        intervalId = setInterval(countDown.count, 1000);
    },

    count: function () {
        // increment time by 1, remember we cant use "this" here.
        countDown.time--;
        // Get the current time, pass that into the countDown.timeConverter function
        var currentTime = countDown.timeConverter(countDown.time);
        // show the converted time in the "display" div.
        $('.time-remaining').text('Time Remaining: ' + currentTime);
    },

    timeConverter: function (t) {
        //  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
        var minutes = Math.floor(t / 60);
        var seconds = t - (minutes * 60);
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        if (minutes === 0) {
            minutes = " ";
        }
        return minutes + ":" + seconds;
    }
};

// run interval counter 
countDown.start();

// after two minutes ...
var timeUp = setTimeout(function () {
    // hide 'game' content
    $('#game').hide();
    // show 'over' content
    $('#over').show();
    // display 'time up'
    $('.remark').text('You Ran Out Of Time!')
    // display correct answers
    $('.correct').text('Correct answers: ' + correct);
    // display incorrect answers
    $('.incorrect').text('Incorrect answers: ' + incorrect);
    // display amount unanswered (not working)
    $('.unanswered').text('Unanswered: ' + unanswered);
    // change button text
    $('.btn').text('Play Again');
    // button now reloads game page
    $('.btn').on('click', function() {
        location.reload();
    });
},
120000);

// set variables to 0
var correct = 0;
var incorrect = 0;
var unanswered = 0;

// when radio selected ...
$(document).on('click', '.input', function() {
    console.log(this.value);

    // get value of the selection
    // implement corresponding variable
    if (this.value === 'right') {
        correct++;
        console.log('c: ' + correct);
    } else if (this.value === 'wrong') {
        incorrect++;
        console.log('i: ' + incorrect);
    }
    
});

// if(!$('.input').is(':checked')){
//     unanswered++;
//     $('.unanswered').text('Unanswered: ' + unanswered);
//     console.log('un: ' + unanswered);
// }  (always 1 unanswered)

// when submit button clicked ...
$('.btn').on('click', function() {

    // hide 'game' content
    $('#game').hide();
    // show 'over' content
    $('#over').show();

    // display remark according to score
    if (correct === 5) {
        $('.remark').text('Amazing, Perfect Score!');
    } else if (correct > incorrect) {
        $('.remark').text('Good Job!');
    } else {
        $('.remark').text('You Can Do Better. Try Again!');
    };

    // display correct, incorrect, & unanswered amounts
    $('.correct').text('Correct answers: ' + correct);
    $('.incorrect').text('Incorrect answers: ' + incorrect);
    $('.unanswered').text('Unanswered: ' + unanswered);
    // unanswered not working

    // change button text
    $('.btn').text('Play Again');
    
    // button now reloads game page
    $('.btn').on('click', function() {
        location.reload();
    });
});

});
// end.