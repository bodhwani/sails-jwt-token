/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  create : function(req, res, next) {

    User.create(req.params.all(), function userCreated(err, user) {
      if (err) {
        console.log(err);
        return res.status(200).json({
          message : "Username or email address already exist.Please use different values",
          success : false
        })
      }

      req.session.authenticated = true;
      req.session.User = user;


      token : sailsTokenAuth.issueToken(user.id);

      
      return res.json({
        message : "Successfully registered",
        success  :true,
        user  : user
      })

    });
  },


  showall : function(req, res, next){

    User.find(function foundUsers(err, users){
      if(err) return next(err);
      res.view({
        users: users
      });
    });
  }

};

