// var mqtt = require('mqtt');

const _POSITION = "client";

var mess = {
    from: _POSITION,
    data: "_"
};

$(document).ready(function(){
    $("#btnConnect").click(function(){

        $("#Connect-loader").css("display","inline");
        var client  = mqtt.connect({ host: 'localhost', port:8080 });
    
        client.on('connect', function () {
            if(client.connected)
            {
                $("#Connect-loader").css("display","none");
                $("#btnConnect").prop("disabled",true);
                $("#btnDisconnect").prop("disabled",false);
                $("#connect-notification").html("Server connected");
                $("#connect-notification").css("color","green");
            }
        });
        
        //tương tự on message bên dưới
        //on packetreceive sẽ bắt hết tất cả các packet mà server gửi về
        
        // client.on('packetreceive',function(packet){
        //     if(packet.cmd=="publish"){
        //         console.log(packet);
        //         $("#txtDataFromServer").val($("#txtDataFromServer").val()+"From Server: " + packet.payload.toString()+"\n"); 
        //     }
        // });

        // client.on('packetsend',function(packet){
        //     if(packet.cmd=="publish"){
        //         console.log(packet);
        //         $("#txtDataFromServer").val($("#txtDataFromServer").val()+"Packet Send: " + packet.payload.toString()+"\n"); 
        //     }
        // });
        
        //on message sẽ chỉ bắt các packet có cmd là publish từ server (gửi xuống)
        client.on('message', function (topic, message,packet) {
            // message is Buffer
            // console.log(packet);
            var dataJSON = JSON.parse(message);
            if(dataJSON.from == "server")
                $("#txtDataFromServer").val($("#txtDataFromServer").val()+"From Server: " + dataJSON.data+"\n");
        });

        client.on('close',function(){
            $("#btnConnect").prop("disabled",false);
            $("#btnDisconnect").prop("disabled",true);

            $("#connect-notification").html("Server disconnected");
            $("#connect-notification").css("color","red");
        });

        $("#btnSend").click(function(){
            var topic = $("#txtTopic").val();

            mess.data = $("#txtMessage").val();
            
            if(topic != "" && mess !=""){
                client.subscribe(topic);
                client.publish(topic,JSON.stringify(mess),{qos:0,retain:false});
            }
        });
        
        $("#btnDisconnect").click(function(){
           client.end(); 
        });
    });
});




