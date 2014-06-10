node-obligatory
===============

Obligatory parameters that are required in REST API body.

## How to Install.

Simply run the following command:

```
npm install obligatory --save
```

## How to use:
Obligatory validates the given collection with the mandatory properties:

```javascript

(function() {
  var obligatory = require('obligatory');
  
  app.get('/my_url', function(req, res, next) {
    var validator = obligatory.newFactoryInstance();
    
    validator.email = true;
    validator.password = true;
    validator.setCollection(req.body);
    try {
      validator.validate(); // Here it works.
      
      // If you're still here, it means you're req.body.email & req.body.password exists.
      db.find({
        email: req.body.email, password: req.body.password}, function(err, user) {
          // Do something here now.. All is okay.
        });
    } catch (_err) {
      return next(_err);
      // _err.message contains "Missing Parameter(s): email, password"
    }
  });
});
```

The module is perfect if you're writing REST API and sick of missing parameters sent by mobile devices.

## Contribution.
Module is under maintainence by [Hamza Waqas](http://twitter.com/HamzaWaqas) but you can also create issues or send a pull-request! That's how all works :-)
