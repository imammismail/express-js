{
	"info": {
		"_postman_id": "5045ffc3-726b-4ff0-a99f-3130ce5feaf2",
		"name": "widatech API",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
		"_exporter_id": "9222165"
	},
	"item": [
		{
			"name": "get all Invoice",
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "http://localhost:3000/api/v1/invoice/all?date=2023-04-07",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"api",
						"v1",
						"invoice",
						"all"
					],
					"query": [
						{
							"key": "date",
							"value": "2023-04-07"
						},
						{
							"key": "page",
							"value": "1",
							"disabled": true
						},
						{
							"key": "pageSize",
							"value": "1",
							"disabled": true
						}
					]
				}
			},
			"response": [
				{
					"name": "get all Invoice",
					"originalRequest": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "http://localhost:3000/api/v1/invoice/all",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"api",
								"v1",
								"invoice",
								"all"
							],
							"query": [
								{
									"key": "date",
									"value": "2024-02-13",
									"disabled": true
								},
								{
									"key": "page",
									"value": "1",
									"disabled": true
								},
								{
									"key": "pageSize",
									"value": "1",
									"disabled": true
								}
							]
						}
					},
					"_postman_previewlanguage": "json",
					"header": [
						{
							"key": "Content-Type",
							"value": "application/json",
							"name": "Content-Type",
							"description": "",
							"type": "text"
						}
					],
					"cookie": [],
					"body": "{\r\n    \"status\": true,\r\n    \"code\": \"S01\",\r\n    \"message\": \"success\",\r\n    \"data\": {\r\n        \"rows\": [\r\n            {\r\n                \"invoice_no\": 4,\r\n                \"date\": \"2023-04-07\",\r\n                \"customer_name\": \"2\",\r\n                \"salesperson_name\": \"asap\",\r\n                \"payment_type\": \"CASH\",\r\n                \"notes\": \"asap\",\r\n                \"product_sold\": {\r\n                    \"invoice_no\": 4,\r\n                    \"item_name\": \"asap\",\r\n                    \"quantity\": 2,\r\n                    \"total_cost\": \"3000.00\",\r\n                    \"total_price\": \"9000.00\"\r\n                },\r\n                \"profit\": 6000\r\n            },\r\n            {\r\n                \"invoice_no\": 5,\r\n                \"date\": \"2023-04-07\",\r\n                \"customer_name\": \"Gelas\",\r\n                \"salesperson_name\": \"asap\",\r\n                \"payment_type\": \"CASH\",\r\n                \"notes\": \"asap\",\r\n                \"product_sold\": {\r\n                    \"invoice_no\": 5,\r\n                    \"item_name\": \"asap\",\r\n                    \"quantity\": 2,\r\n                    \"total_cost\": \"300000.00\",\r\n                    \"total_price\": \"900000.00\"\r\n                },\r\n                \"profit\": 600000\r\n            }\r\n        ],\r\n        \"totalCashTransactions\": 606000,\r\n        \"count\": 2,\r\n        \"totalPages\": 1,\r\n        \"currentPage\": 1\r\n    }\r\n}"
				}
			]
		},
		{
			"name": "create invoice",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"invoice_no\": 5,\r\n    \"date\": \"2023-04-07\",\r\n    \"customer_name\": \"Gelas\",\r\n    \"salesperson_name\": \"asap\",\r\n    \"payment_type\": \"CASH\", // 'CASH','CREDIT'\r\n    \"notes\": \"asap\",\r\n    \"item_name\": \"asap\",\r\n    \"quantity\": 2,\r\n    \"total_cost\": 300000,\r\n    \"total_price\": 900000\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:3000/api/v1/invoice",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"api",
						"v1",
						"invoice"
					]
				}
			},
			"response": [
				{
					"name": "create invoice",
					"originalRequest": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \"date\": \"2023-04-07\",\r\n    \"customer_name\": \"Gelas\",\r\n    \"salesperson_name\": \"asap\",\r\n    \"payment_type\": \"CASH\", // 'CASH','CREDIT'\r\n    \"notes\": \"asap\",\r\n    \"item_name\": \"asap\",\r\n    \"quantity\": 2,\r\n    \"total_cost\": 3.000,\r\n    \"total_price\": 6.000\r\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "http://localhost:3000/api/v1/invoice",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"api",
								"v1",
								"invoice"
							]
						}
					},
					"_postman_previewlanguage": "json",
					"header": [
						{
							"key": "Content-Type",
							"value": "application/json",
							"name": "Content-Type",
							"description": "",
							"type": "text"
						}
					],
					"cookie": [],
					"body": "{\r\n    \"status\": true,\r\n    \"code\": \"S01\",\r\n    \"message\": \"Invoice Created.\",\r\n    \"data\": true\r\n}"
				}
			]
		},
		{
			"name": "update invoice",
			"request": {
				"method": "PUT",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"date\": \"2023-04-07\",\r\n    \"customer_name\": \"Gelasu\",\r\n    \"salesperson_name\": \"asapu\",\r\n    \"payment_type\": \"CREDIT\", // 'CASH','CREDIT'\r\n    \"notes\": \"asapu\",\r\n    \"item_name\": \"asapu\",\r\n    \"quantity\": 2,\r\n    \"total_cost\": 3.0002,\r\n    \"total_price\": 6.0002\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:3000/api/v1/invoice?invoice_no=4",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"api",
						"v1",
						"invoice"
					],
					"query": [
						{
							"key": "invoice_no",
							"value": "4"
						}
					]
				}
			},
			"response": [
				{
					"name": "update invoice",
					"originalRequest": {
						"method": "PUT",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \"date\": \"2023-04-07\",\r\n    \"customer_name\": \"Gelasu\",\r\n    \"salesperson_name\": \"asapu\",\r\n    \"payment_type\": \"CREDIT\", // 'CASH','CREDIT'\r\n    \"notes\": \"asapu\",\r\n    \"item_name\": \"asapu\",\r\n    \"quantity\": 2,\r\n    \"total_cost\": 3.0002,\r\n    \"total_price\": 6.0002\r\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "http://localhost:3000/api/v1/invoice?invoice_no=3",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"api",
								"v1",
								"invoice"
							],
							"query": [
								{
									"key": "invoice_no",
									"value": "3"
								}
							]
						}
					},
					"_postman_previewlanguage": "json",
					"header": [
						{
							"key": "Content-Type",
							"value": "application/json",
							"name": "Content-Type",
							"description": "",
							"type": "text"
						}
					],
					"cookie": [],
					"body": "{\n    \"status\": true,\n    \"code\": \"S00\",\n    \"message\": \"Invoice updated.\",\n    \"data\": true\n}"
				}
			]
		},
		{
			"name": "Delete invoice",
			"request": {
				"method": "DELETE",
				"header": [],
				"url": {
					"raw": "http://localhost:3000/api/v1/invoice?invoice_no=4",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"api",
						"v1",
						"invoice"
					],
					"query": [
						{
							"key": "invoice_no",
							"value": "4"
						}
					]
				}
			},
			"response": [
				{
					"name": "Delete invoice",
					"originalRequest": {
						"method": "DELETE",
						"header": [],
						"url": {
							"raw": "http://localhost:3000/api/v1/invoice?invoice_no=4",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"api",
								"v1",
								"invoice"
							],
							"query": [
								{
									"key": "invoice_no",
									"value": "4"
								}
							]
						}
					},
					"_postman_previewlanguage": "json",
					"header": [
						{
							"key": "Content-Type",
							"value": "application/json",
							"name": "Content-Type",
							"description": "",
							"type": "text"
						}
					],
					"cookie": [],
					"body": "{\n    \"status\": true,\n    \"code\": \"S01\",\n    \"message\": \"Invoice deleted.\",\n    \"data\": true\n}"
				}
			]
		},
		{
			"name": "problem solving",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"l\": 3, //panjang\r\n    \"t\" : 8 // seluruh angka\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:3000/api/v1/invoice/solving",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"api",
						"v1",
						"invoice",
						"solving"
					]
				}
			},
			"response": []
		},
		{
			"name": "upload file",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "formdata",
					"formdata": [
						{
							"key": "file",
							"type": "file",
							"src": "/C:/Users/Rapidtech/Downloads/InvoiceImport.xlsx"
						}
					]
				},
				"url": {
					"raw": "http://localhost:3000/api/v1/excel/upload",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"api",
						"v1",
						"excel",
						"upload"
					]
				}
			},
			"response": []
		}
	]
}
