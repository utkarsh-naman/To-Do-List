let allnotesarray = JSON.parse(localStorage.getItem('allnotesarrayrecord'))|| [];

let copypressedindex = 0;

console.log(allnotesarray);

console.log('default render at refresh');
render();

function addnote(){
  const inputtxt = document.querySelector('.note').value;
  if(inputtxt !== ''){
    allnotesarray.push(inputtxt);
    localStorage.setItem('allnotesarrayrecord', JSON.stringify(allnotesarray));
    console.log(`data added to array ... array length = ${allnotesarray.length}`);
    document.querySelector('.note').value = '';
    console.log(allnotesarray)
    render();
  }
}

function render(){
  console.log('rendering started...');
  let htmldata = '';
  for(let i = 0; i< allnotesarray.length; i++){
    htmldata += `<div class="elementindiv">
    <p class=\`paratext${i}\`>${allnotesarray[i]}</p>
    <button class="copy copy${i}" onclick = "copynote(${i})">Copy</button>
    <button class="delete" onclick = "deletenote(${i});">Delete</button>
</div>`;
  }
  document.querySelector('.datadiv').innerHTML = htmldata;
  /*for(let i = 0; i< allnotesarray.length; i++){
    document.querySelector(`.paratext${i}`).innerHTML = allnotesarray[i];
  }*/
}

function deletenote(index){
  allnotesarray.splice(index, 1);
  localStorage.setItem('allnotesarrayrecord', JSON.stringify(allnotesarray));
  render();
}

function copynote(index){
  navigator.clipboard.writeText(allnotesarray[index]).then(function() {
    console.log('Text copied to clipboard');
    document.querySelector(`.copy${copypressedindex}`).textContent = 'Copy';
    document.querySelector(`.copy${index}`).textContent = 'Copied';
    copypressedindex = index;
}).catch(function(error) {
    console.error('Failed to copy text: ', error);
    
});
}

function trash(){
  localStorage.removeItem('allnotesarrayrecord');
  allnotesarray = [];
  render();
}