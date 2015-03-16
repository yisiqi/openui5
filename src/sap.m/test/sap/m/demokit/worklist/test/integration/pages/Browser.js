sap.ui.require([
		'sap/ui/test/Opa5',
		'sap/ui/demo/worklist/test/integration/pages/Common'
	],
	function(Opa5, Common) {
		"use strict";

		Opa5.createPageObjects({
			onTheBrowser: {
				baseClass: Common,
				actions: {
					iPressOnTheBackwardsButton : function () {
						return this.waitFor({
							success : function () {
								sap.ui.test.Opa5.getWindow().history.back();
							}
						});
					},

					iPressOnTheForwardsButton : function () {
						return this.waitFor({
							success : function () {
								sap.ui.test.Opa5.getWindow().history.forward();
							}
						});
					},

					iChangeTheHashToSomethingInvalid : function () {
						return this.waitFor({
							success : function () {
								sap.ui.test.Opa5.getWindow().location.hash = "#/somethingInvalid";
							}
						});
					},

					iChangeTheHashToObject : function (iObjIndex) {
						return this.waitFor({
							success : function () {
								sap.ui.test.Opa5.getWindow().location.hash = "#/object/ObjectID_" + iObjIndex;
							}
						});
					}
				},
				assertions: {}
			}
		});
	});
