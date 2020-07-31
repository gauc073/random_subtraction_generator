var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
var fs = require("fs");
const { cpuUsage } = require('process');

function generate_number(digits) {
    var x = Math.pow(10, digits);
    var random_number = Math.floor(x + Math.random() * 9 * x);
    return random_number;
}

function generate_order() {
    var possible_order = [0, 1, 2, 3];
    const first_order = Math.floor(Math.random() * 4);
    var index = possible_order.indexOf(first_order);
    if (index > -1) {
        possible_order.splice(index, 1);
    }
    
    var second_order = Math.floor(Math.random() * 4);
    while (!possible_order.includes(second_order)) {
        second_order = Math.floor(Math.random() * 4);
    }
    var index = possible_order.indexOf(second_order);
    if (index > -1) {
        possible_order.splice(index, 1);
    }
    
    var third_order = Math.floor(Math.random() * 4);
    while (!possible_order.includes(third_order)) {
        third_order = Math.floor(Math.random() * 4);
    }
    var index = possible_order.indexOf(third_order);
    if (index > -1) {
        possible_order.splice(index, 1);
    }
    
    var fourth_order = possible_order[0];
    return [first_order, second_order, third_order, fourth_order];
}

function generate_options(answer, digits_in_subtrahend) {
    var options = [answer];
    if (digits_in_subtrahend < 2) {
        options.push(answer + Math.ceil(answer/10));
        options.push(answer - Math.ceil(answer/10));
        options.push(answer - subtrahend);
        return options;
    }
    if (digits_in_subtrahend > 5) {
        // so that last digit of answer not changed
        const error_pow = Math.pow(10, digits_in_subtrahend - 3)
        const error = error_pow * Math.floor(Math.random() * 10)
        options.push(answer - error);
        options.push(answer + error);
        options.push(answer + Math.floor(answer / 10));
        return options;
    }
    options.push(answer + Math.ceil(answer/10));
    options.push(answer - Math.ceil(answer/10));
    options.push(answer - Math.floor(Math.random()* answer));
    return options;
}

app.post('/generate_subtraction_mcq', function (req, res) {
    const input = req.body;
    // console.log(input)
    const num_of_question = input.num_question;
    const digits_in_minuend = input.minuend_digits;
    const digits_in_subtrahend = input.subtrahend_digits;
    if (digits_in_minuend < digits_in_subtrahend) {
        res.json({"error": 'provide correct details, "minuend digit can not be less than subtrahend!"'});
        return;
    }
    let output = []
    for (i = 0; i < num_of_question; i++) {
        const minuend = generate_number(digits_in_minuend);
        const subtrahend = generate_number(digits_in_subtrahend);
        const answer  = minuend - subtrahend;
        var options = generate_options(answer, digits_in_subtrahend);
        order = generate_order();
        var ordered_options = [];
        ordered_options.push(options[order[0]]);
        ordered_options.push(options[order[1]]);
        ordered_options.push(options[order[2]]);
        ordered_options.push(options[order[3]]);
        output.push({
            "minuend": minuend,
            "subtrahend": subtrahend,
            "correct_answer": answer,
            "options": ordered_options,
        });
    }
    res.json(output);
})


var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})