/*!
 * ${copyright}
 */

sap.ui.define(['sap/m/semantic/SemanticControl', 'sap/m/Button', 'sap/m/OverflowToolbarButton'], function(SemanticControl, Button, OverflowToolbarButton) {
	"use strict";

	/**
	 * Constructor for a new SemanticButton.
	 * @param {string} [sId] id for the new control, generated automatically if no id is given
	 * @param {object} [mSettings] initial settings for the new control
	 *
	 * @class
	 * A semantic button is either a {@link sap.m.Button} or {@link sap.m.OverflowButton} ,
	 * eligible for aggregation content of a {@link sap.m.semantic.SemanticPage}. Depending on its type,
	 * the semantic button is initialized with specific properties (text, icon etc.).
	 *
	 * @extends sap.m.semantic.SemanticControl
	 *
	 * @author SAP SE
	 * @version ${version}
	 *
	 * @constructor
	 * @public
	 * @since 1.30.0
	 * @alias sap.m.semantic.SemanticButton
	 */
	var SemanticButton = SemanticControl.extend("sap.m.semantic.SemanticButton", /** @lends sap.m.semantic.SemanticButton.prototype */ {
		metadata : {

			properties : {

				/**
				 * Type of a button (e.g. Default, Accept, Reject, Back, etc.)
				 */
				buttonType : {
					type : "sap.m.ButtonType",
					group : "Appearance",
					defaultValue : sap.m.ButtonType.Default
				},

				/**
				 * See {@link sap.m.Button#enabled}
				 */
				enabled : {
					type : "boolean",
					group : "Behavior",
					defaultValue : true
				}
			},
			events : {
				/**
				* See {@link sap.m.Button#press}
				*/
				press : {}
			}
		}
	});

	SemanticButton.prototype.setProperty = function(key, value, bSuppressInvalidate) {

		if ((key === "type") || this._getControl()) {
			if (key === "buttonType") {
				this._getControl().setProperty("type", value, bSuppressInvalidate);
				return this;
			}
			SemanticControl.prototype.setProperty.call(this, key, value, bSuppressInvalidate);
		}

		this._aSettings || (this._aSettings = {});
		this._aSettings[key] = value; //cache properties to apply upon deferred creation of inner control

		return this;
	};

	SemanticButton.prototype.getProperty = function(key) {

		if ((key === "type")  || this._getControl()) {
			if (key === "buttonType") {
				return this._getControl().getProperty("type");
			}
			return SemanticControl.prototype.getProperty.call(this, key);
		}

		return (this._aSettings)  ? this._aSettings[key] : null;
	};

	SemanticButton.prototype.exit = function() {
		this._aSettings = null;
	};

	//overwrites
	SemanticButton.prototype._getControl = function() {

		var oControl = this.getAggregation('_control');
		if ((!oControl || this._bTypeChanged)) {

			this._bTypeChanged = false;

			var oClass = this._getConfiguration() && this._getConfiguration().group === "IconOnly" ? OverflowToolbarButton : Button;
			var bReinstantiate = oControl && (oControl.getMetadata().getName() !== oClass.getMetadata().getName());
			var oOldParent, sOldParentAggregationName;

			if (bReinstantiate) {
				oOldParent = oControl.getParent();
				sOldParentAggregationName = oControl.sParentAggregationName;
				oOldParent.removeAggregation(sOldParentAggregationName, oControl);
				this.setAggregation('_control', null);
				oControl.destroy();
			}
			if (!oControl || bReinstantiate) {

				var oNewInstance = new oClass({
					press: jQuery.proxy(this.firePress, this)
				});

				this.setAggregation('_control', oNewInstance, true); //TODO: check bSuppressInvalidate needed?

				oControl = this.getAggregation('_control');

				if (this._aSettings) {
					delete this._aSettings["type"];
					SemanticControl.prototype.applySettings.call(this, this._aSettings);
				}
			}
		}

		return oControl;
	};


	return SemanticButton;
}, /* bExport= */ true);
