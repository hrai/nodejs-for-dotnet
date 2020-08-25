(function(data) {
  var seedData = require('./seedData');
  var database = require('./database');

  data.getNoteCategories = function(next) {
    database.getDb(function(err, db) {
      if (err) {
        next(err, null);
      } else {
        db.notes.find().toArray(function(err, results) {
          if (err) {
            next(err, null);
          } else {
            next(null, results);
          }
        });
      }
    });
  };

  data.createNewCategory = function(categoryName, next) {
    database.getDb(function(err, db) {
      if (err) {
        next(err);
      } else {
        db.notes.find({ name: categoryName }).count(function(err, count) {
          if (err) {
            next(err);
          } else {
            if (count != 0) {
              next('Category already exists');
            } else {
              var cat = {
                name: categoryName,
                notes: [],
              };
              db.notes.insert(cat, function(err) {
                if (err) {
                  next(err);
                } else {
                  next(null);
                }
              });
            }
          }
        });
      }
    });
  };

  function seedDatabase() {
    database.getDb(function(err, db) {
      if (err) {
        console.log('failed to seed db: ' + err);
      } else {
        db.notes.count(function(err, count) {
          if (err) {
            console.log('failed to retrieve db count');
          } else {
            if (count == 0) {
              console.log('seeding db...');
              seedData.initialNotes.forEach(function(item) {
                db.notes.insertOne(item, function(err) {
                  if (err) {
                    console.log('failed to insert note into db');
                  }
                });
              });
            } else {
              console.log('db already seeded');
            }
          }
        });
      }
    });
  }

  seedDatabase();
})(module.exports);
