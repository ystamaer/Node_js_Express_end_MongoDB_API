var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
    let dtaBase = db.db('test');
// Обновление заметок: маршрут UPDATE
    app.put ('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const note = { text: req.body.body, title: req.body.title };
        dtaBase.collection('notes').update(details, note, (err, result) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send(note);
            }
        });
    });
// ...

// Удаление заметок: маршрут DELETE
    app.delete('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        dtaBase.collection('notes').remove(details, (err, item) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send('Note ' + id + ' deleted!');
            }
        });
    });
// ...

// Чтение заметок: маршрут READ
    app.get('/notes/:id', (req, res) => {
        // const details = { '_id': '5d90d97368809c3cc96574a0' };
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        dtaBase.collection('notes').findOne(details, (err, item) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send(item);
            }
        });
    });

// Добавление записей в базу данных
    app.post('/notes', (req, res) => {
        const note = { text: req.body.body, title: req.body.title };
        dtaBase.collection('notes').insert(note, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(result.ops[0]);
            }
        });
    });
};