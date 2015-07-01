#pragma strict




private var shakeRange : float = 0.1;
private var shakeSpeed : float = 0.1;
private var startPos   : Vector3;
private var targetPos  : Vector3;




function Start() {
   startPos  = transform.position;
   targetPos = transform.position;
}




function Update() {


   // target position reached
   if(transform.position == targetPos) {

      // new target position
      targetPos = Vector3(
         Random.Range(startPos.x-shakeRange, startPos.x+shakeRange),
         Random.Range(startPos.y-shakeRange, startPos.y+shakeRange),
         startPos.z
      );
   }




   // move to destination
   transform.position = Vector3.MoveTowards(
      transform.position,
      targetPos,
      shakeSpeed * Time.deltaTime
   );

   //print(targetPos);

   // move to target
   //transform.position = targetPos * Time.deltaTime;
}