sap.ui.define([
		"sap/ui/core/mvc/Controller"
	], function (Controller) {
	"use strict";

	return Controller.extend("sap.ui.demo.worklist.controller.BaseController", {
		
		/**
		 * Convenience method for accessing the event bus.
		 * @public
		 * @returns {sap.ui.core.EventBus} the event bus for this component
		 */
		getEventBus : function () {
			return this.getOwnerComponent().getEventBus();
		},

		/**
		 * Convenience method for accessing the router.
		 * @public
		 * @returns {sap.ui.core.routing.Router} the router for this component
		 */
		getRouter : function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},

		/**
		 * Convenience method for getting the view model by name.
		 * @public
		 * @param {string} [sName] the model name
		 * @returns {sap.ui.model.Model} the model instance
		 */
		getModel : function (sName) {
			return this.getView().getModel(sName);
		},

		/**
		 * Convenience method for setting the view model.
		 * @public
		 * @param {sap.ui.model.Model} oModel the model instance
		 * @param {string} sName the model name
		 * @returns {sap.ui.mvc.View} the view instance
		 */
		setModel : function (oModel, sName) {
			return this.getView().setModel(oModel, sName);
		},

		/**
		 * Getter for the resource bundle.
		 * @public
		 * @returns {sap.ui.model.resource.ResourceModel} the resourceModel of the component
		 */
		getResourceBundle : function () {
			return this.getOwnerComponent().getModel("i18n").getResourceBundle();
		},

		/**
		 * Navigates back in the browser history, if the entry was created by this app.
		 * If not, it navigates to a route passed to this function.
		 *
		 * @public
		 * @param {string} sRoute the name of the route if there is no history entry
		 * @param {object} mData the parameters of the route, if the route does not need parameters, it may be omitted.
		 */
		myNavBack : function(sRoute, mData) {
			var oHistory = sap.ui.core.routing.History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			//The history contains a previous entry
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var bReplace = true; // otherwise we go backwards with a forward history
				this.getRouter().navTo(sRoute, mData, bReplace);
			}
		},
		
		/**
		 * Can be used to put down a value for busy indicator delay.
		 * @param {int} iOriginalBusyIndicatorDelay
		 * @return the controller object for method chaining
		 * @public
		 */
		setOriginalBusyIndicatorDelay : function(iOriginalBusyIndicatorDelay) {
			this._iOriginalBusyIndicatorDelay = iOriginalBusyIndicatorDelay;
			return this;
		},
		
		/**
		 * Can be used to restore the value for busy indicator delay.
		 * @return {int} iOriginalBusyIndicatorDelay 
		 * @public
		 */
		getOriginalBusyIndicatorDelay : function() {
			return this._iOriginalBusyIndicatorDelay;
		}
		
	});

}, /* bExport= */ true);
