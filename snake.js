//creating black lines to make the play area

for (let n = 0; n < 900; n++)
    $("#DIV").prepend($("<p></p>"), $("#para1")); // Adding paras


for (let m = 0; m < 900; m++, d = Math.floor(m / 3))
    $("p")[m].style.transform = `translateY(-${ dd || 0}px)`;


$('button').click(function() { move(this.id); });

let bd = [464, 465];
let pnt = Math.floor(Math.random() * 900);
let score = 0;
let intV;

let motion = {
    u: function() {
        let body_pnt = bd[bd.length - 1] - 30;
        if (body_pnt < 0)
            body_pnt += 900; // bring the snake back to top if it touches the ground (0)

        bd.indexOf(body_pnt) > 0 ? game_over() : grow(body_pnt);

    },
    l: function() {
        let body_pnt = bd[bd.length - 1] - 1;

        if (body_pnt % 30 == 29 && body_pnt > 0)
            body_pnt += 30;

        if (body_pnt < 0)
            body_pnt += 30;

        bd.indexOf(body_pnt) > 0 ? game_over() : grow(body_pnt);

    },
    d: function() {
        let body_pnt = bd[bd.length - 1] + 30;

        if (body_pnt > 899)
            body_pnt -= 900;

        bd.indexOf(body_pnt) > 0 ? game_over() : grow(body_pnt);

    },
    r: function() {
        let body_pnt = bd[bd.length - 1] + 1;

        if (!body_pnt % 30)
            body_pnt -= 30;

        bd.indexOf(body_pnt) > 0 ? game_over() : grow(body_pnt);
    }
};


function move(dir) {
    clearInterval(intV);
    let keys = ['u', 'l', 'd', 'r', 'u', 'l', 'd'];

    $('#' + dir).prop('disabled', true);
    $('#' + keys[keys.indexOf(dir) + 2]).prop('disabled', true);
    $('#' + keys[keys.indexOf(dir) + 1]).prop('disabled', false);
    $('#' + keys[keys.indexOf(dir) + 3]).prop('disabled', false);

    intV = setInterval(motion[dir], 200);
}

function grow(body_pnt) {

    bd.push(body_pnt);

    if (body_pnt == pnt) {
        score += 10;
        $("#hr").html(score);
        pnt = Math.floor(Math.random() * 900);
    } else
        $("p").eq(bd.shift()).css('background', "#000");

    for (let l of bd)
        $("p").eq(l).css('background', "blue");

    $("p").eq(pnt).css('background', "red");
}

function game_over() {
    $('body').html('<h1 class="over"> Game Over </h1>  <h3 class="over"> Your Score: ' + score + '</h3>');
    clearInterval(intV);
}
