// uvezi assert za testiranje
const assert = require("assert");
// uvezi UserSchema za kreiranje novog test korisnika
const UserSchema = require("../models");
// uvezi index.js da bi se pokrenuo server i konekcija sa mongoDB
require("../index");

// testiramo da li radi Sign in / Sign up
describe("Login test", () => {
  it("Sign in / Sign up user", done => {
    // nadji korisnika sa username-om test
    UserSchema.findOne({ username: "test" }).then(user => {
      // ako postoji takav ...
      if (user) {
        // ... potvrdi to sa assert funkcijom  ...
        assert(user);
        // i pozovi done() da zavrsis test
        done();
      }
      // ako takav korisnik ne postoji ...
      else {
        // ... napravi ga ...
        const userTest = new UserSchema({
          username: "test",
          password: "test"
        });
        // ... i upisi ga u databazu
        userTest.save().then(() => {
          // zatim pomocu assert funkcije testiraj da li je novi korisnik upisan u databazu
          // ako jeste .isNew ce biti false, ako nije .isNew ce biti true
          assert(!userTest.isNew);
          // i pozovi done() da zavrsis test
          done();
        });
      }
    });
  });
});
