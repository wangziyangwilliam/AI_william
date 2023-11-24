document.getElementById('send-button').addEventListener('click', function() {
  var userInput = document.getElementById('user-input').value.trim();
  if (userInput !== '') {
      // 创建用户发送的消息元素
      var messageContainer = document.createElement('div');
      messageContainer.classList.add('message', 'sent');
      var message = document.createElement('span');
      message.classList.add('text');
      message.textContent = userInput;
      messageContainer.appendChild(message);
      document.getElementById('chat-window').appendChild(messageContainer);
      document.getElementById('user-input').value = '';

      // 发送用户输入到后端
      fetch('http://47.102.135.108:9843/chat', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_input: userInput }),
      })
      .then(response => response.json())
      .then(data => {
          // 接收后端的回应并显示在聊天窗口中
          var botResponse = data.response;
          var botMessageContainer = document.createElement('div');
          botMessageContainer.classList.add('message', 'received');
          var botMessage = document.createElement('span');
          botMessage.classList.add('text');
          botMessage.textContent = botResponse;
          botMessageContainer.appendChild(botMessage);
          document.getElementById('chat-window').appendChild(botMessageContainer);
      })
      .catch(error => {
          console.error('发生错误:', error);
      });
  }
});
