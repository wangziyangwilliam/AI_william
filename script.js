document.getElementById('send-button').addEventListener('click', function() {
    var userInput = document.getElementById('user-input').value.trim();
    if (userInput !== '') {
      var messageContainer = document.createElement('div');
      messageContainer.classList.add('message', 'sent');
      var message = document.createElement('span');
      message.classList.add('text');
      message.textContent = userInput;
      messageContainer.appendChild(message);
      document.getElementById('chat-window').appendChild(messageContainer);
      document.getElementById('user-input').value = '';
  
      // 向后端发送数据
      axios.post('http://47.102.135.108:9850/chat', {
        //'que':1
           headers: {
               'Content-Type': 'application/json',
           },
           body: JSON.stringify({ question: userInput }), // 使用 question 字段
      })
      .then(response => response.json())
      .then(data => {
          // 处理后端的响应
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
  