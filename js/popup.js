document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('button').addEventListener('click', () => {

        document.querySelector('button').innerHTML = "Download";
        document.querySelector('button#show').id = "download";

        let btn = document.createElement("button");
        btn.id = "selection";
        btn.innerText = "Select All";
        document.querySelector("center").appendChild(btn);

        document.body.appendChild(document.createElement("br"));

        let p = document.createElement("p");
        p.className = "hidden";
        p.innerText = "This is a Paragraph which is used for Hidden spacing. This is a Paragraph which is used for Hidden spacing. Yep";
        document.querySelector("pre").appendChild(p);

        let msg = {
            text: "hello"
        }


        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, msg, (response) => {
                for (let i = 0; i < response.length; i++) {
                    /*if (i % 2 === 0) {
                        document.body.appendChild(document.createElement("br"));
                    }*/
                    let inp = document.createElement("input");
                    inp.type = "checkbox";
                    inp.id = i;
                    document.body.appendChild(inp);
                    let img = document.createElement("img");
                    img.src = response[i]; // fetching as array
                    img.id = i;
                    img.onerror = _ => {
                        img.style.display = 'none';
                        inp.type = 'hidden';
                    }
                    document.body.appendChild(img);
                    inp.value = img.src;
                }

                document.getElementById("selection").addEventListener('click', _ => {
                    let chkbox = [...document.querySelectorAll('input')];
                    console.log(document.getElementById("selection").innerText);
                    if(document.getElementById("selection").innerText === "Select All"){
                        document.getElementById("selection").innerText = "Unselect All";
                        for(let i = 0; i < chkbox.length; i++){
                            document.querySelectorAll('input')[i].checked = true;
                        }
                    }
                    else{
                        document.getElementById("selection").innerText = "Select All";
                        for(let i = 0; i < chkbox.length; i++){
                            document.querySelectorAll('input')[i].checked = false;
                        }
                    }
                })

                document.getElementById("download").addEventListener('click', _ => {
                    let checked = [...document.querySelectorAll('input:checked')];
                    console.log(checked.length);
                    for(let i = 0; i < checked.length; i++){
                        chrome.downloads.download({
                            url: checked[i].value,
                            //filename: "image " + checked[i].id + ".jpg"
                            //saveAs: true
                        });
                    }
                })

            })
        })

    })
})