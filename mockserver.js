const jsonServer = require('json-server');
const path = require('path');
const PORT = process.env.PORT || 8081;


const server = jsonServer.create();
server.use(jsonServer.defaults({static: path.resolve(__dirname, './build')}));

server.post('/oauth/token', (req, res) => {
    res.json({access_token: 'im a token'})
});


server.post('/api/contact-us', (req, res) => {
    res.json({ success: true })
});

server.post('/api/register', (req, res) => {
    res.json({ success: true })
});
server.post('/api/benefit/:benefit_id/redeem/', (req, res) => {
    res.json({couponCode: 'ECR3460298ER'})
});

server.post('/api/benefits/:benefit_id/favorite/', (req, res) => {F
    res.json({ success: 'Okok' })
});

server.post('/api/benefits/:benefit_id/unfavorite/', (req, res) => {
    res.json({ success: 'Okok' })
});

server.post('/oauth/token2', (req, res) => {
    res.json({access_token: 'im a token'})
});
server.post('/api/login', (req, res) => {
    res.json({token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'})
});

server.use(jsonServer.rewriter(require('./routes.json')));
server.use('/api', jsonServer.router('db.json'));

// All remaining requests return the React app, so it can handle routing.
server.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, './build', 'index.html'));
});

server.listen(PORT, () => {
    console.log('JSON Server is running')
});
