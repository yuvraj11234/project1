const socket = io();
console.log('hello');
// const user={}

const form = document.getElementById('send-container');
// console.log(form)
const messageInput = document.getElementById('messageInp');
// console.log(messageInput);
const messagecontainer = document.querySelector(".container");
var audio = new Audio('sound.mp3');

const append = (message, position) => {
    if (position == 'left') {
        audio.play();
    }
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message')
    messageElement.classList.add(position)
    messagecontainer.append(messageElement);
   
}
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You:${message}`, 'right')
    socket.emit('send', message);
    messageInput.value = "";
})
const names = prompt("Enter your name to join");
socket.emit('new-user-joined', names);

socket.on('user-joined', name => {
    // console.log(data);
    append(`${name} joined the chat`, 'left');
})

socket.on('receive', data => {
    console.log(data)
    append(`${data.names}:${data.message}`, 'left');
})

socket.on('left', names => {
    append(`${names} left the chat`, 'left');
})