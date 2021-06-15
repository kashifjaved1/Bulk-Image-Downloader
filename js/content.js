let imgList = [];
for(let i = 0; i < document.querySelectorAll("img").length; i++){
    imgList[i] = document.querySelectorAll('img')[i].getAttribute('src');
    //console.log(imgList[i]);
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if(msg.text === "hello"){
        //sendResponse({list: imgList});
        sendResponse(imgList);
    }
})