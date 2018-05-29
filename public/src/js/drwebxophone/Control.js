/*
  DR.WEBSAXophone controller
*/

// var oscFrequencySet = new DSX.functionChange("knob_on_off_Osc_1",oscFrequency);
//   function oscFrequency(e) {
//     console.log(e.target.value);
//       socket.emit('control', {
//           frequency: e.target.value,
//           frequency11: e.target.value,
//       });
//
//   }

  function selecetEffect(obj){

      let e_data = obj;
      console.log(e_data);
      if(e_data.id === "on"){
          if(e_data.innerText === "on"){

              $("#on").html( "off");

          }else {
              $("#on").html( "on");
          }
      }

     socket.emit('selecter', {
         selectdata : e_data.id,

     });

      window.addEventListener('deviceorientation', handleOrientation, false);

      function handleOrientation(event) {
          var absolute = event.absolute;
          var alpha    = event.alpha;
          var beta     = event.beta;
          var gamma    = event.gamma;

          let tilt_front = beta.toFixed(0);
          let tilt_left = alpha.toFixed(0);
          let tilt_right = gamma.toFixed(0);

          tilt_front = (tilt_front - 75) * -1;
          tilt_front = tilt_front.toFixed(0);
          tilt_left = tilt_left - 90;
          tilt_left = tilt_left.toFixed(0);
          tilt_right = tilt_right;

          if (tilt_left < 0 || tilt_left > 100) {
              tilt_left = 0;
          }

          if (tilt_right < 0){
              tilt_right = 0;
          }

          if (tilt_front < 0){

              tilt_left = 0;
              tilt_right = 0;
          }
          if (tilt_front < -30){

              tilt_front = -30;

          }


           if( $("#on").html() === "off"){

                tilt_front = 0;
                tilt_left = 0;
                tilt_right = 0;


           }else if($("#on").html() === "on"){

               socket.emit('control', {
                   top : tilt_front,
                   left : tilt_left,
                   right  : tilt_right,
               });
           }
        //   socket.emit('control', {
        //       selectdata : e_data.id,
        //       top : tilt_front,
        //       left : tilt_left,
        //       right  : tilt_right,
        //   });

          $("#tilt_front").html(tilt_front);
          $("#tilt_left").html(tilt_left);
          $("#tilt_right").html(tilt_right);
      }


  }
