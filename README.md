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
})();
```

If you don't want the code to throw the exception and want to catch missing fields, try this:

```javascript
	var validator = obligatory.newFactoryInstance();
    
    validator.email = true;
    validator.password = true;
    validator.setCollection(req.body);
    validator.validate(function(missing) {
    	if (missing.length > 0) {
    		// Parameters are missing..
    		
    	} else {
	    	db.find({
	        email: req.body.email, password: req.body.password}, function(err, user) {
	          // Do something here now.. All is okay.
	    	});
    	}
    });
```

Optionally, you can put `flag` for strict mode to see if you just want existence of key or value as well.

```javascript
validator.setFlag(obligatoty.FLAG_MIXED);
// OR
validator.setFlag(obligatory.FLAG_STRICT);
```

Obligatory helps to define clean pattern to validate your REST API body parameters.

## Contribution.
Module is under maintainence by [Hamza Waqas](http://twitter.com/HamzaWaqas) but you can also create issues or send a pull-request! That's how all works :-)
