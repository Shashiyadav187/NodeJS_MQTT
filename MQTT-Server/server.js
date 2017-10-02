var mosca = require("mosca");

var settings = {
    http: {
        port: 8080,
        bundle: true,
        static: './'
    }
};

var server = new mosca.Server(settings);

const _POSITION = "server";

var val = {from: _POSITION,
    data:"_"
}

server.on('clientConnected', function(client) {
    console.log('client ' +  client.id+ ' connect');
});

server.on('clientDisconnected', function(client) {
    console.log('client ' +  client.id+ ' disconnect');
});

// fired when a client subscribes to a topic
server.on('subscribed',function(topic,client){
    // if(topic =="presence"){
    //     var mesFromServer = {
    //         topic:topic,
    //         payload:"Hello World",
    //         qos:0,
    //         retain:false
    //     };
    //     server.publish(mesFromServer,client);
    // }
});

// fired when a packet is send from server and is received from client
server.on('published', function(packet, client) {
    // console.log('Published', packet);
    if(typeof packet.payload == "object"){
            // console.log(packet);
             console.log("From Client(Buffer) : "+ JSON.parse(packet.payload).data);

            val.data = "Hello World";

            var mesFromServer = {
                        topic:packet.topic,
                        payload:JSON.stringify(val),
                        qos:0,
                        retain:false
                    };
            server.publish(mesFromServer,client);
    }
});

server.on('ready', setup);

// fired when the mqtt server is ready
function setup() {
    console.log('Mosca server is up and running');
}