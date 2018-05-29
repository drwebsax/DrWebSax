// ajax
Dr.Ajax = function() {
    this.gid = "";              //
    this.radian = 0.0;
  //  alert(this.radian);
          //
};

Dr.Ajax.prototype.ParseXml = function(url_path) {

  var xmldata;
    $.ajax({

      type: 'get'
      ,url: url_path
      , dataType : 'xml'
      , async : false

      , success: function(xml, jqXHR) {

        console.log("::ajax load complete");
        xmldata = xml;
          return xmldata;
      }
      , error: function(jqXHR,) {
        console.log('::ERROR : ');
      }

  });
  //console.log(xmldata);
  this.adaptXml(xmldata)
    return xmldata;

}

Dr.Ajax.prototype.adaptXml = function(xml) {
   var $xmldata =$(xml).find("audio")
      ,titleName = $xmldata.find("title").text()
      ,audioControl = $xmldata.find("control");

        //$("#wac-value-tip").css({"position": "absolute","right":"80px"});

     //addClass("dial_right");



     $("#dial_1").attr("max",audioControl.find('dial').eq(0).attr('max')); //
     $("#dial_1").attr('step',audioControl.find('dial').eq(0).attr('step')); //
     console.log(audioControl.find('dial').eq(0).attr('step'));


     //$("#dial_2").attr('max',audioControl.find('dial').eq(1).attr('max')); //
     $("#dial_2").prop('step',audioControl.find('dial').eq(1).attr('step')); //
     console.log(audioControl.find('dial').eq(1).attr('step'));


     $("#dial_3").attr('max',audioControl.find('dial').eq(2).attr('max')); //
     //audioControl.find('dial').eq(0).attr('max').val();

     $("textarea").val($xmldata.find('jsfile').html());
     console.log($xmldata.find('jsfile').html());

}

Dr.Ajax.prototype.LoadJsonData = function(url_path) {

  var jsondata;
    $.ajax({

      type: 'get'
      ,url: url_path
      , dataType : 'json'
      , async : false
      , contentType : false
      , processData : false
      , success: function(data, jqXHR) {

        console.log("::json load complete");
        console.log(typeof data);
        jsondata =data
          return jsondata;
      }
      , error: function(jqXHR,) {
        console.log('::ERROR : ');
      }

  });
  //console.log(jsondata);
  //this.adaptXml(xmldata)
    return jsondata;

}

Dr.Ajax.prototype.Parse = function(url) {

    var that = this;

    that.gid        = $item.attr("gid").toLowerCase();
    that.require    = ($item.attr("require") === "true");
    that.movelock   = ($item.attr("movelock") === "true");
    that.resizelock = ($item.attr("resizelock") === "true");
    that.zorderlock = ($item.attr("zorderlock") === "true");
    that.removelock = ($item.attr("removelock") === "true");

    $layer_rect = $item.find("rect");
    that.xpos   = parseFloat($layer_rect.attr("x"));
    that.ypos   = parseFloat($layer_rect.attr("y"));
    that.width  = parseFloat($layer_rect.attr("width"));
    that.height = parseFloat($layer_rect.attr("height"));


}


Dr.Ajax.prototype.LoadJson = function(data) {
    this.gid = data.gid;
    this.require = data.require;

    this.width = data.width;
    this.height = data.height;
    this.radian = data.radian;
    return true;
}

Dr.Ajax.prototype.SaveJson = function() {

    var ret_json = '\n';
    ret_json += ('        "gid": "' + this.gid + '"');
    ret_json += (', "require": ' + this.require);
    ret_json += (', "movelock": ' + this.movelock);
    ret_json += (', "out_w": ' + out_rect.w);
    ret_json += (', "out_h": ' + out_rect.h);

    return ret_json;
}
