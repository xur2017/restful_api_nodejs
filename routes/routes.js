
const appRouter = (app, fs) => {
    const dataPath = './data/usersdb.json';

    app.get('/', (req, res) => {
        res.send('welcome to the restful_api_nodejs_server');
    });

    app.get('/users', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            res.send(JSON.parse(data));
            //res.send(data);
        });
    });

    app.post('/users', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            var data = JSON.parse(data);
            const newUserId = Object.keys(data).length + 1;
            data[newUserId] = req.body;

            fs.writeFile(dataPath, JSON.stringify(data, null, 2), 'utf8', (err) => {
                if (err) {
                    throw err;
                }
                res.status(200).send('new user added');
            });
        });
    });

    app.delete('/users/:id', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            var data = JSON.parse(data);
            const userId = req.params["id"];
            delete data[userId];

            fs.writeFile(dataPath, JSON.stringify(data, null, 2), 'utf8', (err) => {
                if (err) {
                    throw err;
                }
                res.status(200).send(`users id:${userId} removed`);
            });
        });
    });

    app.put('/users/:id', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            var data = JSON.parse(data);
            const userId = req.params["id"];
            data[userId] = req.body

            fs.writeFile(dataPath, JSON.stringify(data, null, 2), 'utf8', (err) => {
                if (err) {
                    throw err;
                }
                res.status(200).send(`users id:${userId} updated`);
            });
        });
    });
};

module.exports.appRouter = appRouter;