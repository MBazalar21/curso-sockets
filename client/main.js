const socket = io.connect('http://localhost:6677',{'forceNew': true})

socket.on('messages', (data)=>{
    console.log(data)
    render(data)
})

function render(data){
    var html = data.map((message, index)=>{
        return (`
            <div class="message">
                <strong>${message.nickName}</strong> dice:
                <p>${message.text}</p>
            </div>
        `)
    }).join(' ')

    const div_msgs = document.getElementById('messages')
    div_msgs.innerHTML = html
    div_msgs.scrollTop = div_msgs.scrollHeight
}

function addMessage(e){
    const message = {
        nickName: document.getElementById('nickname').value,
        text: document.getElementById('text').value
    }

    document.getElementById('nickname').style.display = 'none'
    socket.emit('add-message', message)

    return false
}