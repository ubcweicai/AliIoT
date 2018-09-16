//1.引入阿里云IoT的sdk
const mqtt = require('aliyun-iot-mqtt');

//2.设备属性
const options = {
    productKey: "a1xqRVnNCQ9",
    deviceName: "wei_thermometer",
    deviceSecret: "GRnfACQAPlzIRnbLqNbablbpLz7lHqpb",
    regionId: "cn-shanghai"};

//3.建立连接
const client = mqtt.getAliyunIotMqttClient(options);

//4.属性数据上报
const topic = `/sys/${options.productKey}/${options.deviceName}/thing/event/property/post`;
setInterval(function() {
    //发布数据到topic
    client.publish(topic, getPostData());

}, 5 * 1000);

function getPostData(){
    const payloadJson = {
        id: Date.now(),
        params: {
            temperature: Math.floor((Math.random() * 20) + 10),
            humidity: Math.floor((Math.random() * 20) + 60)
        },
        method: "thing.event.property.post"
    }

    console.log("===postData topic=" + topic)
    console.log(payloadJson)

    return JSON.stringify(payloadJson);

}