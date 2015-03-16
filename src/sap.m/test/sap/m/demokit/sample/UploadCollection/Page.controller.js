sap.ui.controller("sap.m.sample.UploadCollection.Page", {

	onInit: function () {

		// set mock data
		var sPath = jQuery.sap.getModulePath("sap.m.sample.UploadCollection", "/uploadCollection.json")
		var oModel = new sap.ui.model.json.JSONModel(sPath);
		this.getView().setModel(oModel);

		var aDataCB = {
			"items" : [{
				"key" : "All",
				"text" : "sap.m.ListSeparators.All"
			}, {
				"key" : "None",
				"text" : "sap.m.ListSeparators.None"
			}],
			"selectedKey" : "None"
		};

		var oModelCB = new sap.ui.model.json.JSONModel();
		oModelCB.setData(aDataCB);

		var oSelect=sap.ui.getCore().byId(this.getView().getId() + "--tbSelect");
		oSelect.setModel(oModelCB);
	},

	onFileDeleted: function(oEvent) {
		var oData = this.oView.getModel().getData();
		var aItems = oData.items;
		var sDocumentId = oEvent.getParameter("documentId");
		var bSetData = false;

		jQuery.each(aItems, function(index) {
			if (aItems[index] && aItems[index].documentId === sDocumentId) {
				aItems.splice(index, 1);
				bSetData = true;
			};
		});
		if (bSetData === true) {
			this.oView.getModel().setData(oData);
		};
	},

	onChange: function(oEvent) {
		var oUploadCollection = oEvent.getSource();
		// Header Token
		var oCustomerHeaderToken = new sap.m.UploadCollectionParameter({
			name : "x-csrf-token",
			value : "securityTokenFromModel"
		});
		// Header Slug
		var oCustomerHeaderSlug = new sap.m.UploadCollectionParameter({
			name : "slug",
			value : oEvent.getParameter("files")[0].name
		});

		oUploadCollection.addHeaderParameter(oCustomerHeaderToken);
		oUploadCollection.addHeaderParameter(oCustomerHeaderSlug);
		sap.m.MessageToast.show("Change event triggered");
	},

	onFileRenamed: function(oEvent) {
		var oData = this.oView.getModel().getData();
		var aItems = oData.items;
		var sDocumentId = oEvent.getParameter("documentId");
		var bSetData = false;

		jQuery.each(aItems, function(index) {
			if (aItems[index] && aItems[index].documentId === sDocumentId) {
				aItems[index].fileName = oEvent.getParameter("fileName");
			};
		});
		this.oView.getModel().setData(oData);
	},

	onUploadComplete: function(oEvent) {
		var fnCurrentDate = function() {
			var date = new Date();
			var day = date.getDate();
			var month = date.getMonth() + 1;
			var year = date.getFullYear();

			if (day < 10) {
				day = '0' + day
			};
			if (month < 10) {
				month = '0' + month
			}
			return year + '-' + month + '-' + day;
		};

		if (oEvent) {
			var oData = this.oView.getModel().getData();
			var oItem = {};
			var sUploadedFile = oEvent.getParameters().getParameter("fileName");
			// at the moment parameter fileName is not set in IE9
			if (!sUploadedFile) {
				var aUploadedFile = (oEvent.getParameters().getSource().getProperty("value")).split(/\" "/);
				sUploadedFile = aUploadedFile[0];
			}
			var nDocId = jQuery.now(); // generate Id
			oItem = {
				"contributor" : "You",
				"documentId" : nDocId.toString(),
				"fileName" : sUploadedFile,
				"fileSize" : 10, // TODO get file size
				"mimeType" : "",
				"thumbnailUrl" : "",
				"uploadedDate" : fnCurrentDate(),
				"url" : "myUrl"
			};
			oData.items.unshift(oItem);
			this.oView.getModel().setData(oData);
			// delay the success message for to notice onChange message
			setTimeout(function() {
				sap.m.MessageToast.show("Upload successful")
			}, 4000);
		}
	},

	onPress: function (oEvent) {
		sap.m.MessageToast.show(oEvent.getSource().getId() + " Pressed");
	},

	onSelectChange:  function(oEvent) {
		var oUploadCollection=sap.ui.getCore().byId(this.getView().getId() + "--UploadCollection");
		oUploadCollection.setShowSeparators(oEvent.getParameters().selectedItem.getProperty("key"));
	}
});
