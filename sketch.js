let debug = false;
let rotation_counter = document.getElementById('rotation');

let prog;
let world;
let s_path1;
let s_path2;
let SWEIGHT = 2;
let s_color;

let world_img;
let world_gravity_img;
let castillo_img;
let castillo_gravity_img;
let spindles_img;
let arcane_pole_img;
let magnetic_pole_img;
let overlay_img;
let underlay_img;

let dims = {
  width: 2000,
  height: 2000
}
let dimoffset = 1.8;

function preload() {
  atlantean = loadFont('fonts/Atlantean.ttf');
  world_img = loadImage('SGE.png');
  world_gravity_img = loadImage('sunground.png');
  castillo_img = loadImage('moon2.png');
  castillo_gravity_img = loadImage('Moon.png');
  spindles_img = loadImage('spindles.png');
  arcane_pole_img = loadImage('rose-quartz.png');
  magnetic_pole_img = loadImage('labradorite.png');
  overlay_img = loadImage('Astrolabe-Overlay.png');
  underlay_img = loadImage('Astrolabe-Overlay-ring.png');
}

function setup() {
  createCanvas(dims.width/dimoffset, dims.height/dimoffset);

  prog = new Progress();
  world = new World();
  s_path1 = new sailing_path(0);
  s_path2 = new sailing_path(180);

  angleMode(DEGREES);
  frameRate(60);
  strokeWeight(SWEIGHT);
  s_color = [235,194,64,200];
  stroke(color(s_color[0],s_color[1],s_color[2],s_color[3]));  
  textAlign(CENTER, CENTER);
  textFont(atlantean);
  textSize(dims.height/85);
}

function draw() {
  background(0);
  prog.increment();
  world.draw();
}

function Progress() {
  this.rotation = 0;

  this.increment = function() {
    this.rotation += 0.3;

    if (debug) {
      rotation_counter.innerHTML = (this.rotation % 360).toString() + ' ' + ((abs(-this.rotation)) % 360).toString() + ' ' + ((this.rotation / 2) % 360).toString();
      if (
        ((this.rotation % 360) == ((abs(-this.rotation)) % 360) == ((this.rotation / 2) % 360))
        ||
        ((this.rotation % 360) == ((abs(-this.rotation)) % 360) == ((this.rotation / 2) % 180))
      ) {
        console.log('hello');
      }
    }
  }
}


