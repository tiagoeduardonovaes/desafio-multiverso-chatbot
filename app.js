require('dotenv').config();
const AssistantV1 = require('watson-developer-cloud/assistant/v1');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(express.static('./public'));

const port = 3000;

const assistant = new AssistantV1({
  version: '2018-09-20',
  iam_apikey: process.env.IAM_APIKEY,
  url: "https://gateway.watsonplatform.net/assistant/api"

});



app.post('/conversation/', (req, res) => {
  const { text, context = {} } = req.body;

  const params = {
    input: { text },
    workspace_id: process.env.WORKSPACE_ID,
    context,
  };

  assistant.message(params, (err, response) => {
    if (err) {
      console.error(err);
      res.status(500).json(err);
    } else {
      res.json(response);
    }
  });
});

app.listen(port, () => console.log(`Iniciado na Porta:  ${port}`));
