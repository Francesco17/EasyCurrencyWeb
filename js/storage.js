if(typeof(Storage)!=="undefined"){

  var hello = "Hello World!!";
  localStorage.setItem("hello",hello);
  // get string
  console.log(localStorage.getItem("hello"));
}
else{
  alert("Mi dispiace, ma il tuo browser non supporta il local storage..")
}