function World() {
  this.draw = function() {
    push();
      center_origin();
      rotate(45);
      noFill();
      
      // // Astrolabe Underlay.
      // let underlay_image_size = dims.height / 2;
      // let underlay_width = (underlay_img.width*underlay_image_size)/underlay_img.height;
      // image(underlay_img,-underlay_width/2, -underlay_image_size/2,underlay_width, underlay_image_size);

      // Gravity ring.
      push();
        let r = 360-((prog.rotation*0.6)%360);
        rotate(r);
        let world_gravity_image_size = dims.height / 2.5;

        tint(255, 80);
        image(world_gravity_img,-world_gravity_image_size/2,-world_gravity_image_size/2,world_gravity_image_size,world_gravity_image_size);
        fill(color(255,255,255,10));
        circle(0, 0, dims.height / 2.5);
      pop();

      //Lettering
      push();
        rotate(prog.rotation/2 + 15);
        lettering('Outer Gravity Well',dims.height / 2.5/1.9,false);
      pop();

      // Castillo Gravity Ring.
      push();
        rotate(prog.rotation / 2);
        translate(0,dims.height / 2.5 / 2);
        rotate(prog.rotation*2);

        let castillo_gravity_ring_size = dims.height/8.2;
        push();
          tint(255, 80);
          rotate((360-((prog.rotation*1.2)%360))*3);
          image(castillo_gravity_img,-castillo_gravity_ring_size/2,-castillo_gravity_ring_size/2, castillo_gravity_ring_size,castillo_gravity_ring_size);
        pop();
        fill(color(255,255,255,10));
        circle(0, 0, castillo_gravity_ring_size);
      pop();

      //Lettering
      push();
        rotate(prog.rotation / 2);
        translate(0,dims.height / 2.5 / 2);
        rotate(prog.rotation*2);
        rotate((360-((prog.rotation*1.2)%360))*3);
        lettering('Castillan Well',castillo_gravity_ring_size/2.3,false);
      pop();

      // Astrolabe Overlay.
      push();
      let overlay_size = world_gravity_image_size * 0.75;
        rotate(-1.4);
        rotate(prog.rotation/2);
        image(overlay_img,-overlay_size/2-overlay_size/250,-overlay_size/2.7+overlay_size/250,overlay_size,overlay_size)
      pop();
      
      let spindle_width = ((spindles_img.width*dims.height)/4)/spindles_img.height;

      // Sailing Path.
      s_path1.draw();
      s_path2.draw();

      // Arcane Pole.
      push();
        rotate(-prog.rotation);

        // Lettering.
        lettering('Polus Arcaneum', dims.height / 9.1, true)

        // Background.
        let arcane_pole_size = dims.height / 50;
        let arcane_pole_width = (arcane_pole_img.width*arcane_pole_size)/arcane_pole_img.height;
        image(spindles_img,-spindle_width/2, -dims.height / 8,spindle_width, dims.height / 4);
        
        image(arcane_pole_img,-arcane_pole_width/2, -world_gravity_image_size/3,arcane_pole_width, arcane_pole_size);
        push();
          rotate(180);
          image(arcane_pole_img,-arcane_pole_width/2, -world_gravity_image_size/3,arcane_pole_width, arcane_pole_size);
        pop();
      pop();

      // Magnetic Pole.
      push();
        rotate(prog.rotation);
        
        // Lettering.
        lettering('Polus Magneticum', dims.height / 7.8, true)

        let magnetic_pole_size = dims.height / 40;
        let magnetic_pole_width = (magnetic_pole_img.width*magnetic_pole_size)/magnetic_pole_img.height;
        image(spindles_img,-spindle_width/2, -dims.height / 8,spindle_width, dims.height / 4);
        
        image(magnetic_pole_img,-magnetic_pole_width/2, -world_gravity_image_size/3,magnetic_pole_width, magnetic_pole_size);
        push();
          rotate(180);
          image(magnetic_pole_img,-magnetic_pole_width/2, -world_gravity_image_size/3,magnetic_pole_width, magnetic_pole_size);
        pop();
      pop();

      // Castillo Proper.
      push();
        rotate(prog.rotation / 2);
        translate(0,dims.height / 2.5 / 2);
        rotate(prog.rotation*2);
        let castillo_imgsize = dims.height/22;
        lettering('Castillo',dims.height /30, mirror=false)
        image(castillo_img,-castillo_imgsize/2,-castillo_imgsize/2, castillo_imgsize,castillo_imgsize);
        noFill();
        circle(0, 0, dims.height / 23);
      pop();

      

      // World.
      push();
        rotate(prog.rotation);

        // Lettering, Khal'Rai word for the world.
        lettering("Rai'Zahul",dims.height / 10.7, true);
        // World Proper.
        let world_imgsize = dims.height/6.5;
        image(world_img,-world_imgsize/1.95,-world_imgsize/2, world_imgsize,world_imgsize);
        noFill();
        circle(0, 0, dims.height/7.3);
      pop();
    pop();
  }
}

function center_origin() {
  translate(dims.width/dimoffset / 2, dims.height/dimoffset / 2);
}

function sailing_path(rotation) {
  this.rotation = rotation;
  this.num_points = 180;
  this.point_decay_limiter = 20;
  this.points = 0;
  this.arc_height = dims.height / 2 / 2.6;
  this.draw = function() {
    push();
      rotate(103 + this.rotation);
      translate(-((this.arc_height / 2) - (dims.height / 6 / 2.05))-25, 0);
      strokeWeight(SWEIGHT*2);
      noFill();
      if (this.points == this.num_points) {
        this.points = 0;
      } else {
        this.points++;
      }

      for (var i = 0; i < this.points; i++) {
        push();
        
          strokeWeight(SWEIGHT * 6 *(1+i/65));

          let alpha = (255 - ((this.points - i) * 2 * 255 / this.num_points))*0.26;
          if (this.points > this.num_points - this.point_decay_limiter) {
            let alpha_decay = (255 / this.point_decay_limiter) * (this.points - this.num_points + this.point_decay_limiter);
            alpha = alpha - alpha_decay;
          }
          stroke(color(255,255,255,alpha));
          arc(0 - 1, 0, this.arc_height, this.arc_height, i, i + 1);
        pop();
      }
    pop();
  }
}

function lettering(string,text_distance, mirror=false) {

  // Lettering.
  let lettering_text = string;
  let lettering_char_array = lettering_text.toLowerCase().split("");
  let distance = text_distance;

  push();

    stroke(color(0,0,0,255));
    strokeWeight(SWEIGHT*1.5);
    fill(color(255,255,255,240));
    for (let i = 0; i < lettering_char_array.length; i++){
      push();
        rotate(dims.height/distance*i+10);
        translate(0, distance);
        rotate(180);
        text(lettering_char_array[i], 0, 0);
      pop();
      if (mirror) {
        push();
          rotate(dims.height/distance*i+10+180);
          translate(0, distance);
          rotate(180);
          text(lettering_char_array[i], 0, 0);
        pop();
      }
    }
  pop();
}