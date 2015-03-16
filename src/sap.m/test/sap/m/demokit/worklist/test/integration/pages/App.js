sap.ui.require([
		'sap/ui/test/Opa5',
		'sap/ui/test/matchers/PropertyStrictEquals',
		'sap/ui/demo/worklist/test/integration/pages/Common'
	],
	function(Opa5, PropertyStrictEquals, Common) {
		"use strict";

		Opa5.createPageObjects({
			onTheAppPage: {
				baseClass: Common,
				actions: {
					iWaitUntilTheAppBusyIndicatorIsGone: function () {
						return this.waitFor({
							id : "app",
							viewName : "App",
							// inline-matcher directly as function
							matchers : function(oAppControl) {
								// we set the view busy, so we need to query the parent of the app
								return oAppControl.getParent() && oAppControl.getParent().getBusy() === false;
							},
							success : function (oRootView) {
								ok(true, "The root view is not busy anymore");
							},
							errorMessage : "Did not find the App control"
						});
					}
				},
				assertions: {
					iShouldSeeTheBusyIndicatorForTheWholeApp: function () {
						return this.waitFor({
							id : "app",
							viewName : "App",
							matchers : new PropertyStrictEquals({
								name: "busy",
								value: true
							}),
							success : function (oRootView) {
								// we set the view busy, so we need to query the parent of the app
								ok(true, "The rootview is busy");
							},
							errorMessage : "Did not find the App control"
						});
					}
				}
			}
		});
	});
