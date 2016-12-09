/*
 *  Licensed Materials - Property of IBM
 *  5725-I43 (C) Copyright IBM Corp. 2011, 2016. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

/**
 * @param tag: a topic such as MobileFirst_Platform, Bluemix, Cordova.
 * @returns json list of items.
 */

function getCatalog() {
	var tag = 'cloffice/client/ios/catalog';

	var input = {
	    method : 'get',
	    returnedContentType : 'xml',
	    path : tag
	};

	WL.Logger.error("Input:");
	WL.Logger.error(JSON.stringify(input));

	var resultXML = '';

	resultXML = MFP.Server.invokeHttp(input);
	WL.Logger.error("resultXML:");
	WL.Logger.error(JSON.stringify(resultXML));

	// WL.Logger.error(JSON.stringify(xml2json(resultXML)));

	// return xml2json(resultXML);
	return resultXML;
}

// function xml2json(xml) {
//   try {
//     var obj = {};
//     if (xml.children.length > 0) {
//       for (var i = 0; i < xml.children.length; i++) {
//         var item = xml.children.item(i);
//         var nodeName = item.nodeName;
//
//         if (typeof (obj[nodeName]) == "undefined") {
//           obj[nodeName] = xml2json(item);
//         } else {
//           if (typeof (obj[nodeName].push) == "undefined") {
//             var old = obj[nodeName];
//
//             obj[nodeName] = [];
//             obj[nodeName].push(old);
//           }
//           obj[nodeName].push(xml2json(item));
//         }
//       }
//     } else {
//       obj = xml.textContent;
//     }
//     return obj;
//   } catch (e) {
//       WL.Logger.error(e.message);
//   }
// }

/**
 * @returns ok
 */
function unprotected(param) {
	return {result : "Hello from unprotected resource"};
}
