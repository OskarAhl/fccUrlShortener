document.getElementById("submitBtn").onclick = function () { 
    const url = document.getElementById("urlInput").value;
    let form = document.getElementById("myForm");
    console.log(url);
    if (url.length > 0) {
        form.setAttribute("action", `/new/${url.replace(/\//g, '%2F')}`);
        form.submit();
    }
};

