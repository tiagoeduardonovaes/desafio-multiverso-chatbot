const textInput = document.getElementById('textInput');
const chat = document.getElementById('chat');

let context = {};

const templateChatMessage = (message, from) => `
  <div class="from-${from}">
    <div class="message-inner">
      <p>${message}</p>
    </div>
  </div>
  `;

// Cria um elemento e o adiciona para o chat
const InsertTemplateInTheChat = (template) => {
  const div = document.createElement('div');
  div.innerHTML = template;

  chat.appendChild(div);
};

// Chama o servidor e obtém o texto do bluemix
const getWatsonMessageAndInsertTemplate = async (text = '') => {
  const uri = 'http://localhost:3000/conversation/';

  const response = await (await fetch(uri, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text,
      context,
    }),
  })).json();

  context = response.context;

  const template = templateChatMessage(response.output.text, 'watson');

  InsertTemplateInTheChat(template);
};

textInput.addEventListener('keydown', (event) => {
  if (event.keyCode === 13 && textInput.value) {
    // Envia a Mendasagem ao Usuário.
    getWatsonMessageAndInsertTemplate(textInput.value);

    const template = templateChatMessage(textInput.value, 'user');
    InsertTemplateInTheChat(template);

    //Limpa a caixa de texto para futuras mensagens.
    textInput.value = '';
  }
});


getWatsonMessageAndInsertTemplate();
