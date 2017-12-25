var start=[];
var end=[];

var stack=[];

var ax = 300;
var ay = 300;
var bx = 600;
var by = 300;
var cx = 600;
var cy = 600;
var dx = 300;
var dy = 600;

var xmin = ax
var xmax = cx
var ymin = ay;
var ymax = cy;

var canvas = document.getElementById('lab07');
var ctx = canvas.getContext('2d');

ctx.beginPath();
ctx.moveTo(ax, ay);
ctx.lineTo(bx, by);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(bx, by);
ctx.lineTo(cx,cy);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(cx, cy);
ctx.lineTo(dx, dy);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(dx, dy);
ctx.lineTo(ax, ay);
ctx.stroke();

//линия в
start = [300, 300];
end = [400, 400];

stack.push([start, end]);

ctx.beginPath();
ctx.moveTo(start[0], start[1]);
ctx.lineTo(end[0], end[1]);

ctx.strokeStyle = "#000000";
ctx.lineWdith = 1;
ctx.stroke();

//линия вне
start = [220, 100];
end = [300, 150];

stack.push([start, end]);

ctx.beginPath();
ctx.moveTo(start[0], start[1]);
ctx.lineTo(end[0], end[1]);

ctx.strokeStyle = "#000000";
ctx.lineWidth = 1;
ctx.stroke();


//линия пересекающая
start = [150, 250];
end = [550, 400];

stack.push([start, end]);

ctx.beginPath();
ctx.moveTo(start[0], start[1]);
ctx.lineTo(end[0], end[1]);

ctx.strokeStyle = "#000000";
ctx.lineWidth = 1;
ctx.stroke();

//линия наполовину
start = [150, 300];
end = [300, 280];

stack.push([start, end]);

ctx.beginPath();
ctx.moveTo(start[0], start[1]);
ctx.lineTo(end[0], end[1]);

ctx.strokeStyle = "#000000";
ctx.lineWidth = 1;
ctx.stroke();

canvas.addEventListener('mousedown', function(evt){

    if(stack.length > 0) {
        end_points = stack.pop();
    }
    clip(end_points);

});

function clip(end_points) {
    start_ = end_points[0];
    end_ = end_points[1];

    o1 = getcode(start_);
    o2 = getcode(end_);

    if(o1 == '0000' && o2 == '0000') {
        console.log('accept');
    }


    else if( (o1 & o2) != 0) {
        delete_line(start_, end_);
    }

    //одна точка в, одна вне
    else if( (o1 & o2) == 0 && o1 == '0000' || o2 == '0000') {
        cross = find_cr(o1, end_points);

        if(o1 != '0000') {
            delete_line(start_, cross[0]);
        } else if (o2 != '0000') {
            delete_line(end_, param[0]);
        }
    } else if( (o1 & o2) == 0) {
        cross = find_cr(o1, end_points);
        delete_line(start_, cross[0]);

        cross = find_cr(o2, end_points);
        delete_line(end_, cross[0]);
    }
}

function getcode(point) {
    outcode = '';

    x = point[0];
    y = point[1];

    if(y > ymax) {
        outcode = outcode + '1';
    } else {
        outcode = outcode + '0';
    }

    if(y < ymin) {
        outcode = outcode + '1';
    } else {
        outcode = outcode + '0';
    }

    if(x > xmax) {
        outcode = outcode + '1';
    } else {
        outcode = outcode + '0';
    }

    if(x < xmin) {
        outcode = outcode + '1';
    } else {
        outcode = outcode + '0';
    }

    return outcode;
}

function find_cr(outcode, end_points) {
    start_ = end_points[0];
    end_ = end_points[1];

    x1 = start_[0];
    x2 = end_[0];
    y1 = start_[1];
    y2 = end_[1];

    cross_list = []

    param=[0, 0];

    m = (y2-y1)/(x2-x1);

    c = y1 - m*x1;

    if(outcode.charAt(0) == '1') {
        param[0] = (ymax - c)/m;
        param[1] = ymax;

        cross_list.push(param);
    }

    if(outcode.charAt(1) == '1') {
        param[0] = (ymin - c)/m;
        param[1] = ymin;

        cross_list.push(param)
    }

    if(outcode.charAt(2) == '1') {
        param[0] = xmax;
        param[1] = (m * xmax + c);

        cross_list.push(param);
    }

    if(outcode.charAt(3) == '1') {
        param[0] = xmin;
        param[1] = (m * xmin + c);

        cross_list.push(param);
    }

    return cross_list;
}

function delete_line(start_, end_) {
    ctx.beginPath();
    ctx.moveTo(start_[0], start_[1]);
    ctx.lineTo(end_[0], end_[1]);

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();
}