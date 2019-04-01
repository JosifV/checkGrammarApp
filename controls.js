const UserSchema = require("./models");

module.exports = {
  login: (req, res, next) => {
    // login podaci preuzeti iz backend urla
    const username = req.params.username;
    const password = req.params.password;

    // prvo pronadji jednog korisnika sa unetim username-om
    UserSchema.findOne({ username: username })
      // posalji ga u client browser
      .then(user => {
        // ako ima tog korisnika onda...
        if (user) {
          // ... proveri da li se poklapaju lozinke
          if (user.password === password) {
            // ako se poklapaju uloguj ga i posalji njegov mongoDB id kao tokenom
            res.send(["SignIn", user._id]);
          } else {
            // u suprotnom izbaci da je lozinka pogresna
            res.send("Wrong password");
          }
        }
        // ako ne postoji korisnik sa tim username-om...
        else {
          // ... onda ga napravi sa podacima iz backend urla...
          UserSchema.create({
            queries: [],
            username: username,
            password: password
          }).then(user => {
            // ... i uloguj ga sa njegovim mongoDB id kao tokenom
            res.send(["SignUp", user._id]);
          });
        }
      })
      .catch(next);
  },
  query: (req, res, next) => {
    // query podaci preuzeti iz backend urla
    const id = req.params.id;
    const newQuery = req.params.newQuery;

    // pronadji korisnika koji je trenutno ulogovan i koji je poslao ovaj zahtev
    UserSchema.findById({ _id: id })
      .then(user => {
        // kopija niza postojecih upita ovog korisnika
        let userQueriesArray = [...user.queries];
        // da li u tom nizu vec postoji poslati upit?
        const newQueryPresent = userQueriesArray.includes(newQuery);
        // ako ne postoji onda ga smesti u niz ...
        if (!newQueryPresent) {
          userQueriesArray.push(newQuery);
          // i updatuj postojeci niz na databazi ovog korisnika
          UserSchema.findOneAndUpdate(
            { _id: id },
            { queries: userQueriesArray }
          )
            .then(user => {
              // posalji updatovani niz na client browser
              res.send([user.queries, newQuery]);
            })
            .catch(err => {
              // ako slucajno dodje do greske posalji error poruku
              res.send(
                `You should not see this, but there it is... Error message: ${err}`
              );
            });
        } else {
          // i na kraju, ako je korisnik vec uneo ovaj upit nemoj nista da radis, samo posalji da je taj upit vec unet
          res.send("Query already exist");
        }
      })
      .catch(next);
  },
  querylist: (req, res, next) => {
    // query podaci preuzeti iz backend urla
    const id = req.params.id;
    // pronadji korisnika sa ulogovanim id-om
    UserSchema.findById({ _id: id })
      .then(user => {
        // i posalji ga u client browser da mu uzmemo queri niz
        res.send(user);
      })
      .catch(next);
  }
};
