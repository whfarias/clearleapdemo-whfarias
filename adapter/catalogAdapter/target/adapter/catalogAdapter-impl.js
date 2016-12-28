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

 // Array de videos
	var resultJSONArray = [];


	WL.Logger.error("totalResults:");
	WL.Logger.error(JSON.stringify(resultXML.rss.channel.totalResults));



	// var VideoJSONArray = [];

	for (var i = 0; i < resultXML.rss.channel.totalResults; i++) {

				 if (resultXML.rss.channel.item[i].title == "Movies") {
					 	input.returnedContentType = 'xml';
						input.path = "cloffice/client/ios/browse/" + resultXML.rss.channel.item[i].guid ;
						WL.Logger.error("Input catalog:");
						WL.Logger.error(JSON.stringify(input))

						//Chamada para buscar a url do catalogo que contem a descrição dos videos.
						lista  = MFP.Server.invokeHttp(input);
						WL.Logger.error("Lista de Movies:");
						WL.Logger.error(JSON.stringify(lista));

						WL.Logger.error("qtd de Movies:");
						WL.Logger.error(JSON.stringify(lista.rss.channel.totalResults));

						var VideoJSONArray = {
							 "id": 1,
							 "name": resultXML.rss.channel.item[i].title,
							 "videos" : []
						 };

						for (var j = 0; j < lista.rss.channel.totalResults; j++) {
								lista.rss.channel.item[j].guid;
								input.path = "cloffice/client/ios/browse/" + lista.rss.channel.item[i].guid;
								catalog  = MFP.Server.invokeHttp(input);
								WL.Logger.error("video details:");
								WL.Logger.error(JSON.stringify(catalog));

									VideoJSONArray.videos.push({
											"id": 1,
											"name": catalog.rss.channel.item[j].title,
											"img": catalog.rss.channel.item[j].group.thumbnail.url,
											"url": catalog.rss.channel.item[j].group.content.url,
									 		"time":  catalog.rss.channel.item[j].group.content.duration,
											"Author": "adapters",
											"views": 3,
											"likes": 3,
											"comments": 2,
											"description": catalog.rss.channel.item[j].description
										});

							}
							// resultJSONArray.push(VideoJSONArray)
				};
	};


	return VideoJSONArray;
}

/**
 * @returns ok
 */
function unprotected(param) {
	return {result : "Hello from unprotected resource"};
}
