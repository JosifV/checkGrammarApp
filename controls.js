const UserSchema = require("./models");

module.exports = {
  login: (req, res, next) => {
    // login data from client request
    const username = req.params.username;
    const password = req.params.password;

    // find user with this username
    UserSchema.findOne({ username: username })
      // send it to client browser
      .then(user => {
        // if that user exists then...
        if (user) {
          // ... check if password matches
          if (user.password === password) {
            // if they do log him in and send his mongo id as token
            res.send(["SignIn", user._id]);
          } else {
            // if they do not match print error message
            res.send("Wrong password");
          }
        }
        // if there are no user by that username...
        else {
          // ... create one...
          UserSchema.create({
            queries: [],
            username: username,
            password: password
          }).then(user => {
            // ... and log him in with his mongo id as token
            res.send(["SignUp", user._id]);
          });
        }
      })
      .catch(next);
  },
  query: (req, res, next) => {
    // query data from client request
    const id = req.params.id;
    const newQuery = req.params.newQuery;

    // find the user that is currenty loged in
    UserSchema.findById({ _id: id })
      .then(user => {
        // copy the array of queries
        let userQueriesArray = [...user.queries];
        // does this query already exists in the array?
        const newQueryPresent = userQueriesArray.includes(newQuery);
        // if no put him in the array ...
        if (!newQueryPresent) {
          userQueriesArray.push(newQuery);
          // and update the query array on database
          UserSchema.findOneAndUpdate(
            { _id: id },
            { queries: userQueriesArray }
          )
            .then(user => {
              // sent updated query array to client
              res.send([user.queries, newQuery]);
            })
            .catch(err => {
              // in unlikely case of error :)
              res.send(
                `You should not see this, but there it is... Error message: ${err}`
              );
            });
        } else {
          // if query already exists in array send just this message
          res.send("Query already exist");
        }
      })
      .catch(next);
  },
  querylist: (req, res, next) => {
    // query data from client request
    const id = req.params.id;
    // find the user with this id
    UserSchema.findById({ _id: id })
      .then(user => {
        // and send him to client for query array
        res.send(user);
      })
      .catch(next);
  }
};
