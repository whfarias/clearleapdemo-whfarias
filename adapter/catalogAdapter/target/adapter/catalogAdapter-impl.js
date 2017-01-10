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

function getCatalog(DeviceID, DeviceToken) {
	WL.Logger.error("Parametros Entrada:");
	WL.Logger.error(DeviceID);
	WL.Logger.error(DeviceToken);

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

						var VideoJSONArray = [{
							 "id": 1,
							 "name": resultXML.rss.channel.item[i].title,
							 "videos" : []
						 }];

						 WL.Logger.error("Video JSON Array");
						 WL.Logger.error(JSON.stringify(VideoJSONArray));

						for (var x = 0; x < (lista.rss.channel.totalResults - 1); x++) {

								input.path = "cloffice/client/ios/browse/" + lista.rss.channel.item[i].guid;

								WL.Logger.error("Input Movies details:");
								WL.Logger.error(JSON.stringify(input));

								catalog  = MFP.Server.invokeHttp(input);

								WL.Logger.error("video details:");
								WL.Logger.error(JSON.stringify(catalog.rss.channel.totalResults));
								WL.Logger.error(JSON.stringify(catalog));

								if (Array.isArray(catalog.rss.channel.item)) {
										WL.Logger.error("É um Array:" + x);
										VideoJSONArray[0].videos.push({
												"id": 1,
												"name": catalog.rss.channel.item[x].title,
												// "img": catalog.rss.channel.item[x].group.thumbnail.url,
												"img" : "http://videos.oneindia.com/image/120x70x60/2015/05/49362837-hollywood-news.jpg",
												"url": catalog.rss.channel.item[x].link + "?deviceId=" + DeviceID + "&deviceToken=" + DeviceToken,
										 		"time":  catalog.rss.channel.item[x].group.content.duration,
												"Author": "adapters",
												"views": 3,
												"likes": 3,
												"comments": 2,
												"description": catalog.rss.channel.item[x].description
											});
								}else {
									VideoJSONArray[0].videos.push({
											"id": 1,
											"name": catalog.rss.channel.item.title,
											// "img": catalog.rss.channel.item.group.thumbnail.url,
											"url": catalog.rss.channel.item.link + "?deviceId=" + DeviceID + "&deviceToken=" + DeviceToken,
									 		"time":  catalog.rss.channel.item.group.content.duration,
											"Author": "adapters",
											"views": 3,
											"likes": 3,
											"comments": 2,
											"description": catalog.rss.channel.item.description
										});
								}


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
