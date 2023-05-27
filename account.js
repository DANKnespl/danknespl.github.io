let userID = -1;
//window.onload = onLoad();
window.onpageshow = onLoad();
async function onLoad(){
    if (window.location.search.split('?').length > 1) {
        userID = window.location.search.split('?')[1].split('=')[1];
    }
    let response = await fetch("https://stinbanking.ey.r.appspot.com/getAccount?"+new URLSearchParams({userID: userID}));
    let responseText = await response.text();
    var newText = responseText.replace(/\n/g, "</br>");
    document.getElementById('accountInfo').innerHTML = newText;
    response = await fetch("https://stinbanking.ey.r.appspot.com/getTransactions?"+new URLSearchParams({userID: userID}));
    responseText = await response.text();
    newText = responseText.replace(/\n/g, "</br>");
    document.getElementById("transactionList").innerHTML = newText;
};
async function addClick(){
    var re = new RegExp(/^\d{1,9}$/);
    const data = {
        amount: form.elements.amount.value,
        abr: form.elements.abr.value
    };
    console.log(re.test(data.amount))
    if(re.test(data.amount)){
        let result = await fetch("https://stinbanking.ey.r.appspot.com/add?"+new URLSearchParams({amount: data.amount, abr: data.abr, userID: userID}), {mode: 'cors'});
        let responseText = await result.text();
        console.log(responseText)
        alert(responseText)
    }else{
        alert("Chybné množství peněz")
    }
    
};

async function payClick(){
    var re = new RegExp(/^\d{1,9}$/);
    const data = {
        amount: form.elements.amount.value,
        abr: form.elements.abr.value
    };
    console.log(re.test(data.amount))
    if(re.test(data.amount)){
        let result = await fetch("https://stinbanking.ey.r.appspot.com/pay?"+new URLSearchParams({amount: data.amount, abr: data.abr, userID: userID}), {mode: 'cors'});
        let responseText = await result.text();
        console.log(responseText)
        alert(responseText)
    }else{
        alert("Chybné množství peněz")
    }

}
