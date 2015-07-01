#pragma strict

private var lampSeparation : float = 160;
private var moveSpeed      : float = 50;

private var lamp          : Transform;
private var lamp_startPos : Vector3;
private var lamp_endPos   : Vector3;

private var backLight          : Transform;
private var backLight_startPos : Vector3;
private var backLight_endPos   : Vector3;

private var sun      : Light;
private var sunMin   : float   = 0.1;
private var sunMax   : float   = 0.4;
private var sunSpeed : float   = 0.01;
private var sunState : int     = 1; // 1 sun down, 2 sun up, 3 night wait
private var sunWait  : float   = 0;
private var nightMax : float   = 60;




function Start() {

   var xPos1 : float = lampSeparation/-2;
   var xPos2 : float = lampSeparation/2;

   lamp      = GameObject.Find('lamp').transform;
   backLight = GameObject.Find('backLight').transform;

   lamp_startPos   = lamp.position;
   lamp_endPos     = lamp.position;
   lamp_startPos.x = xPos1;
   lamp_endPos.x   = xPos2;
   lamp.position   = lamp_startPos;

   backLight_startPos   = backLight.position;
   backLight_endPos     = backLight.position;
   backLight_startPos.x = xPos2;
   backLight_endPos.x   = xPos1;
   backLight.position   = backLight_startPos;

   sun = GameObject.Find('sun').light;
   sun.intensity = sunMax;
}




function Update() {

   // target position reached
   if(lamp.position == lamp_endPos) {
      lamp.position      = lamp_startPos;
      backLight.position = backLight_startPos;
   }

   // move lamp
   lamp.position = Vector3.MoveTowards(
      lamp.position,
      lamp_endPos,
      moveSpeed * Time.deltaTime
   );

   // move backLight
   backLight.position = Vector3.MoveTowards(
      backLight.position,
      backLight_endPos,
      moveSpeed * Time.deltaTime
   );


   // sun goes down
   if(sunState == 1) {
      // decrease light
      sun.intensity -= sunSpeed * Time.deltaTime;

      // reached min light, stay at night for a while
      if(sun.intensity <= sunMin) {
         sunState = 3;
         sunWait = Random.Range(0, nightMax);
      }
   }

   // sun goes up
   else if(sunState == 2) {

      // increase light
      sun.intensity += sunSpeed * Time.deltaTime;

      // reached max light, go down
      if(sun.intensity >= sunMax) {
         sunState = 1;
      }
   }

   // night wait
   else if(sunState == 3) {

      // elapse night time
      sunWait -= Time.deltaTime;

      // night is over, sun up
      if(sunWait <= 0) {
         sunState = 2;
      }
   }







/*
   // sun up/down
   if(sunState == 2 && sun.intensity >= sunMax) {
      sunState = 1;
   }
   // reached the night
   else if(sunState == 1 && sun.intensity <= sunMin) {
      sunWait = Random.Range(0, nightMax);
      sunState = 3;
   }
   // end of the night, sun up
   else if(sunState == 3 && sunWait <= 0) {
      sunState = 2;
   }

   // night wait
   if(sunState == 3) {
      sunWait -= Time.deltaTime;
   }
   // sun up
   else if(sunState == 2) {
      sun.intensity += sunSpeed * Time.deltaTime;
   }
   // sun down
   else if(sunState == 1) {
      sun.intensity -= sunSpeed * Time.deltaTime;
   }
*/
   print(sunState);
   print(sunWait);
}