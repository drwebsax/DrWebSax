
	 // Editor
Dr.Framework = new function() {
    var that = this;

    this.oscType= function(e){

        let synTypeData = $("#syn_type").text();
        if(e.name==="osc_first"){
            $("#osc1_type").text(e.value);


                console.log(synTypeData);
                switch (synTypeData) {
                  case "OSC":
                  console.log("osc");
                  oscFirst.type=e.value;

                  break;
                  case "FM":
                  console.log("fm");
                  fm.carrier_type=e.value;

                  break;
                  case "AM":
                  console.log("am");
                  oscFirst.type=e.value;

                  break;
                  case "Sub":
                  console.log("sub");
                  oscFirst.type=e.value;
                  break;

                  default:
                  oscFirst.type=e.value;

                }


        }else if(e.name==="osc_second"){
            $("#osc2_type").text(e.value);

            console.log(synTypeData);
            switch (synTypeData) {
              case "OSC":
              console.log("osc");
              oscSecond.type=e.value;

              break;
              case "FM":
              console.log("fm_2");
              fm.mod_type=e.value;

              break;
              case "AM":
              console.log("am");
              am_syn.mod_type=e.value;

              break;
              case "Sub":
              console.log("sub");

              break;

              default:
              oscSecond.type=e.value;

            }


        }


    }




};
