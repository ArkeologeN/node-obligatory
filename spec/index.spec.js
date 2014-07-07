
(function() {
	"use strict";
	
	var obligatory;
	
	describe("Obligatory Test Suite", function() {
		
		beforeEach(function() {
			obligatory = require('../index');
		});
		
		it("should require the module accurately", function(done) {
			expect(typeof obligatory).toBe("object");
			expect(obligatory.newFactoryInstance).toBeDefined();
			expect(typeof obligatory.newFactoryInstance).toBe('function');
			expect(obligatory.FLAG_MIXED).toBeDefined();
			expect(obligatory.FLAG_STRICT).toBeDefined();
			done();
		});
		
		it("should check for factory instance", function(done) {
			var validator = obligatory.newFactoryInstance();
			expect(validator).toBeDefined();
			expect(validator._params).toBeDefined();
			expect(validator._collection).toBeDefined();
			expect(validator._flag).toBe(0);
			expect(typeof validator.setFlag).toBe('function');
			expect(typeof validator.getFlag).toBe('function');
			expect(typeof validator.setCollection).toBe('function');
			expect(typeof validator.getCollection).toBe('function');
			expect(typeof validator.getParams).toBe('function');
			done();
		});
		
		it("should set flag for mode", function(done) {
			var validator = obligatory.newFactoryInstance();
			validator.setFlag(obligatory.FLAG_MIXED);
			expect(validator.getFlag()).toBe(0);
			validator.setFlag(obligatory.FLAG_STRICT);
			expect(validator.getFlag()).toBe(1);
			done();
		});
		
		it("should validate with mixed mode", function(done) {
			var validator = obligatory.newFactoryInstance();
			validator.name = true;
			validator.age = true;
			validator.setCollection({
				name: "Hamza",
				age: 30
			});
			
			validator.validate();
			done();
		});
		
		it('should validate with mixed mode & missing parameter as Error', function(done) {
			var validator = obligatory.newFactoryInstance();
			validator.name = true;
			validator.age = true;
			validator.location = true;
			validator.setCollection({
				name: "Hamza",
				age: 30
			});
			expect(function() { validator.validate() }).toThrow(new Error("Missing Parameter(s): location"));
			done();
		});
		
		it('should validate with mixed mode & missing parameters in callback', function(done) {
			var validator = obligatory.newFactoryInstance();
			validator.name = true;
			validator.age = true;
			validator.location = true;
			validator.setCollection({
				name: "Hamza",
				age: 30
			});
			
			validator.validate(function(params) {
				expect(params).toBeDefined();
				expect(params.length).toBe(1);
				expect(params.shift()).toBe('location');
				done();
			});
		});
	});
})();
