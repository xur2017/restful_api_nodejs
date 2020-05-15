
const appRouter = (app, fs) => {
    const dataPath = './data/usersdb.json';

    app.get('/', (req, res) => {
        res.send('welcome to the restful_api_nodejs_server');
    });

    //get request (show all users)
    app.get('/users', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            res.send(JSON.parse(data));
            //res.send(data);
        });
    });

    //post request (add a new user)
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

    //delete request (delete a user)
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

    //put request (update a user)
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